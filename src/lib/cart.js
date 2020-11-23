const { formatPrice } = require('./utils')

// cart kept saved in req.session
const Cart = {
    init(oldCart) {
        if(oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }

        return this
    },
    addOne(product) {
        // checks if product already exists in cart
        let inCart = this.items.find(item => item.product.id == product.id)

        // if doesn't exist
        if (!inCart) {
            inCart = {
                product: {
                    ...product,
                    formattedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }

        // checks if max quantity exceeded
        if (inCart.quantity >= product.quantity) return this

        // updates product
        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        // updates cart
        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        return this
    },
    removeOne(productId) {
        // gets the item from cart
        const inCart = this.items.find(item => item.product.id == productId)

        if (!inCart) return this

        // updates item
        inCart.quantity--
        inCart.price = inCart.product.price + inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        // updates cart
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        if (inCart.quantity < 1) {
            this.items = this.items.filter(item =>
                item.product.id != inCart.product.id)

            return this
        }

        return this
    },
    delete(productId) {}
}

const product = {
    id: 1,
    price: 199,
    quantity: 2
}

console.log("add first cart item")
let oldCart = Cart.init().addOne(product)
console.log(oldCart)

console.log("add second cart item")
oldCart = Cart.init(oldCart).addOne(product)
console.log(oldCart)

console.log("remove second cart item")
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)

module.exports = Cart