'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');

var CUT_PATH = '../../lib/controllers/publisherListController.js';

describe('The Publisher List Controller behaves as follows --', function specifyPublisherListBehaviors() {
    
    describe('When the system GETs a Publisher List --', function specifyGet() {
        
        it('will return a 200 Status Code and the correct Publisher List when one exists', function checkSuccessful(done) {

			var samplePublisherList = require('./fakes/publisherList.js').createFakePublisherList();
            
			var dataService = {
				getAllPublishers: function mock(callback) {
					callback(null, samplePublisherList);
				}
			};

			var req = {
				body: {}
			};

			var res = {
				status: sinon.spy(),
				json: sinon.spy(),
				send: sinon.spy()
			};

			var cut = require(CUT_PATH)(dataService);
			cut.get(req, res);

			assert.isTrue(
				res.status.calledWith(200),
				'Unexpected status code'
			);
			assert.isTrue(
				res.json.calledWith(samplePublisherList),
				'Unexpected response: ' + res.json.args[0][0]
			);
			assert.isTrue(res.json.calledOnce);
            done();
        });
        
        it ('will return a 404 if no Publisher List is found', function checkNoPublisherList(done) {

			var sampleEmptyPublisherList = require('./fakes/publisherList.js').createEmptyFakePublisherList();
            
			var dataService = {
				getAllPublishers: function mock(callback) {
					callback(null, sampleEmptyPublisherList);
				}
			};
            
			var req = {
				body: {}
			};

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};

			var cut = require(CUT_PATH)(dataService);
			cut.get(req, res);

			assert.isTrue(
				res.status.calledWith(404),
				'Unexpected status code'
			);
			assert.isTrue(res.send.calledOnce);
            
            done();
        });
    });
    
});