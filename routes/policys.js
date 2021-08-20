var express = require('express');
var router = express.Router();
const {
    ohana
} = require('ohana-node-orm');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
    policy.find().then((result) => {
        res.send(result)
    });
});

/** insert policys */
router.post('/', function (req, res, next) {
    // console.log(req.body)
    insertData(req.body).then((result)=>{
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
    const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
    const result = await policy.insert(body);
    return result;
}


module.exports = router;