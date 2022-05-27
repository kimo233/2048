const express = require("express");
const app = express();
const mysql = require("mysql");

app.listen(3001,()=>{
    console.log("服务器开启3001端口...")
})


// 创建与数据库的连接
const db = mysql.createConnection({
    host:'120.25.148.88',
    user:"root",
    password:'1040679458',
    database:"2048"    //数据库名称
})

db.connect((err)=>{
    if(err) throw err;
    console.log("连接成功");
})

//获得排名表
app.get("/getUser",(req,res)=>{
    let sql = "select userName,bestGoal from User where isAdmin=0 Order By bestGoal DESC";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //将数据转换为json格式
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.json({
                status:'200',
                msg:data
            })
        }
    })
})
//搜索是否存在用户
app.get("/search",(req,res)=>{
    console.log(req.query, req.body);
    let sql = "select * from User ";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //将数据转换为json格式
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.json({
                status:'200',
                msg:data
            })
        }
    })
})
//获得密码
app.get("/login/:id",(req,res)=>{
    console.log(req.query, req.body);
    let sql = "select userName,password,isAdmin from User where userName='"+req.params.id+"'";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //将数据转换为json格式
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.json({
                status:'200',
                msg:data
            })
        }
    })
})
//更新成绩
app.get("/update/:id/:goal",(req,res)=>{
    let sql = "update User SET bestGoal="+req.params.goal+" where userName='"+req.params.id+"'";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //将数据转换为json格式
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.json({
                status:'200',
                msg:data
            })
        }
    })
})
//添加用户
app.get("/add/:id/:pass",(req,res)=>{
    let sql = "insert into User (userName,password) values('"+req.params.id+"','"+req.params.pass+"')";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //将数据转换为json格式
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.json({
                status:'200',
                msg:data
            })
        }
    })
})
//删除用户
app.get("/delete/:id",(req,res)=>{
    let sql = "delete from User where userName='"+req.params.id+"'";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //将数据转换为json格式
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.json({
                status:'200',
                msg:data
            })
        }
    })
})
//更改信息
app.get("/updateInfo/:id/:newId/:pass",(req,res)=>{
    let sql = "update User SET userName='"+req.params.newId+"',password='"+req.params.pass+"' where userName='"+req.params.id+"'";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //将数据转换为json格式
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.json({
                status:'200',
                msg:data
            })
        }
    })
})