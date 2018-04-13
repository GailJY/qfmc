const filter = require('../utils/filter');
const db = require('../db');
const apiResult = require('../utils/apiResult');

module.exports = {
    register:(app)=>{
        app.post('/order',(req,res)=>{
            let username = req.body.username;
            let items = req.body.items;
                 
            let status = req.body.status;
            let orderNo = req.body.orderNo;
            let address = req.body.address;
            
            sql = `INSERT INTO orders (username, items, status, orderNo, address) VALUES ('${username}', '${items}', '${status}', '${orderNo}', '${address}');`;
            db.mysql.insert(sql).then(data=>{
                res.send(apiResult(true,data))
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

        app.get('/getorder',(req,res)=>{
            let username = req.query.username;
            
            var sql = `select * from orders where username = '${username}'`;
            db.mysql.insert(sql).then(data=>{
                res.send(apiResult(true,data))
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

        app.get('/zhifu',(req,res)=>{
            let username = req.query.username;
            let orderNo = req.query.orderNo*1;
            console.log(orderNo);
            console.log(username);
            let status = 1;
            var sql = `update orders set status='${status}' where username = '${username}' and orderNo = '${orderNo}' `;
            db.mysql.insert(sql).then(data=>{
                res.send(apiResult(true,data))
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
    }
}