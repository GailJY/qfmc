//开启Socket服务器
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
 // http.listen(_port || 8080);

const path = require('path');

//post方法
const bp = require('body-parser');

//session相当于cookie
// const session = require('express-session');

const userRouter = require('./users');
const productRouter = require('./product');
const orderRouter = require('./order');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

// const path = require('path');
//访问静态文件路径
// app.use(express.static(path.join(path.resolve(__dirname,'../../'),'/web')));
// app.use(express.static(path.resolve(__dirname,'../../')));

// app.use(session({secret:'keyboard cat',cookie:{maxAge:60000}}));

app.use(bp.urlencoded({extended:false}));

module.exports = {
    start(_port){

        userRouter.register(app);
        productRouter.register(app);
        orderRouter.register(app);
        
        http.listen(_port||8080,()=>{
            console.log(`running on http://localhost:${_port}`);
        });
    }
}