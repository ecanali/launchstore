const faker = require('faker') // lib that creates random info to feed database
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')
const Product = require('./src/app/models/Product')
const File = require('./src/app/models/File')

let usersIds = [],
    totalUsers = 5,
    totalProducts = 10,
    totalProductsImages = 50

async function createUsers() {
    try {
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
        
    } catch (error) {
        console.error(error)
    }
}

async function createProducts() {
    try {
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
                status: 1
            })
        }
        
        const productsPromise = products.map(product => Product.create(product))
    
        const productsIds = await Promise.all(productsPromise)
        
        let files = []
    
        while (files.length < totalProductsImages) {
            files.push({
                name: faker.image.image(),
                path: `public/images/product-placeholder${Math.ceil(Math.random() * 9)}.png`,
                product_id: productsIds[Math.floor(Math.random() * totalProducts)]
            })
        }
    
        const filesPromise = files.map(file => File.create(file))
    
        await Promise.all(filesPromise)
        
    } catch (error) {
        console.error(error)
    }
}

async function init() {
    try {
        await createUsers()
        await createProducts()

    } catch (error) {
        console.error(error)
    }
}

init()