var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
const { ohana } = require("ohana-node-orm");

const tableName = "SAP_JIANGDU_RECOMMENDED_LIST";
/* GET users listing. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['RecommendList']
  // #swagger.summary = '获取推荐列表'
  const user = new ohana(tableName); // new ohana('table_name');
  user.find().then((result) => {
    res.send(result);
  });
});

router.post("/", function (req, res, next) {
  // #swagger.tags = ['RecommendList']
  // #swagger.summary = '新建推荐列表'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/recommendList"
                    }  
                },
            }
    } */
  const { data } = req.body;
  if (data.length > 0) {
    data.map((one) => {
      one.RECOMMENDED_LIST_ID = uunewid.v4();
    });
    insertData(data)
      .then((result) => {
        console.log(result);
        if (result == 4 || result == 1) {
          res.sendStatus(200);
        } else {
          console.log(result);
          res.send(500);
        }
        //return res.send(result)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //console.log(uunewid.v4())
  // console.log(data);
});

router.post("/notices", function (req, res, next) {
  // #swagger.tags = ['RecommendList']
  // #swagger.summary = '??????'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/recommendList"
                    }  
                },
            }
    } */
  const queryData = req.query;
  const recommendLists = new ohana(tableName); // new ohana('table_name');
  if (queryData == null) {
    recommendLists.find().then((result) => {
      res.send(result);
    });
  } else {
    recommendLists.find(queryData).then(async (result) => {
      const rets = await Promise.all(
        result.map(async (one) => {
          content = await getTypedContent(one.TYPE, one.RECOMMENDED_ID);
          for (var obj in content) {
            one[obj] = content[obj];
          }
        })
      );
      console.log(result);
      res.send(result);
    });
  }
});

// get count 


router.post("/getUnreadNoticeCount", function (req, res, next) {
  // #swagger.tags = ['RecommendList']
  // #swagger.summary = '获取未读的消息数量'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/recommendList"
                    }  
                },
            }
    } */
  const { data } = req.body;
  countUnreadNotice(data).then((result)=>{
    if(result.length>0)
    {
      res.send({count:result[0]["COUNT(RECOMMENDED_LIST_ID)"]});
    }else{
      res.sendStatus(500)
    }
  })
  //console.log(uunewid.v4())
  // console.log(data);
});

router.post("/toggleNotice", function (req, res, next) {

  //checkData(res, req.body.data);
  const { data } = req.body;
  updateNoticeStatus(data)
    .then((result) => {
      console.log(result);
      if (result == 1) {
        res.sendStatus(200);
      } else {
        res.send(500);
      }
      //return res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/", function (req, res, next) {
  // #swagger.tags = ['RecommendList']
  // #swagger.summary = '修改推荐列表'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/recommendList"
                    }  
                },
            }
    } */
  //checkData(res, req.body.data);
  const { data } = req.body;
  updateMessage(data)
    .then((result) => {
      console.log(result);
      if (result == 1) {
        res.sendStatus(200);
      } else {
        res.send(500);
      }
      //return res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

async function countUnreadNotice(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.count(
   "RECOMMENDED_LIST_ID",
    body
  );
  return result;
}

async function insertData(body) {
  const user = new ohana(tableName); // new ohana('table_name');
  const result = await user.batchInsert(body);
  return result;
}

async function updateNoticeStatus(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.update(
    {
      RECOMMENDED_LIST_ID: body.RECOMMENDED_LIST_ID,
    },
    {"STATUS":body.STATUS
  }
  );
  return result;
}
async function updateMessage(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.update(
    {
      MESSAGE_ID: body.MESSAGE_ID,
    },
    body
  );
  return result;
}

async function insertData(body) {
  const user = new ohana(tableName); // new ohana('table_name');
  const result = await user.batchInsert(body);
  return result;
}

async function getTypedContent(TYPE_TYPE, ID_ID) {
  data = {};
  switch (TYPE_TYPE) {
    case "PO":
      table_name = "SAP_JIANGDU_POLICYS";
      search = new ohana(table_name);
      result = await search.findOne({ POLICY_ID: ID_ID });
      data.TITLE = result[0].POLICY_TITLE;
      data.URL = result[0].POLICY_URL;
      return data;

    case "TA":
      table_name = "SAP_JIANGDU_TALENTS";
      search = new ohana(table_name);
      result = await search.findOne({ TALENT_ID: ID_ID });
      return result;

    case "FI":
      table_name = "SAP_JIANGDU_JINGRONGHUQIS";
      search = new ohana(table_name);
      result = await search.findOne({ FIN_ID: ID_ID });
      return result;

    case "AS":
      table_name = "SAP_JIANGDU_ASSETS";
      search = new ohana(table_name);
      result = await search.findOne({ FIN_ID: ID_ID });
      return result;

    case "TE":
      table_name = "SAP_JIANGDU_INNOS";
      search = new ohana(table_name);
      result = await search.findOne({ FIN_ID: ID_ID });
      return result;
  }
}

module.exports = router;
