var express = require('express');
var uunewid = require('uuid');
var router = express.Router();
const jwt = require('jsonwebtoken')
var {PRIVITE_KEY,EXPIRESD} = require("../utils/store")

const {
  ohana
} = require('ohana-node-orm');

/** */
function checkData(res, data) {
  if (data == null) {
      res.send(500)
  }
}

const tableName="SAP_JIANGDU_USERS";
/* GET users listing. */
router.get('/', function (req, res, next) {
  const user = new ohana(tableName); // new ohana('table_name');
  user.find().then((result) => {
    res.send(result)
  });
});

// 注册接口
router.post('/register', async (req, res, next)=>{
  const user = new ohana(tableName);
  const{data} = req.body
  username = data.USER_NAME
  password = data.PASSWORD
  try {
    // 查询当前用户名在不在数据库中(使用async方法后必须使用await方法才有值返回，不然返回promise对象)
    let user = await user.findOne({USER_NAME: username, PASSWORD: password});
    // 存在res即是数据库中有数据
    if (user && user.length != 0) {
      res.send({
        code: -1,
        msg: "用户已注册"
      })
    } else {
      // 对密码进行加密
    md5_password = md5(username + password)
      // async 和 await 向数据库插入数据
    data.USER_ID=uunewid.v4();
    data.PASSWORD = md5_password;
    await user.insert(body);
    res.send({
        code: 0,
        msg: "注册成功"
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
});

router.post('/login', async function(req, res, next){
  const user = new ohana(tableName);
  username = data.USER_NAME
  password = data.PASSWORD

  try {
    let res1 = await user.findOne({USER_NAME: username, PASSWORD: password});
    let res2 = await user.findOne({COMPANY_CODE: username, PASSWORD: password});
    let res3 = await user.findOne({PHONE: username, PASSWORD: password});
  
    let res = [];
    res.push(...res1);
    res.push(...res2);
    res.push(...res3);
  
    let real_user_name = res.USER_NAME
    md5_password = md5(real_user_name + password)
  
    if (res && res.length != 0 && res.PASSWORD == md5_password){
  
      let token = jwt.sign(real_user_name, PRIVITE_KEY, {expiresIn:EXPIRESD})
      res.send({
        code: 0,
        user_name: res.USER_NAME,
        status: 'ok',
        token: token
      })
    } else {
      res.send({
          code: -1,
          msg: "用户名或密码错误！"
        })
    }
  } catch(error) {
    console.log(error)
    next(error)
  }
})

router.get('/getCompanyInfo', function(req, res, next){
  checkData(res,req.body);
  getCompanyInfo(req.body).then((result)=>{
      //console.log(result);
      if(result !== undefined)
      {
          res.send(result)
      }else{
          res.send(500)
      }
      //return res.send(result)
  }).catch((err)=>{
      console.log(err);
  })
})

router.post('/', function (req, res, next) {
  const {data} = req.body;
  //console.log(uunewid.v4())
  data.USER_ID=uunewid.v4();
  data.CREATED_AT="2021-08-25 07:59:07.747000000";
  data.UPDATED_AT="2021-08-25 07:59:07.747000000";
  data.LOG_DATE = "2021-08-25 07:59:07.747000000";
  data.VALIDATEDATE = "2021-08-25 07:59:07.747000000";
  data.HEZHUN_TIME ="2021-08-25 07:59:07.747000000";
  data.TOKEN="2313122"; 
  data.COMPANY_CODE="12312312";
  console.log(data);
  insertData(data).then((result)=>{
     if(result ==1 )
     {
          res.sendStatus(200)
     }else{
       console.log(result)
         res.send(500)
     }
     //return res.send(result)
 }).catch((err)=>{
     console.log(err);
 });
});

async function insertData(body) {
 const user = new ohana(tableName); // new ohana('table_name');
 const result = await user.insert(body);
 return result;
}

/**
 * 127.0.0.1:4000/api/users/getCompanyInfo
 * @param {*} body 
 * @returns 
 */
async function getCompanyInfo(body) {
  const user = new ohana(tableName); // new ohana('table_name');
  const result = await user.raw(
      "SELECT \"USER_ID\",  \"COMPANY_NAME\", \"COMPANY_CODE\", \"COMPANY_TYPE\" FROM \""+ tableName + "\""
    )
    return result;
}

module.exports = router;