'use strict'

const Product = require('../models/product')

const getProduct = (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send({
                message: `Error al realizar la petición: ${err}`
            })
        }

        if (!product) {
            return res.status(404).send({
                message: `El producto no existe`
            })
        }

        res.status(200).send({
            product
        })
    })
}

const getProducts = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).send({
                message: `Error al realizar la petición: ${err}`
            })
        }

        if (!products) {
            return res.status(404).send({
                message: `No existen productos`
            })
        }

        res.status(200).send({
            products
        })
    })
}

const saveProduct = (req, res) => {
    let product = new Product()
    product.name = req.query.name
    product.picture = req.query.pricture
    product.price = req.query.price
    product.category = req.query.category
    product.description = req.query.description

    product.save((err, productStore) => {
        if (err) res.status(500).send({
            message: `Error al salvar en la base de datos: ${err}`
        })

        res.status(200).send({
            product: productStore
        })
    })
}

const updateProduct = (req, res) => {
    let productId = req.params.productId
    let update = req.body
    
    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) {
            return res.status(500).send({
                message: `Error al actualizar el producto: ${err}`
            })
        }

        if (!productUpdated) {
            return res.status(404).send({
                message: `El producto ya no existe`
            })
        }

        res.status(200).send({
            product: productUpdated
        })
    })
}

const deleteProduct = (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send({
                message: `Error al borrar el producto: ${err}`
            })
        }

        if (!product) {
            return res.status(404).send({
                message: `El producto ya no existe`
            })
        }

        product.remove(err => {
            if (err) {
                return res.status(500).send({
                    message: `Error al borrar el producto: ${err}`
                })
            }

            res.status(200).send({
                message: `El producto ha sido eliminado`
            })
        })
    })
}

module.exports = {
    deleteProduct,
    getProduct,
    getProducts,
    saveProduct,
    updateProduct
}
