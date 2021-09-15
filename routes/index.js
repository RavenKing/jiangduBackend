var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // #swagger.tags = ['Home']
  // #swagger.summary = '获取HomePage'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  res.render("index", { title: "Express" });
});

module.exports = router;
