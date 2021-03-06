'use strict';

var valueTypes = require('./valueTypes.js');

var BookObj = function defineBook(title, bookCode, description, cost, inInventory, isPdf, isPrint, location, type, publisherUri) {
    this._title = title;
    this._bookCode = bookCode;
    this._description = description;
    this._cost = cost;
    this._inInventory = inInventory;
    this._isPdf = isPdf;
    this._isPrint = isPrint;
    this._location = location;
    this._type = type
    this._publisherUri = publisherUri;
};

Object.defineProperty(BookObj.prototype, 'title', {
    get: function getTitle() {
        return this._title.value;
    }
});

Object.defineProperty(BookObj.prototype, 'bookCode', {
    get: function getBookCode() {
        return this._bookCode.value;
    }
});

Object.defineProperty(BookObj.prototype, 'description', {
    get: function getDescription() {
        return this._description.value;
    }
});

Object.defineProperty(BookObj.prototype, 'cost', {
    get: function getCost() {
        return this._cost.value;
    }
});

Object.defineProperty(BookObj.prototype, 'inInventory', {
    get: function getInInventory() {
        return this._inInventory.value;
    }
});

Object.defineProperty(BookObj.prototype, 'isPdf', {
    get: function getIsPdf() {
        return this._isPdf.value;
    }
});

Object.defineProperty(BookObj.prototype, 'isPrint', {
    get: function getIsPrint() {
        return this._isPrint.value;
    }
});

Object.defineProperty(BookObj.prototype, 'location', {
    get: function getLocation() {
        return this._location;
    }
});

Object.defineProperty(BookObj.prototype, 'type', {
    get: function getType() {
        return this._type;
    }
});

Object.defineProperty(BookObj.prototype, 'publisherUri', {
    get: function getPublisherUri() {
        return this._publisherUri.value;
    }
});

module.exports.createBook = function createBook(title,
                                                bookCode,
                                                description,
                                                cost,
                                                inInventory,
                                                isPdf,
                                                isPrint,
                                                location,
                                                type,
                                                publisherUri) {

    if ((type !== valueTypes.BookTypeEnum.RPG) && (type !== valueTypes.BookTypeEnum.WarGame)) {
        throw new Error('The type is not a valid book type');
    }

    var isBookPdf = valueTypes.createForcedBoolean(isPdf);
    var isBookPrint = valueTypes.createForcedBoolean(isPrint);

    if ((isBookPdf.value === false) && (isBookPrint.value === false)) {
        throw new Error('The book must be either a print or PDF');
    }

    var book = new BookObj(valueTypes.createName(title),
                           valueTypes.createBookCode(bookCode),
                           valueTypes.createDescription(description),
                           valueTypes.createMoney(cost),
                           valueTypes.createForcedBoolean(inInventory),
                           isBookPdf,
                           isBookPrint,
                           location,
                           type,
                           valueTypes.createPublisherUri(publisherUri));

    return Object.freeze(book);
};
