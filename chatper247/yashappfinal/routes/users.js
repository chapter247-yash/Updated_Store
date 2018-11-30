var express = require('express');
var router = express.Router();
var usersmodel = require('../models/usersmodel')

/* GET users listing. */
router.use(function(req, res, next){
  if(req.session.unm == undefined || req.session.role !='user'){
    res.redirect('/logout')
    
  }
  next()
})

var d1 = ''
router.use('/', function(req, res, next) {
  usersmodel.fetchalldata('subcategory',function(result){
    d1=result
    next()
  })
});

router.use('/', function(req, res, next) {
     usersmodel.fetchallsubcat('subcategory',function(result){
      d1=result
      next()
     })
});
router.get('/', function(req, res, next) {
  res.render('usershome',{'user':req.session.unm});
});

router.all('/reguseraddpost', function(req, res, next) {
  if(req.method =='GET'){
    res.render('reguseraddpost',{'result':'','subcatlist':d1})
  }
  else{

      var myfile = req.files
      if(myfile.myimg1 != undefined){
        img1 = myfile.myimg1.name
        var despath = path.join(__dirname,'../public/uploads',img1)
        myfile.myimg1.mv(despath)
      }
      else{
        var img1='dummyimg.png'
      }

      if(myfile.myimg2 != undefined){
        var img2 = myfile.myimg2.name
        var despath1 = path.join(__dirname,'../public/uploads',img2)
        myfile.myimg2.mv(despath1)
      }
      else{
        var img2='dummyimg.png'
      }
     
      if(myfile.myimg3 != undefined){
        var img3 = myfile.myimg3.name
        var despath2 = path.join(__dirname,'../public/uploads',img3)
        myfile.myimg3.mv(despath2)
      }
      else{
        var img3='dummyimg.png'
      }
      usersmodel.addpost(req.body,img1,img2,img3,function(result){
        if(result){
          res.render('reguseraddpost',{'result':'Post Uploaded Successfully','subcatlist':d1})
        }
        else{
          res.render('reguseraddpost',{'result':'Failed!! Try Again...','subcatlist':d1})
        }
        
      })
  }
});
module.exports = router;
