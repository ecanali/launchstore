const faker = require('faker') // lib that creates random info to feed database
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')
const Product = require('./src/app/models/Product')
const File = require('./src/app/models/File')

let usersIds = []
let totalUsers = 3
let totalProducts = 3

async function createUsers() {
    const users = []
    const password = await hash('1111', 8)

    while (users.length < totalUsers) {
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            cpf_cnpj: faker.random.number(99999999999),
            cep: faker.random.number(99999999),
            address: faker.address.streetName()
        })
    }

    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)
}

async function createProducts() {
    let products = []

    while (products.length < totalProducts) {
        products.push({
            category_id: Math.ceil(Math.random() * 3),
            user_id: usersIds[Math.floor(Math.random() * totalUsers)],
            name: faker.name.title(),
            description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
            old_price: faker.random.number(9999),
            price: faker.random.number(9999),
            quantity: faker.random.number(99),
            status: Math.round(Math.random())
        })
    }

    console.log(`//////////////// PRODUCTS É: ${products}`)

    const productsPromise = products.map(product => Product.create(product))

    const productsIds = await Promise.all(productsPromise)

    // console.log(`//////////////// PRODUCSTSIDS É: ${productsIds}`)

    let files = []

    while (files.length < 3) {
        files.push({
            name: faker.image.image(),
            path: `public/images/placeholder.png`,
            product_id: productsIds[Math.floor(Math.random() * totalProducts)]
        })
    }

    const filesPromise = files.map(file => File.create(file))

    await Promise.all(filesPromise)
}

async function init() {
    await createUsers()
    await createProducts()
}

init()