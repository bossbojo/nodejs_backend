const express = require('express');
const repository = require('../repositories/rep_products');
const router = express.Router();

//CRUD is basic all model
//get all data
router.get('/', (request, response, next) => {
    repository.GetProduct().then((res) => {
        response.status(200).json({
            data: res
        });
    }).catch((err) => {
        response.status(500).json({
            error: err
        });
    });
})
//get data by id
router.get('/:id', (request, response, next) => {
    repository.GetProductById(request.params.id).then((res) => {
        response.status(200).json({
            data: res
        });
    }).catch((err) => {
        response.status(500).json({
            error: err
        });
    });
})
// create data
router.post('/', (request, response, next) => {
    var qry = repository.CreateProduct(request.body);
    response.status(200).json({
        data: qry
    });
})
// update data
router.put('/:id', (request, response, next) => {
    response.status(200).json({
        data: 'Update Data by ID :' + request.params.id
    });
})
//delete data
router.delete('/:id', (request, response, next) => {
    console.log(request.params.id);
    repository.DeleteProduct(request.params.id).then((res) => {
        response.status(200).json({
            data: res
        });
    }).catch((err) => {
        response.status(500).json({
            error: err
        });
    });
})

module.exports = router;