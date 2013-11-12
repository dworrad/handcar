var _ = require('underscore')
var extend = require('util')._extend;
/**
 * Created by Ryanl on 8/10/13.
 */
exports = setup = function(){

}

exports = mybase = {

    init : function(continstnace, model){

        //External API Proxy Functions
        //Create
        continstnace.create = function () {
            var controller = this
//            if(controller.req.body.length != undefined){
//                //the body contained more than one item to be created
//                continstnace.insert.many(controller.req.body, function (result) {
//                    controller.res.set('Content-Type', 'application/json');
//                    controller.res.send(result)
//                })
//            }else{
                //the body only contained one item
                continstnace.insert.one(controller.req.body, function (err, result) {
                    controller.res.set('Content-Type', 'application/json');
                    controller.res.send(result)
                })
//            }

        }
        //Read
        continstnace.index = function () {
            var controller = this
            console.log(controller.req.query)
            continstnace.select.where(controller.req.query, function(err, result){
                controller.res.set('Content-Type', 'application/json');
                controller.res.send(result)
            })

        }
        continstnace.show = function () {

            var controller = this

            continstnace.select.one(controller.req.params.id ,function(err, result){
                controller.res.set('Content-Type', 'application/json');
                controller.res.send(result)
            })

        }
        //Update
        continstnace.update = function () {

            var controller = this;

            continstnace.update.one(controller.req.params.id, controller.req.body, function(err, result){
                controller.res.set('Content-Type', 'application/json');
                controller.res.send(result)
            })

        }
        //Delete
        continstnace.destroy = function () {

            var controller = this;

            continstnace.delete.one(controller.req.params.id, function(err, result){
                controller.res.set('Content-Type', 'application/json');
                controller.res.send(result)
            })

        }


        //Internal Logical Functions
        //Create / Insert
        continstnace.insert = {

            one :  function(insertObject, cb){

                model.new(insertObject, function (err, insertitem) {
                    cb(err, insertitem)
                })

            }

            //Ryan: Disabled Insert.Many due to api change
            /*
            many : function(insertObjects, cb){

                var results = [];

                continstnace.insert.manyrecursive(insertObjects, 0, results, function(results){
                    cb(results)
                })

            },

            //recursive function to insert multiple documents only throws 1 callback, do not call out side of base.js (private method)
            manyrecursive : function(insertObjects, index, results, cb){
                continstnace.insert.one(insertObjects[index], function(err, result){
                    if(err){
                        results.push(result)
                    }else{
                        results.push(err)
                    }
                    index ++;
                    if(index == insertObjects.length){
                        cb(results)
                    }else{
                        continstnace.insert.manyrecursive(insertObjects, index, results, cb)
                    }
                })
            }
            */

        }
        //Read / Get
        continstnace.select = {
            one : function(id, cb){

                model.findById(id, function (err, selecteditems) {
                    cb(err, selecteditems)
                })

            },

            where : function(query, cb){

                model.find(query, function (err, selecteditems) {
                    cb(err, selecteditems)
                })

            }
        }
        //Update
        continstnace.update = {

            one : function(id, parameters, cb){

                var upsert = extend({}, parameters);
                delete upsert._id
                model.findByIdAndUpdate(id, { $set: upsert }, function (err, emailitem) {
                    cb(err, emailitem)
                })

            }

            //Ryan: Disabled Update.Many due to changes
            /*
            many : function(id, cb){
                cb({'error  ' : '404', 'desc' : 'function not implemented', 'friendly' : 'function not implemented', 'requestid' : id})
            }
            */

        }
        //Delete
        continstnace.delete = {

            one : function(id, cb){

                model.remove({ _id:  id }, function (err) {
                    if (err) {
                        cb(err,false)
                    } else {
                        cb(err, true)
                    }
                })

            }

            //Ryan: Disabled Delete.Many due to changes
            /*
            many : function(id, cb){
                cb({'error' : '404', 'desc' : 'function not implemented', 'friendly' : 'function not implemented', 'requestid' : id})
            }
            */

        }


    }
}