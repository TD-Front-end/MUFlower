'use strict'
module.exports = function(app){
    var categoryCtrl = require('./controller/CategoryController');
    var supplierCtrl = require('./controller/SupplierController');
    var flowerCtrl = require('./controller/FlowerController');
    var receiptCtrl = require('./controller/ReceiptController');
    var cartCtrl = require('./controller/CartController');
    var userCtrl = require('./controller/UserController');

    //CRUD User
    app.route('/users').get(userCtrl.get)
    .post(userCtrl.insert);
    app.route('/users/:UserID')
    .get(userCtrl.detail)
    .put(userCtrl.update)
    .delete(userCtrl.delete);  

    //CRUD Category
    app.route('/categories').get(categoryCtrl.get)
    .post(categoryCtrl.insert);
    app.route('/categories/:CategoryID')
    .get(categoryCtrl.detail)
    .put(categoryCtrl.update)
    .delete(categoryCtrl.delete);


    //CRUD Supplier
    app.route('/suppliers').get(supplierCtrl.get)
    .post(supplierCtrl.insert);
    app.route('/suppliers/:SupplierID')
    .get(supplierCtrl.detail)
    .put(supplierCtrl.update)
    .delete(supplierCtrl.delete);

    //CRUD Flower
    app.route('/flowers').get(flowerCtrl.get)
    .post(flowerCtrl.insert);
    app.route('/flowers/:FlowerID')
    .get(flowerCtrl.detail)
    .put(flowerCtrl.update)
    .delete(flowerCtrl.delete);      

    //Receipt
    app.route('/receipt').get(receiptCtrl.get)
    .post(receiptCtrl.insert);
    app.route('/receipt/:ReceiptID').get(receiptCtrl.detail)
    app.route('/receiptDetail').post(receiptCtrl.insertDetail)
    app.route('/receiptDetail/:ReceiptID').get(receiptCtrl.getReceiptDetaildetail);

    //Cart
    app.route('/cart').post(cartCtrl.insert)
    app.route('/cart/:UserID').get(cartCtrl.get)
    app.route('/cart/:CartID').delete(cartCtrl.delete)
}