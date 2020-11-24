const Cart = require('../../lib/cart')

const LoadProductsService = require('../services/LoadProductService')

module.exports = {
    async index(req, res) {
        try {
            const product = await LoadProductsService.load('product', { where: { id: 4 } })

            let { cart } = req.session

            // cart manager
            cart = Cart.init(cart).addOne(product)

            return res.render('cart/index', { cart })

        } catch (error) {
            console.error(error)
        }
    }
}