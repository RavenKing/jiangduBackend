var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
const { ohana } = require("ohana-node-orm");
const { query } = require("express");
const tableName = "SAP_JIANGDU_TAGS";

function checkData(res, data) {
  if (data == null) {
    res.send(500);
  }
}

router.get("/", function (req, res, next) {
  // #swagger.tags = ['Tag']
  // #swagger.summary = '获取Tag列表'
  /*  #swagger.parameters['TYPE'] = {
                in: 'query',
                description: '标签类别 PO/FI/TA...'
        } */
  const queryData = req.query;
  const policy = new ohana(tableName); // new ohana('table_name');
  if (queryData == null) {
    policy.find().then((result) => {
      res.send(result);
    });
  } else {
    policy.find(queryData).then((result) => {
      res.send(result);
    });
  }
});


router.put("/", function (req, res, next) {
  // #swagger.tags = ['Tag']
  // #swagger.summary = '修改Tag'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tag_update"
                    }  
                },
            }
    } */
  checkData(res, req.body.data);
  const { data } = req.body;
  console.log(data);
  updatePolicy(data)
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

/** insert tags */
router.post("/", function (req, res, next) {
  // #swagger.tags = ['Tag']
  // #swagger.summary = '新建Tag'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tag_add"
                    }  
                },
            }
    } */
  console.log(req.body);
  const { data } = req.body;
  console.log(data);
  //console.log(uunewid.v4())
  data.TAG_ID = uunewid.v4();
  insertData(data)
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

  // .then(
  //     (result) => {
  //         console.log(result);
  //          res.writeHead(200);
  //         return res.send(result);
  //     }
  // ).catch((err)=>{
  //     res.send(err);
  // });
});

async function insertData(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.insert(body);
  return result;
}

/**delete policy  */
router.delete("/", function (req, res, next) {
  // #swagger.tags = ['Tag']
  // #swagger.summary = '删除Tag'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tag_delete"
                    }  
                },
            }
    } */
  checkData(res, req.body.data);
  const { data } = req.body;
  deletePolicy(data)
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

async function updatePolicy(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.update(
    {
      TAG_ID: body.TAG_ID,
    },
    body
  );
  return result;
}
async function deletePolicy(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.raw(
    'delete from "SAP_JIANGDU_TAGS" where TAG_ID = \'' + body.TAG_ID + "'"
  );
  return result;
}

module.exports = router;
