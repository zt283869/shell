/**
 * Created by zhutao on 2017/6/26.
 */
var express = require("express");
var router = express.Router();
router.get('/',function(req,res){
    "use strict";
        res.render('products')

})
module.exports = router;