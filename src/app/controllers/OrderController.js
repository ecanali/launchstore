const LoadProductService = require('../services/LoadProductService')
const User = require('../models/User')
const Order = require('../models/Order')

const Cart = require('../../lib/cart')
const mailer = require('../../lib/mailer')
const { formatPrice, date } = require('../../lib/utils')

const email = (seller, product, buyer) => `
    <h2>Olá ${seller.name}!</h2>
    <p>Você tem um novo pedido de compra do seu produto!</p>
    <p>Produto: ${product.name}</p>
    <p>Preço: ${product.formattedPrice}</p>
    <p><br><br></p>
    <h3>Dados do Comprador:</h3>
    <p>${buyer.name}</p>
    <p>${buyer.email}</p>
    <p>${buyer.address}</p>
    <p>${buyer.cep}</p>
    <p><br><br></p>
    <p><strong>Entre em contato com o comprador para finalizar a venda!</strong></p>
    <p><br><br></p>
    <p>Atenciosamente, Equipe Launchstore</p>
`

module.exports = {
    async index(req, res) {
        // get the user's orders
        let orders = await Order.findAll({ where: { buyer_id: req.session.userId } })

        const getOrdersPromise = orders.map(async order => {
            // product details
            order.product = await LoadProductService.load('product', 
                { where: { id: order.product_id }
            })

            // buyer details
            order.buyer = await User.findOne({
                where: { id: order.buyer_id }
            })

            // seller details
            order.seller = await User.findOne({
                where: { id: order.seller_id }
            })

            // price format
            order.formattedPrice = formatPrice(order.price)
            order.formattedTotal = formatPrice(order.total)

            // status format
            const statuses = {
                open: "Aberto",
                sold: "Vendido",
                canceled: "Cancelado"
            }

            order.formattedStatus = statuses[order.status]

            // updated at format
            const updatedAt = date(order.updated_at)
            order.formattedUpdatedAt = `${order.formattedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} às ${updatedAt.hour}h${updatedAt.minutes}`

            return order
        })

        orders = await Promise.all(getOrdersPromise)

        return res.render('orders/index', { orders })
    },
    async post(req, res) {
        try {
            // get products from cart
            const cart = Cart.init(req.session.cart)

            // prevents the sellers from buying their own products
            const buyer_id = req.session.userId

            const filteredItems = cart.items.filter(item =>
                item.product.user_id != buyer_id
            )

            // creates the order
            const createOrdersPromise = filteredItems.map(async item => {
                let { product, price: total, quantity } = item
                const { price, id: product_id, user_id: seller_id } = product
                const status = "open"

                const order = await Order.create({
                    seller_id,
                    buyer_id,
                    product_id,
                    price,
                    total,
                    quantity,
                    status
                })

                // get data from product
                product = await LoadProductService.load('product', {
                    where: { id: product_id }
                })

                // get data from seller
                const seller = await User.findOne({ 
                    where: { id: seller_id }
                })

                // get data from buyer
                const buyer = await User.findOne({ 
                    where: { id: buyer_id }
                })

                // send seller email with purchase data
                await mailer.sendMail({
                    to: seller.email,
                    from: 'no-reply@launchstore.com.br',
                    subject: 'Novo pedido de compra | Launchstore',
                    html: email(seller, product, buyer)
                })

                return order
            })

            await Promise.all(createOrdersPromise)
            
            // clean cart
            delete req.session.cart
            Cart.init()

            // notify user with success message
            return res.render('orders/success')

        } catch (error) {
            console.error(error)

            // notify user with error message
            return res.render('orders/error')
        }
    }
}