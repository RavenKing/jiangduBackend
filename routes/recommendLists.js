var express = require('express');
var uunewid = require('uuid');
var router = express.Router();
const {
  ohana
} = require('ohana-node-orm');

const tableName = "SAP_JIANGDU_RECOMMENDED_LIST";
/* GET users listing. */
router.get('/', function (req, res, next) {
  const user = new ohana(tableName); // new ohana('table_name');
  user.find().then((result) => {
    res.send(result)
  });
});

/** insert policys */
router.post('/', function (req, res, next) {
  const {
    data
  } = req.body;
  if (data.length > 0) {
    data.map((one) => {
      one.RECOMMENDED_LIST_ID = uunewid.v4();
    })
    insertData(data).then((result) => {
      console.log(result)
      if (result == 4) {
        res.sendStatus(200)
      } else {
        console.log(result)
        res.send(500)
      }
      //return res.send(result)
    }).catch((err) => {
      console.log(err);
    });
  }
  //console.log(uunewid.v4())
  // console.log(data);

});


async function insertData(body) {
  const user = new ohana(tableName); // new ohana('table_name');
  const result = await user.batchInsert(body);
  return result;
}

module.exports = router;