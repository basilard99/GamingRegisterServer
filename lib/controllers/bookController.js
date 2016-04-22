'use strict';

var publisherFactory = require('../models/book.js');
var Promise = require('bluebird');

var UNKNOWN_ERROR = 'BI: An unknown error occurred';

var BookControllerObj = function defineBookController(dataService) {
    this._dataService = dataService;
};

BookControllerObj.prototype.put = function postAction(req) {

    var _this = this;

    return new Promise(function postBookPromise(resolve, reject) {

        var book;

        try {
            book = require('../models/book.js').createBook(req.body.title,
                                                           req.body.bookCode,
                                                           req.body.description,
                                                           req.body.cost,
                                                           req.body.inInventory,
                                                           req.body.isPdf,
                                                           req.body.isPrint,
                                                           req.body.location,
                                                           req.body.type);
        } catch (e) {
            e.httpStatus = 400;
            reject(e);
        };

        return _this._dataService.saveBook(book)
            .then(function saveBookSuccessful(model) {
                resolve({ httpStatus: 201, data: model });
            }).catch(function saveBookFailed(e) {
                e.httpStatus = 500;
                reject(e);
            });

    });

};

module.exports.createBookController = function createBookController(dataService) {
    return new BookControllerObj(dataService);
};