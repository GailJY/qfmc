const db = require('../db');
const apiResult = require('../utils/apiResult');

const jwt = require('jsonwebtoken');

//过滤，filter.js 写好，那里需要就调用，按需加载
const filter = require('../utils/filter');

module.exports = {
 register(app){
        app.post('/login',(req,res)=>{
           
            let username = req.body.username;
            let password = req.body.password;
            var sql = `select * from users where username='${username}'`;
            
            db.mysql.select(sql).then(result=>{
                if(result.length>0){
                    sql += ` and password='${password}';`;
                   
                    db.mysql.select(sql).then((data)=>{
                       
                        if(data.length>0){
                           
                             var user = {name:username};
                           var token = jwt.sign(user, 'secret', {
                                    'expiresIn': 1440 // 设置过期时间
                                })
                          
                            res.send(apiResult(true,data,null,null,token));  
                           
                        }else{
                            
                            res.send(apiResult(false,null,'登录信息错误'));
                        }
                    }).catch((error)=>{
                        res.send(apiResult(false,null,null,error));
                    });
                }else{
                    res.send(apiResult(false,null,'此用户未注册'));
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

  app.get('/getcarlist', (req, res) => {
            let username = req.query.username;
            var sql = `select * from car where username='${username}'`;
            db.mysql.insert(sql).then(data=>{  
                var items = [];
                var i = 0;
                one();
                function one(){
                    var id = data[i].productID;
                    var size = data[i].size;
                    var qty = data[i].qty;
                    sql = `select * from product where id='${id}'`;
                    var obj = {};
                    obj.size = size;
                    obj.qty = qty;
                    db.mysql.insert(sql).then(item=>{
                        for(var attr in item[0]){
                            obj[attr] = item[0][attr];
                        }
                        items.push(obj);
                        i++;
                        if(i<data.length){
                            one();
                        }else{
                            res.send(apiResult(true,items))
                            return false;
                        }    
                    });
                }              
            });
        });
         app.get('/delProduct',(req,res)=>{
            let _name=req.query.username;
            let id =req.query.id;
            let _size = req.query.size;    
            let delsql=`DELETE FROM car WHERE username = '${_name}' and productID ='${id}' and size = '${_size}'`;
            
            db.mysql.select1(delsql, function(data){
                    res.send(data);
            })
        });
    app.post('/changelogin',(req,res)=>{
           
            let username = req.body.username;
            let password = req.body.password;
            let passwordn=req.body.passwordn;
            var sql = `select * from users where username='${username}'`;
            
            db.mysql.select(sql).then(result=>{
                if(result.length>0){
                    sql += ` and password='${password}';`;
                   
                    db.mysql.select(sql).then((data)=>{
                      // console.log('1');
                        if(data.length>0){
                           // console.log('12');
                         sql = `update users set  password='${passwordn}' where username='${username}'`
                         //console.log(sql)
                            db.mysql.insert(sql).then(result=>{
                                    res.send(apiResult(true,result));
             
                              }).catch(error=>{
                              res.send(apiResult(false,null,null,error));
                              }); 
                           
                        }else{
                            
                            res.send(apiResult(false,null,'密码错误'));
                        }
                    }).catch((error)=>{
                        res.send(apiResult(false,null,null,error));
                    });
                }else{
                    res.send(apiResult(false,null,'密码错误'));
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
        app.post('/address',(req, res)=>{
            let username = req.body.username;
            var sql = `select * from useraddress where username='${username}';`;
          //  console.log(sql)
            db.mysql.select(sql,username).then(result=>{
               
                if(result.length>0){
                    res.send(apiResult(true,result));
                }else{
                    res.send(apiResult(false));
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
           app.post('/updateaddress',(req, res)=>{
            let username = req.body.username;
            let name=req.body.name;
            let tele=req.body.tele;
            let address=req.body.address;
            var sql = `INSERT INTO useraddress (username, name,tele,address) VALUES ('${username}', '${name}','${tele}','${address}');`;
           //console.log(sql)
            db.mysql.insert(sql).then(result=>{
                res.send(apiResult(true,result));
             
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
        app.post('/myorder',(req, res)=>{
            let username = req.body.username;
            var sql = `select * from car where username='${username}';`;
               
            db.mysql.select(sql,username).then(result=>{
               
                if(result.length>0){
                    res.send(apiResult(true,result));
                }else{
                    res.send(apiResult(false));
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
         app.post('/deleteorder',(req, res)=>{
            let username = req.body.username;
            let productID = req.body.productID;

            var sql = `delete from car where username = ${username} and  productID=${productID}`;
          //console.log(sql)
                db.mysql.delete(sql).then(data=>{
                    res.send(data);
                })
        });
     app.post('/buylist',(req, res)=>{
            let username = req.body.username;
            var sql = `select * from buylist where username='${username}';`;
            
            db.mysql.select(sql,username).then(result=>{
               res.send(apiResult(true,result));
               
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
            app.post('/registers',(req,res)=>{
            let username = req.body.username;
            let password = req.body.password;

            let nicheng = req.body.nicheng;
            let gender = req.body.gender
            var sql = `select * from users where username='${username}'`;
            db.mysql.select(sql).then(result=>{
                if(result.length>0){
                    res.send(apiResult(false,null,'此用户已注册'));
                }else{
                    sql = `INSERT INTO users (username, password)
                            VALUES ('${username}', '${password}');`;
                    db.mysql.insert(sql).then(data=>{
                        res.send(apiResult(true,data))
                    }).catch(error=>{
                        res.send(apiResult(false,null,null,error));
                    });
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
            app.post('/product',(req, res)=>{
            let id = req.body.id;
            var sql = `select * from product where id='${id}';`;
               
            db.mysql.select(sql).then(result=>{
               
                if(result.length>0){
                    res.send(apiResult(true,result));
                }else{
                    res.send(apiResult(false));
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });
        // 华丽分割线···············································

        app.post('/register',(req,res)=>{
            let username = req.body.username;
            let password = req.body.password;
            let nicheng = req.body.nicheng;
            let gender = req.body.gender
            var sql = `select * from users where username='${username}'`;
            db.mysql.select(sql).then(result=>{
                if(result.length>0){
                    res.send(apiResult(false,null,'此用户已注册'));
                }else{
                    sql = `INSERT INTO users (username, password, gender, nicheng)
                            VALUES ('${username}', '${password}', '${gender}', '${nicheng}');`;
                    db.mysql.insert(sql).then(data=>{
                        res.send(apiResult(true,data))
                    }).catch(error=>{
                        res.send(apiResult(false,null,null,error));
                    });
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

        app.post('/phone',(req, res)=>{
            let username = req.body.username;
            var sql = `select * from users where username='${username}';`;
            db.mysql.login(sql).then(result=>{
                if(result.length>0){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false));
                }
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

        app.post('/changepwd',(req, res)=>{
            let username = req.body.username;
            let password = req.body.password;
            var sql = `update users set password='${password}' where username='${username}';`;
            db.mysql.login(sql).then(result=>{
                res.send(apiResult(true));
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

        app.post('/changemsg',(req, res)=>{
            let username = req.body.username;
            let gender = req.body.gender;
            let nicheng = req.body.nicheng;
            var sql = `update users set gender='${gender}' where username='${username}';update users set nicheng='${nicheng}' where username='${username}';`;
            db.mysql.login(sql).then(result=>{
                res.send(apiResult(true));
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

        app.post('/changeallmsg',(req, res)=>{
            let username = req.body.username;
            let gender = req.body.gender;
            let nicheng = req.body.nicheng;
            let password = req.body.password;
            var sql = `update users set gender='${gender}' where username='${username}';update users set nicheng='${nicheng}' where username='${username}';update users set password='${password}' where username='${username}';`;
            db.mysql.login(sql).then(result=>{
                res.send(apiResult(true));
            }).catch(error=>{
                res.send(apiResult(false,null,null,error));
            });
        });

        app.get('/users',(req,res)=>{
            let page = req.query.page;
            let pageItems = req.query.pageitems;
            var sql = `select SQL_CALC_FOUND_ROWS * from users`;
            if(page && pageItems){
                sql += ` limit ${(page - 1) * pageItems},${pageItems}`;
            }
            sql += "; select FOUND_ROWS() as rowsCount;";
            db.mysql.select(sql).then((data)=>{
                res.send(data);
            }).catch((error)=>{
                res.send(error);
            });
        });
    }
}