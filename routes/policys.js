var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
const { ohana } = require("ohana-node-orm");

function checkData(res, data) {
  if (data == null) {
    res.send(500);
  }
}
const tagTableName = "SAP_JIANGDU_TAG_POLICYS";
router.post("/", function (req, res, next) {
  // #swagger.tags = ['Policy']
  // #swagger.summary = '获取policy'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  // #swagger.description = '获取政策列表'

  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/policy"
                    }    
                },
            }
    } */
  const { data } = req.body;
  getPolicy(data)
    .then((result) => {
      //console.log(result);
      res.send(result);
      //return res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

/**update policy  */
router.put("/", function (req, res, next) {
  // #swagger.tags = ['Policy']
  // #swagger.summary = '修改policy'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/policy_update"
                    }  
                },
            }
    } */
  checkData(res, req.body.data);
  const { data } = req.body;
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

router.post("/addTags", function (req, res, next) {
  // #swagger.tags = ['Policy']
  // #swagger.summary = '给某一政策增加标签'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/policy_policyTags"
                    }  
                },
            }
    } */
  const { data } = req.body;
  insertPolicyData(data)
    .then((result) => {
      //console.log(result);
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
/// Asset tags

router.post("/policyTags", function (req, res, next) {
  // #swagger.tags = ['Policy']
  // #swagger.summary = '？？？获取标签？？？'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/policy_policyTags"
                    }  
                },
            }
    } */
  const { data } = req.body;
  getPolicyTags(data)
    .then((result) => {
      res.send(result);
      // if (result == 1) {
      //    res.send(result)
      // } else {
      //     res.send(500)
      // }
      //return res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteTags", function (req, res, next) {
  // #swagger.tags = ['Policy']
  // #swagger.summary = '给某一个政策删除Tag'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/policy_deleteTags"
                    }  
                },
            }
    } */
  const { data } = req.body;
  deletaPolicyTag(data)
    .then((result) => {
      if (result == 1) {
        res.sendStatus(200);
      } else {
        res.send(500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/** insert policys */
router.post("/add", function (req, res, next) {
  // #swagger.tags = ['Policy']
  // #swagger.summary = '插入policy'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/policy_add"
                    }    
                },
            }
    } */
  const { data } = req.body;
  //   console.log(data);
  //console.log(uunewid.v4())
  data.POLICY_ID = uunewid.v4();
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
});

async function insertData(body) {
  const policy = new ohana("SAP_JIANGDU_POLICYS"); // new ohana('table_name');
  const result = await policy.insert(body);
  return result;
}

/**delete policy  */
router.delete("/", function (req, res, next) {
  // #swagger.tags = ['Policy']
  // #swagger.summary = '删除policy'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/policy_delete"
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

async function getPolicy(condition) {
  let result = [];
  const policy = new ohana("SAP_JIANGDU_POLICYS"); // new ohana('table_name');

  if (!condition.searchString) {
    //    const result = await policy.find(["POLICY_ID", "POLICY_TITLE", "CREATED_AT", "UPDATED_AT"]);
    result = await policy.raw(
      'SELECT "POLICY_ID",  "POLICY_TITLE", "CREATED_AT", "UPDATED_AT" FROM "SAP_JIANGDU_POLICYS"'
    );
  } else {
    result = await policy.raw(
      'SELECT  "POLICY_ID",  "POLICY_TITLE", "CREATED_AT", "UPDATED_AT" FROM "SAP_JIANGDU_POLICYS" where "POLICY_TITLE" LIKE \'%' +
        condition.searchString +
        "%'"
    );
  }
  //   for (var i = 0; i < result.length; i++) {
  //     result[i].tags = await policy.raw(
  //       'select "TAG_ID", "TAG_NAME","TAG_VALUE" ,"TAG_CATEGORY" from "SAP_JIANGDU_TAGS" where "TAG_ID" in (Select "TAG_ID_TAG_ID" from "SAP_JIANGDU_TAG_POLICYS" where "POLICY_ID_POLICY_ID" = \'' +
  //         result[i].POLICY_ID +
  //         "' )"
  //     );
  //   }
  return result;
}

// async function getPolicyTags(policyTag) {
//     const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
//     const result = await policy.raw(
//         "select * from \"SAP_JIANGDU_TAGS\" where \"TAG_ID\" in (Select \"TAG_ID_TAG_ID\" from \"SAP_JIANGDU_TAG_POLICYS\" where \"POLICY_ID_POLICY_ID\" = '" + policyTag + "' )"
//     );
//     return result;
//}
async function updatePolicy(body) {
  const policy = new ohana("SAP_JIANGDU_POLICYS"); // new ohana('table_name');
  const result = await policy.update(
    {
      POLICY_ID: body.POLICY_ID,
    },
    body
  );
  return result;
}
async function deletePolicy(body) {
  const policy = new ohana("SAP_JIANGDU_POLICYS"); // new ohana('table_name');
  const result = await policy.raw(
    'delete from "SAP_JIANGDU_POLICYS" where POLICY_ID = \'' +
      body.POLICY_ID +
      "'"
  );
  return result;
}

async function insertPolicyData(data) {
  const policyTag = new ohana(tagTableName); // new ohana('table_name');
  const result = await policyTag.insert(data);
  return result;
}

async function deletaPolicyTag(data) {
  const policyTag = new ohana(tagTableName); // new ohana('table_name');
  const result = await policyTag.raw(
    "delete from " +
      tagTableName +
      "where POLICY_ID_POLICY_ID = '" +
      data.POLICY_ID_POLICY_ID +
      "' and TAG_ID_TAG_ID = '" +
      data.TAG_ID_TAG_ID +
      "'"
  );
  return result;
}

async function getPolicyTags(data) {
  const policyTag = new ohana(tagTableName); // new ohana('table_name');
  const result = await policyTag.raw(
    'select "TAG_ID", "TAG_NAME","TAG_VALUE" ,"TAG_CATEGORY" from "SAP_JIANGDU_TAGS" where "TAG_ID" in (Select "TAG_ID_TAG_ID" from "' +
      tagTableName +
      '" where "POLICY_ID_POLICY_ID" = \'' +
      data.POLICY_ID_POLICY_ID +
      "' )"
  );
  return result;
}

module.exports = router;
