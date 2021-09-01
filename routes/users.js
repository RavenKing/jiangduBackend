var express = require('express');
var uunewid = require('uuid');
var router = express.Router();
const {
  ohana
} = require('ohana-node-orm');

const tableName="SAP_JIANGDU_USERS";
/* GET users listing. */
router.get('/', function (req, res, next) {
  const user = new ohana(tableName); // new ohana('table_name');
  user.find().then((result) => {
    res.send(result)
  });
});

/** insert policys */
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

module.exports = router;