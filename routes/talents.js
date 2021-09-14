var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
const { ohana } = require("ohana-node-orm");
const tableName="SAP_JIANGDU_TALENTS"
/** */
function checkData(res, data) {
  if (data == null) {
    res.send(500);
  }
}
/**
 * get filter talents
 */
router.post("/get",function(req,res,next){
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
})
/**
 * find all Talents
 */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Talent']
  // #swagger.summary = '获取talent'
  const t_Talent = new ohana(tableName); // new ohana('table_name');
  t_Talent.find().then((result) => {
    res.send(result);
  });
});

/**update Talent  */
router.put("/", function (req, res, next) {
  // #swagger.tags = ['Talent']
  // #swagger.summary = '修改talent'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/talent_update"
                    }  
                },
            }
    } */
  checkData(res, req.body.data);
  const { data } = req.body;
  console.log(data);

  updateTalent(data)
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

router.post("/tags", function (req, res, next) {
  // #swagger.tags = ['Talent']
  // #swagger.summary = '获取某个talent下全部tag'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/talents_tags"
                    }  
                },
            }
    } */

  const { data } = req.body;
  getTalentTags(data)
    .then((result) => {
      //console.log(result);
      if (result !== undefined) {
        res.send(result);
      } else {
        res.send(500);
      }
      //return res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/allTags", function (req, res, next) {
  // #swagger.tags = ['Talent']
  // #swagger.summary = '应该是个废弃的接口了'
  const { data } = req.body;
  getAllTags(data)
    .then((result) => {
      //console.log(result);
      if (result !== undefined) {
        res.send(result);
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
  // #swagger.tags = ['Talent']
  // #swagger.summary = '给某个talent添加tag'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/talent_addTags"
                    }  
                },
            }
    } */
  const { data } = req.body;
  insertTalentData(data)
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
  // #swagger.tags = ['Talent']
  // #swagger.summary = '给某个talent删除tag'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/talent_deleteTags"
                    }  
                },
            }
    } */
  const { data } = req.body;
  deletaTalentTag(data)
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

/** insert Talent */
router.post("/", function (req, res, next) {
  // #swagger.tags = ['Talent']
  // #swagger.summary = '添加talent'
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
  console.log(req.body);
  const { data } = req.body;
  console.log(data);
  //console.log(uunewid.v4())
  data.TALENT_ID = uunewid.v4();
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

/**delete Talent  */
router.delete("/", function (req, res, next) {
  // #swagger.tags = ['Talent']
  // #swagger.summary = '删除talent'
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/talent_delete"
                    }  
                },
            }
    } */
  checkData(res, req.body.data);
  const { data } = req.body;
  deleteTalent(data)
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
  const t_Talent = new ohana(tableName); // new ohana('table_name');
  const result = await t_Talent.insert(body);
  return result;
}

async function updateTalent(body) {
  const t_Talent = new ohana(tableName);
  const result = await t_Talent.update({ TALENT_ID: body.TALENT_ID }, body);
  return result;
}

async function deleteTalent(body) {
  const t_Talent = new ohana(tableName); // new ohana('table_name');
  const result = await t_Talent.raw(
    'delete from '+tableName+' where TALENT_ID = \'' +
      body.TALENT_ID +
      "'"
  );
  return result;
}

async function get_Talent_tag(tag_id) {
  const t_Talent_tags = new ohana("SAP_JIANGDU_TAGS");
  const tag = await t_Talent_tags.findOne({
    TAG_ID: tag_id,
  });
  return tag;
}

async function getAllTags(data) {
  const t_TalentTags = new ohana("SAP_JIANGDU_TAG_TALENTS"); // new ohana('table_name');
  const result = await t_TalentTags.raw(
    'SELECT A1.*, A2.TAG_NAME, A2.TAG_VALUE, A2.TYPE, A2.TAG_CATEGORY, A2.DESCRIPTION from "SAP_JIANGDU_TAG_TALENTS" as A1 LEFT JOIN "SAP_JIANGDU_TAGS" as A2 on A1.TAG_ID_TAG_ID = A2.TAG_ID'
  );
  return result;
}

async function getTalentTags(body) {
  const t_Talent = new ohana("SAP_JIANGDU_TAG_TALENTS");
  //fisrt get tag ids attached with target Talent by Talent id
  const tag_ids = await t_Talent.find({
    TALENT_ID_TALENT_ID: body.TALENT_ID_TALENT_ID,
  });
  //console.log(tag_ids)
  let tags = [];
  for (var i = 0; i < tag_ids.length; i++) {
    const tag = await get_Talent_tag(tag_ids[i].TAG_ID_TAG_ID);
    tags.push(tag[0]);
  }
  return tags;
}

async function insertTalentData(data) {
  const t_TalentTags = new ohana("SAP_JIANGDU_TAG_TALENTS"); // new ohana('table_name');
  const result = await t_TalentTags.insert(data);
  return result;
}

async function deletaTalentTag(data) {
  const t_TalentTags = new ohana("SAP_JIANGDU_TAG_TALENTS"); // new ohana('table_name');
  const result = await t_TalentTags.raw(
    'delete from "SAP_JIANGDU_TAG_TALENTS" where TALENT_ID_TALENT_ID = \'' +
      data.TALENT_ID_TALENT_ID +
      "' and TAG_ID_TAG_ID = '" +
      data.TAG_ID_TAG_ID +
      "'"
  );
  return result;
}

module.exports = router;
