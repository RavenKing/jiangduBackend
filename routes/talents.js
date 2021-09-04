var express = require('express');
var uunewid = require('uuid');
var router = express.Router();
const {
    ohana
} = require('ohana-node-orm');

/** */
function checkData(res,data)
{
    if(data==null)
    {
        res.send(500)

    }
}

/**
 * find all talents
 */
router.get('/', function (req, res, next) {
    const t_talent = new ohana('SAP_JIANGDU_TALENTS'); // new ohana('table_name');
    t_talent.find().then((result) => {
        res.send(result)
    });
});

/**update talent  */
router.put('/',function(req,res,next){
    checkData(res,req.body.data)
    const {data} = req.body;
    console.log(data);

    updateTalent(data).then((result)=>{
        console.log(result);
        if(result ==1 )
        {
             res.sendStatus(200)
        }else{
            res.send(500)
        }
        //return res.send(result)
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/tags', function(req, res, next){
    const {
        data
    } = req.body;
    getTalentTags(data).then((result)=>{
        //console.log(result);
        if(result !== undefined)
        {
            res.send(result)
        }else{
            res.send(500)
        }
        //return res.send(result)
    }).catch((err)=>{
        console.log(err);
    })
})

router.post('/addTags', function (req, res, next) {
    const {
        data
    } = req.body;
    insertTalentData(data).then((result) => {
        //console.log(result);
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

router.post('/deleteTags', function (req, res, next) {
    const {
        data
    } = req.body;
    deletaTalentTag(data).then((result) => {
        if (result == 1) {
            res.sendStatus(200)
        } else {
            res.send(500)
        }
    }).catch((err) => {
        console.log(err);
    })
});

/** insert talent */
router.post('/', function (req, res, next) {
    console.log(req.body)
    const {data} = req.body;
    console.log(data);
    //console.log(uunewid.v4())
    data.TALENT_ID=uunewid.v4();
   insertData(data).then((result)=>{
       console.log(result);
       if(result ==1 )
       {
            res.sendStatus(200)
       }else{
           res.send(500)
       }
       //return res.send(result)
   }).catch((err)=>{
       console.log(err);
   })
});

/**delete talent  */
router.delete('/',function(req,res,next){
    checkData(res,req.body.data);
    const {data} = req.body;
    deleteTalent(data).then((result)=>{
        console.log(result);
        if(result ==1 )
        {
             res.sendStatus(200)
        }else{
            res.send(500)
        }
        //return res.send(result)
    }).catch((err)=>{
        console.log(err);
    })

})

async function insertData(body) {
   const t_talent = new ohana('SAP_JIANGDU_TALENTS'); // new ohana('table_name');
   const result = await t_talent.insert(body);
   return result;
}

async function updateTalent(body) {
    const t_talent = new ohana('SAP_JIANGDU_TALENTS'); 
    const result = await t_talent.update({TALENT_ID:body.TALENT_ID},body);
    return result;
}

async function deleteTalent(body) {
    const t_talent = new ohana('SAP_JIANGDU_TALENTS'); // new ohana('table_name');
    const result = await policy.raw("delete from \"SAP_JIANGDU_TALENTS\" where TALENT_ID = '"+body.TALENT_ID+"'");
    return result;
}

async function get_talent_tag(tag_id){
    const t_talent_tags = new ohana('SAP_JIANGDU_TAGS');
    const tag =  await t_talent_tags.findOne({
        TAG_ID:tag_id
    }); 
    return tag;
}

async function getTalentTags(body) {
    const t_talent = new ohana('SAP_JIANGDU_TAG_TALENTS');
    //console.log(body)
    //fisrt get tag ids attached with target talent by talent id
    const tag_ids = await t_talent.findOne({
        TALENT_ID_TALENT_ID:body.TALENT_ID_TALENT_ID
    }); 
    console.log(tag_ids)
    let tags = []
    for (var i = 0; i < tag_ids.length; i++) {
        const tag = await get_talent_tag(tag_ids[i].TAG_ID_TAG_ID);
        tags.push(tag[0])
    }
    return tags
}

async function insertTalentData(data) {
    const t_talentTags = new ohana('SAP_JIANGDU_TAG_TALENTS'); // new ohana('table_name');
    const result = await t_talentTags.insert(data);
    return result;
}

async function deletaTalentTag(data) {
    const t_talentTags = new ohana('SAP_JIANGDU_TAG_TALENTS'); // new ohana('table_name');
    const result = await    .raw("delete from \"SAP_JIANGDU_TAG_TALENTS\" where TALENT_ID_TALENT_ID = '" + data.TALENT_ID_TALENT_ID + "' and TAG_ID_TAG_ID = '" + data.TAG_ID_TAG_ID + "'");
    return result;
}

module.exports = router;