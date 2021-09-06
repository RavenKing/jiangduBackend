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
      if (result == 4 || result == 1 ) {
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

router.post('/notices', function (req, res, next) {
  console.log("here!")
  const queryData = req.query;
  const recommendLists = new ohana(tableName); // new ohana('table_name');
  if (queryData == null) {
    recommendLists.find().then((result) => {
          res.send(result)
      });
  } else {
    recommendLists.find(queryData).then(async (result) => {
      const rets = await Promise.all(result.map((async (one)=> {
          content = await getTypedContent(one.TYPE, one.RECOMMENDED_ID)
            for (var obj in content) {
              one[obj] = content[obj]
            }
        })))
        console.log(result)
        res.send(result)
      });
  }
});

router.put('/', function (req, res, next) {
  checkData(res, req.body.data)
  const {
      data
  } = req.body;
  updateMessage(data).then((result) => {
      console.log(result);
      if (result == 1) {
          res.sendStatus(200)
      } else {
          res.send(500)
      }
      //return res.send(result)
  }).catch((err) => {
      console.log(err);
  })
});


async function updateMessage(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.update({
      MESSAGE_ID: body.MESSAGE_ID
  }, body);
  return result;
}

async function insertData(body) {
  const user = new ohana(tableName); // new ohana('table_name');
  const result = await user.batchInsert(body);
  return result;
}

async function getTypedContent(TYPE_TYPE, ID_ID) {
  data = {};
  switch(TYPE_TYPE) {
    case "PO":
      table_name = "SAP_JIANGDU_POLICYS";
      search = new ohana(table_name);
      result = await search.findOne({POLICY_ID: ID_ID})
      data.TITLE = result[0].POLICY_TITLE
      data.URL = result[0].POLICY_URL
      return data

    case "TA":
      table_name = "SAP_JIANGDU_TALENTS";
      search = new ohana(table_name);
      result = await search.findOne({TALENT_ID: ID_ID})
      return result

    case "FI":
      table_name = "SAP_JIANGDU_JINGRONGHUQIS"
      search = new ohana(table_name);
      result = await search.findOne({FIN_ID: ID_ID})
      return result
      
    case "AS":
      table_name = "SAP_JIANGDU_ASSETS"
      search = new ohana(table_name);
      result = await search.findOne({FIN_ID: ID_ID})
      return result

    case "TE":
      table_name = "SAP_JIANGDU_INNOS"
      search = new ohana(table_name);
      result = await search.findOne({FIN_ID: ID_ID})
      return result
  }
}

module.exports = router;