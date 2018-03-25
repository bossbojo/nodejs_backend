const Product = require('../models/m_product');
const mongoose = require('mongoose');
module.exports = {
    GetProduct: () => {
        return new Promise((resolve, reject) => {
            Product.find().exec()
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        })
    },
    GetProductById: (id) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .exec()
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        })
    },
    CreateProduct: (request) => {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: request.name,
            price: request.price
        });
        product.save().then((result) => {}).catch((err) => {
            return err;
        });
        return product;
    },
    UpdateProduct: (request, id) => {

    },
    DeleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            Product.remove({_id:id})
                .exec()
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
}