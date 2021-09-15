var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
var constants = require("../utils/constants");

const {
  ohana
} = require("ohana-node-orm");

/**
 *
 *
 */
function checkData(res, data) {
  if (data == null) {
    res.send(500);
  }
}
function checkPriority(req,levelData)
{
  if(!req.user)
  {
    return constants.UNAUTHORIZED
  }
  console.log(req.user)

}

const tableName = "SAP_JIANGDU_TECH_INNOS";
const tagTableName = "SAP_JIANGDU_TAG_TECHS";
/* GET users listing. */
router.post("/", function (req, res, next) {

  const p_check=checkPriority(req,constants.LEVEL1);
  console.log(p_check)
  if(p_check==constants.UNAUTHORIZED)
  {
    res.sendStatus(401);
    return;
  }
  
  // #swagger.tags = ['Tech']
  // #swagger.summary = '获取tech'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tech"
                    }  
                },
            }
    } */
  const {
    data
  } = req.body;
  const user = new ohana(tableName); // new ohana('table_name');
  if (!data) {
    user.find().then((result) => {
      res.send(result);
    });
  } else {
    console.log(data)
    user.find(data).then((result) => {
      res.send(result);
    });
  }
});

router.post("/add", function (req, res, next) {
  // #swagger.tags = ['Tech']
  // #swagger.summary = '增加tech'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tech_add_update"
                    }  
                },
            }
    } */
  const {
    data
  } = req.body;
  //console.log(uunewid.v4())
  data.TECH_ID = uunewid.v4();
  console.log(data);
  insertData(data)
    .then((result) => {
      if (result == 1) {
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
});

async function insertData(body) {
  const user = new ohana(tableName); // new ohana('table_name');
  const result = await user.insert(body);
  return result;
}

/**
 * Get the company by criterian
 */
router.post("/search", function (req, res, next) {
  // #swagger.tags = ['Tech']
  // #swagger.summary = '搜索tech，query参数未知'
  const queryData = req.query;
  const user = new ohana(tableName); // new ohana('table_name');
  if (queryData == null) {
    user.find().then((result) => {
      res.send(result);
    });
  } else {
    user.find(queryData).then((result) => {
      res.send(result);
    });
  }
});

/**update TECHs  */
router.put("/", function (req, res, next) {
  // #swagger.tags = ['Tech']
  // #swagger.summary = '修改tech'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tech_add_update"
                    }  
                },
            }
    } */
  //   checkData(res, req.body.data)
  const {
    data
  } = req.body;
  //  console.log(data);
  updateTech(data)
    .then((result) => {
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

/*delete something*/
router.delete("/", function (req, res, next) {
  // #swagger.tags = ['Tech']
  // #swagger.summary = '删除tech'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tech_delete"
                    }  
                },
            }
    } */
  checkData(res, req.body.data);
  const {
    data
  } = req.body;
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

async function updateTech(body) {
  // console.log(body)
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.update({
      TECH_ID: body.TECH_ID,
    },
    body
  );
  return result;
}
async function deletePolicy(body) {
  const policy = new ohana(tableName); // new ohana('table_name');
  const result = await policy.raw(
    'delete from "' + tableName + "\" where TECH_ID = '" + body.TECH_ID + "'"
  );
  return result;
}

/// TECH tags

router.post("/techTags", function (req, res, next) {
  // #swagger.tags = ['Tech']
  // #swagger.summary = '获取标签'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tech_tag"
                    }  
                },
            }
    } */
  const {
    data
  } = req.body;
  getTechTag(data)
    .then((result) => {
      //console.log(result);
      console.log(result);
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

router.post("/addTags", function (req, res, next) {
  // #swagger.tags = ['Tech']
  // #swagger.summary = '增加标签'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tech_tag_add_delete"
                    }  
                },
            }
    } */
  const {
    data
  } = req.body;
  insertTechData(data)
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

router.post("/deleteTags", function (req, res, next) {
  // #swagger.tags = ['Tech']
  // #swagger.summary = '删除标签'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/tech_tag_add_delete"
                    }  
                },
            }
    } */
  const {
    data
  } = req.body;
  deletaTechTag(data)
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
/**
 * Update COMMENTS, STATUS by USER_ID
 * @param {*} body
 * @returns
 */
router.put("/updateStatus", async (req, res, next) => {
  // #swagger.tags = ['Tech']
  // #swagger.summary = "？？？？？？？"
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/user_register"
                    }  
                },
            }
    } */
  const {
    data
  } = req.body;

  const user = new ohana(tableName);
  //console.log("UPDATE SAP_JIANGDU_USERS SET COMMENTS='"+ data.COMMENTS + "', STATUS='" + data.STATUS + "' WHERE USER_ID='"+data.USER_ID+"'")
  try {
    const result = await user.raw(
      "UPDATE SAP_JIANGDU_USERS SET COMMENTS='" +
      data.COMMENTS +
      "', STATUS='" +
      data.STATUS +
      "' WHERE USER_ID='" +
      data.USER_ID +
      "'"
    );
    if (result == 1) {
      res.sendStatus(200);
    } else {
      res.send(500);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * 127.0.0.1:4000/api/users/getCompanyInfo
 * @param {*} body
 * @returns
 */
async function getTechTag(data) {
  const policyTag = new ohana(tagTableName); // new ohana('table_name');
  const result = await policyTag.raw(
    'select "TAG_ID", "TAG_NAME","TAG_VALUE" ,"TAG_CATEGORY" from "SAP_JIANGDU_TAGS" where "TAG_ID" in (Select "TAG_ID_TAG_ID" from "SAP_JIANGDU_TAG_TECHS" where "TECH_ID_TECH_ID" = \'' +
    data.TECH_ID +
    "' )"
  );
  return result;
}
async function insertTechData(data) {
  const policyTag = new ohana(tagTableName); // new ohana('table_name');
  const result = await policyTag.insert(data);
  return result;
}
async function deletaTechTag(data) {
  const policyTag = new ohana(tagTableName); // new ohana('table_name');
  const result = await policyTag.raw(
    'delete from "' +
    tagTableName +
    "\" where TECH_ID_TECH_ID = '" +
    data.TECH_ID_TECH_ID +
    "' and TAG_ID_TAG_ID = '" +
    data.TAG_ID_TAG_ID +
    "'"
  );
  return result;
}

module.exports = router;