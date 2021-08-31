var express = require('express');
var uunewid = require('uuid');
var router = express.Router();
const {
    ohana
} = require('ohana-node-orm');
const tableName="SAP_JIANGDU_TAGS";

/** */
function checkData(res,data)
{
if(data==null)
{
    res.send(500)

}

}
/* GET users listing. */
router.get('/', function (req, res, next) {
    const policy = new ohana(tableName); // new ohana('table_name');
    policy.find().then((result) => {
        res.send(result)
    });
});

/**update policy  */
router.put('/',function(req,res,next){
    checkData(res,req.body.data)
    const {data} = req.body;
    console.log(data);
    updatePolicy(data).then((result)=>{
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


/** insert tags */
router.post('/', function (req, res, next) {
     console.log(req.body)
     const {data} = req.body;
     console.log(data);
     //console.log(uunewid.v4())
     data.TAG_ID=uunewid.v4();
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
router.delete('/',function(req,res,next){
    checkData(res,req.body.data);
    const {data} = req.body;
    deletePolicy(data).then((result)=>{
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


async function updatePolicy(body) {
    const policy = new ohana(tableName); // new ohana('table_name');
    const result = await policy.update({POLICY_ID:body.POLICY_ID},body);
    return result;
}
async function deletePolicy(body) {
    const policy = new ohana(tableName); // new ohana('table_name');
   const result = await policy.raw("delete from \"SAP_JIANGDU_tags\" where POLICY_ID = '"+body.POLICY_ID+"'");
    return result;
}


module.exports = router;