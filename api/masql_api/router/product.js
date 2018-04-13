const filter = require('../utils/filter');
const db = require('../db');
const apiResult = require('../utils/apiResult');

module.exports={
    register(app){
        app.get('/product',(req,res)=>{
            let page = req.query.page;
            let pageItems = req.query.pageitems;
            let sort = req.query.sort;
            let paixu = req.query.paixu;
            let brand = req.query.brand;

            var sql = `select SQL_CALC_FOUND_ROWS * from product`;

            if(sort){
                sql += ` where sort='${sort}'`;
            }
            if(brand){
                var arr = brand.split(', ');
                var str = '';
                str += 'brand="'+arr[0]+'"';
                for(var i=1;i<arr.length;i++){
                    str += ' or brand="'+arr[i]+'"';
                }
                if(sort){
                    sql += ` and ${str}`;
                }else{
                    sql += ` where ${str}`;
                }       
            }
            if(paixu=='高'){
                sql += ` ORDER BY price desc`;
            }else if(paixu=='低'){
                sql += ` ORDER BY price asc`;
            }

            if(page && pageItems){
                sql += ` limit ${(page - 1) * pageItems},${pageItems}`;
            }
            sql += "; select FOUND_ROWS() as rowsCount;";

            db.mysql.select(sql).then((data)=>{
                res.send(apiResult(true,data));
            }).catch((error)=>{
                res.send(apiResult(false,null,null,error));
            });
        });


        app.get('/productBrand', (req, res) => {
            var sql = `select * from product ORDER BY brand asc`;

            db.mysql.insert(sql).then(data=>{
                res.send(apiResult(true,data));
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });


        app.get('/productId', (req, res) => {
            let id = req.query.id;

            var sql = `select * from product where id='${id}'`;

            db.mysql.insert(sql).then(data=>{
                res.send(apiResult(true,data));
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
         app.post('/productIds', (req, res) => {
            let id = req.body.id;
            var sql = `select * from product where id = '${id}'`;
          
            db.mysql.select(sql).then(data=>{
                res.send(data);
            })
        });

        app.post('/addtocar', (req, res) => {
            let productID = req.body.productID;
            let username = req.body.username;
            let size = req.body.size;
            let qty = 1;

            var sql = `select * from car where username='${username}' and productID='${productID}' and size='${size}'`;

            db.mysql.insert(sql).then(data=>{  
                if(data!=''){   
                    qty += data[0].qty;
                    sql = `update car set qty='${qty}' where username='${username}' and productID='${productID}' and size='${size}';`;

                }else{
                    sql = `INSERT INTO car (username, productID, size, qty) VALUES ('${username}', '${productID}', '${size}', '${qty}');`;
                }
                db.mysql.insert(sql).then(result=>{
                    res.send(apiResult(true,result))
                }).catch(error=>{
                    res.send(apiResult(false,null,null,error));
                });  

            })
        });

        app.get('/mohu',(req,res)=>{
            let obj = req.query;
            let mohu = obj.mohu;  
            var sql =  `select *  FROM product WHERE name LIKE '%${mohu}%'`;
            let username='1'
            db.mysql.select(sql,username).then(data=>{
                res.send(apiResult(true,data));
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            })
        })

    }
}