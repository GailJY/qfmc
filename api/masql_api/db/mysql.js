var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'angular',
    multipleStatements: true
});

module.exports = {
    select(sql,username){
        if(pool){
            return new Promise((resolve,reject)=>{
                pool.query(sql,(error, rows)=>{
                    if(error){
                        reject(error);
                    }else{
                        if(rows.length > 1){
                            if(username){
                              
                                resolve(rows)
                                return;
                            }
                            resolve({rowsCount: rows[1][0]['rowsCount'],data: rows[0]});
                        }else{
                            resolve(rows);
                        }
                    }
                });
            });   
        }
    },
    login(sql){
        if(pool){
            return new Promise((resolve,reject)=>{
                pool.query(sql,(error, res)=>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(res);
                    }
                });
            });   
        }
    },
    delete(sql){
        if(pool){
            return new Promise((resolve,reject)=>{
                pool.query(sql,(error, res)=>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(res);
                    }
                });
            });   
        }
    },
      select1: function(_sql, _callback){
      pool.query(_sql, function(error, results){
        if(error){
            _callback({status: false, error: error})
        }else{
            _callback({status: true,data:{results}});
        }
      })
    },
    insert(sql){
        if(pool){
            return new Promise((resolve,reject)=>{
                pool.query(sql,(error, res)=>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(res);
                    }
                });
            });   
        }
    }
}