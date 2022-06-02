const express = require("express");
router  = express.Router();
const multer = require('multer')
const upload = multer({dest: 'uploads/'})	// 配置图片文件的路径(没有后缀名)
const fs = require('fs')
const app = express();
const mysql = require("mysql");


app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });

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

router.post('/image', (req, res, next) => {
    //上传文件只能通过这个插件接收  file是上传文件 fields是其他的
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../../static/'); //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
    form.maxFieldsSize = 1 * 1024 * 1024; //用户头像大小限制为最大1M    
    form.keepExtensions = true; //使用文件的原扩展名  
    form.parse(req, function (err, fields, file) {
      var filePath = '';
      //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。  
      if (file.tmpFile) {
        filePath = file.tmpFile.path;
      } else {
        for (var key in file) {
          if (file[key].path && filePath === '') {
            filePath = file[key].path;
            break;
          }
        }
      }
      //文件移动的目录文件夹，不存在时创建目标文件夹  
      var targetDir = path.join(__dirname, '../../static/uploads');
      if (!fs.existsSync(targetDir)) {
        fs.mkdir(targetDir);
      }
      var fileExt = filePath.substring(filePath.lastIndexOf('.'));
      //判断文件类型是否允许上传  
      if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
        var err = new Error('此文件类型不允许上传');
        res.json({
          code: -1,
          message: '此文件类型不允许上传'
        });
      } else {
        //以当前时间戳对上传文件进行重命名  
        var fileName = new Date().getTime() + fileExt;
        var targetFile = path.join(targetDir, fileName);
        //移动文件  
        fs.rename(filePath, targetFile, function (err) {
          if (err) {
            console.info(err);
            res.json({
              code: -1,
              message: '操作失败'
            });
          } else {
            User.update({
              username: req.cookies.username
            }, {
              avatar: fileName
            }, (err2, doc2) => {
  
              //上传成功，返回文件的相对路径  
              // var fileUrl = '/static/upload/' + fileName;
              res.json({
                code: 0,
                fileUrl: fileName
              });
            })
  
          }
        });
      }
    });
  })