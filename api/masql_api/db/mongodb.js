const mongo = require('mongodb');
const client = mongo.MongoClient;

const ObjectID = mongo.ObjectID;

let db;
client.connect('mongodb://10.3.136.233:27017',(_error,client)=>{
    if(_error){
        return false;
    }
    db = client.db('ydq');
})

module.exports = {
    //查询 
     select:(_collection,_condition)=>{
        if(db){
            return new Promise((resolve,reject)=>{
                db.collection(_collection).find(_condition || {}).toArray((_error, _data) => {
                    if(_error){
                        reject(_error)
                    } else {
                        resolve(_data);
                    }
                })
            })
        }
    },

    //模糊查询
    selectone:(_collection,_condition)=>{
        var obj = {};
        for(var attr in _condition){
            obj[attr] = {$regex:new RegExp(_condition[attr])}
        }
        if(db){
            return new Promise((resolve,reject)=>{
                db.collection(_collection).find(obj || {}).toArray((_error, _data) => {
                    if(_error){
                        reject(_error)
                    } else {
                        resolve(_data);
                    }
                })
            })
        }
    },

    selecttwo:(_collection,_condition)=>{
        var arr = [];
        _condition.forEach((item)=>{  
            for(var attr in item){
                var obj = {};
                obj[attr] = {$regex:new RegExp(item[attr])}
            }
            arr.push(obj) 
        });    
        if(db){
            return new Promise((resolve,reject)=>{
                db.collection(_collection).find({$or:arr} || {}).toArray((_error, _data) => {
                    if(_error){
                        reject(_error)
                    } else {
                        resolve(_data);
                    }
                })
            })
        }
    },
    //价格排序
    selectprice:(_collection,_condition,_key)=>{
        var obj = {};
        var n = 1;
        for(var attr in _condition){
            obj[attr] = {$regex:new RegExp(_condition[attr])}
        }
        if(_key.price==-1){
            n = -1;
        }
        if(db){
            return new Promise((resolve,reject)=>{
                db.collection(_collection).find(obj || {}).sort({price: n}).toArray((_error, _data) => {
                    if(_error){
                        reject(_error)
                    } else {
                        resolve(_data);
                    }
                })
            })
        }
    },

    //更改
    update: (_collection,_condition,_data) => {
        if(db){
            return new Promise((resolve, reject) => {
                db.collection(_collection).update(_condition,{'$set':_data}).then((_result,_err)=>{
                    if(_err){
                        reject(_err);
                    }else{
                        resolve(_result);
                    }
                });  
            });
        }
    },


    //添加
    insert:(_collection,_condition) =>{
        return new Promise((resolve,reject)=>{
            db.collection(_collection).insert(_condition).then((result,error)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            })
        })
    },

    //删除
    delete:(_collection,_condition) => {
        return new Promise((resolve,reject)=>{
            db.collection(_collection).remove(_condition).then((result,error)=>{
                resolve(result);
            })
        })
    },
    objectid: (_id) => {
        return _id ? new ObjectID(_id) : new ObjectID();
    }
}