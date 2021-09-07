var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
const { ohana } = require("ohana-node-orm");

/** */
function checkData(res, data) {
  if (data == null) {
    res.send(500);
  }
}

/**
 * find all Talents
 */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Talent']
  const t_Talent = new ohana("SAP_JIANGDU_TalentS"); // new ohana('table_name');
  t_Talent.find().then((result) => {
    res.send(result);
  });
});

/**update Talent  */
router.put("/", function (req, res, next) {
  // #swagger.tags = ['Talent']
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
  console.log(req.body);
  const { data } = req.body;
  console.log(data);
  //console.log(uunewid.v4())
  data.Talent_ID = uunewid.v4();
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
  const t_Talent = new ohana("SAP_JIANGDU_TalentS"); // new ohana('table_name');
  const result = await t_Talent.insert(body);
  return result;
}

async function updateTalent(body) {
  const t_Talent = new ohana("SAP_JIANGDU_TalentS");
  const result = await t_Talent.update({ Talent_ID: body.Talent_ID }, body);
  return result;
}

async function deleteTalent(body) {
  const t_Talent = new ohana("SAP_JIANGDU_TalentS"); // new ohana('table_name');
  const result = await policy.raw(
    'delete from "SAP_JIANGDU_TalentS" where Talent_ID = \'' +
      body.Talent_ID +
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
  const t_TalentTags = new ohana("SAP_JIANGDU_TAG_TalentS"); // new ohana('table_name');
  const result = await t_TalentTags.raw(
    'SELECT A1.*, A2.TAG_NAME, A2.TAG_VALUE, A2.TYPE, A2.TAG_CATEGORY, A2.DESCRIPTION from "SAP_JIANGDU_TAG_TalentS" as A1 LEFT JOIN "SAP_JIANGDU_TAGS" as A2 on A1.TAG_ID_TAG_ID = A2.TAG_ID'
  );
  return result;
}

async function getTalentTags(body) {
  const t_Talent = new ohana("SAP_JIANGDU_TAG_TalentS");
  //fisrt get tag ids attached with target Talent by Talent id
  const tag_ids = await t_Talent.find({
    Talent_ID_Talent_ID: body.Talent_ID_Talent_ID,
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
  const t_TalentTags = new ohana("SAP_JIANGDU_TAG_TalentS"); // new ohana('table_name');
  const result = await t_TalentTags.insert(data);
  return result;
}

async function deletaTalentTag(data) {
  const t_TalentTags = new ohana("SAP_JIANGDU_TAG_TalentS"); // new ohana('table_name');
  const result = await t_TalentTags.raw(
    'delete from "SAP_JIANGDU_TAG_TalentS" where Talent_ID_Talent_ID = \'' +
      data.Talent_ID_Talent_ID +
      "' and TAG_ID_TAG_ID = '" +
      data.TAG_ID_TAG_ID +
      "'"
  );
  return result;
}

module.exports = router;
