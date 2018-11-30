var express = require('express');
var usersmodel = require('../models/usersmodel')
var url = require('url')
var path = require('path')
var router = express.Router();
//var popups = require('popups')


router.use(function(req, res, next){
  if(req.session.unm == undefined || req.session.role != 'admin'){
    res.redirect('/logout')
  }
  next()
})
/* GET users listing. */
var d = ''
router.use('/', function(req, res, next) {
  usersmodel.fetchall('category',function(result){
    d=result
    next()
  })
});

var d1 = ''
router.use('/', function(req, res, next) {
  usersmodel.fetchalldata('addpost',function(result){
    d1=result
    next()
  })
});


router.get('/', function(req, res, next) {
  res.render('adminhome',{'user':req.session.unm});
});

router.all('/addcategory', function(req, res, next) {
  if(req.method == 'GET'){
  res.render('addcategory',{'result':''});
}
else{

	var catnm = req.body.catnm
  var catimg = req.files.catimg
  var catimg_nm =catimg.name
  var despath = path.join(__dirname,'../public/uploads',catimg_nm)
  catimg.mv(despath,function(err){
    if(err){
      res.render('addcategory',{'result':'Failed to upload file...'})
    }
    else{
      usersmodel.addcategory('category',catnm,catimg_nm,function(result){
        if(result){
          res.render('addcategory',{'result':'Category Added Successfully...'})
        }
        else{
          res.render('addcategory',{'result':'Failed to add...'})
        }
      })
      
    }
  })
}
});
/**************Routing for adding sub category by ADMIN*******************/
router.all('/addsubcategory', function(req, res, next) {
 if(req.method == 'GET'){
  res.render('addsubcategory',{'result':'','catlist':d});

}
else{
  var catnm = req.body.catnm
  var subcatnm = req.body.subcatnm
  var catimg = req.files.catimg
  var subcatimg_nm =catimg.name
  var despath = path.join(__dirname,'../public/uploads',subcatimg_nm)
  catimg.mv(despath,function(err){
    if(err){
      res.render('addsubcategory',{'result':'Failed to upload file...','catlist':d})
    }
    else{
      usersmodel.addsubcategory('subcategory',subcatnm,subcatimg_nm,catnm,function(result){
        if(result){
          res.render('addsubcategory',{'result':'Sub Category Added Successfully...','catlist':d})
        }
        else{
          res.render('addsubcategory',{'result':'Failed to add...','catlist':d})
        }
      })
      
    }
  })
}
});
router.get('/manageuser', function(req, res, next) {
  usersmodel.manageuser('register',function(result){
      if(result){
        res.render('manageuser',{result:result})
      }
      else{
        res.render('manageuser',{result:'Érror while fetching data..'})
      }
    })
});
router.get('/block_unblockuser', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.block_unblockuser('register',data,function(result){
    if(result){
      res.redirect('/admin/manageuser');
    }
     else{
      res.render('manageuser',{result:'Error during updation'})
    }
  })
  
});

router.get('/deleteuser', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.deleteuser('register',data,function(result){
    if(result){
      res.redirect('/admin/manageuser');
    }
     else{
      res.render('manageuser',{result:'Error during updation'})
    }
  })
  
});


router.get('/managecategory', function(req, res, next) {
  usersmodel.managecategory('category',function(result){
      if(result){
        res.render('managecategory',{result:result})
      }
      else{
           res.render('managecategory',{result:'Error while fetching data...'})
      }
  })
});

router.get('/managesubcategory', function(req, res, next) {
  usersmodel.managesubcategory('subcategory',function(result){
      if(result){
        res.render('managesubcategory',{result:result})
      }
      else{
           res.render('managesubcategory',{result:'Error while fetching data...'})
      }
  })
});


router.get('/deletecategory', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.deletecategory('category',data,function(result){
    if(result){
      res.redirect('/admin/managecategory');
    }
     else{
      res.render('managecategory',{result:'Error during updation'})
    }
  })
  
});

router.get('/deletesubcategory', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.deletesubcategory('subcategory',data,function(result){
    if(result){
      res.redirect('/admin/managesubcategory');
    }
     else{
      res.render('managesubcategory',{result:'Error during updation'})
    }
  })
  
});

router.get('/managepost', function(req, res, next) {
  usersmodel.fetchalldata('addpost',function(result){
      if(result){
        res.render('managepost',{result:result})
      }
      else{
           res.render('managepost',{result:'Error while fetching data...'})
      }
  })
});

router.get('/changevstatus', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.changevstatus('addpost',data,function(result){
    if(result){
      res.redirect('/admin/managepost');
    }
     else{
      res.render('managepost',{result:'Error during updation'})
    }
  })
  
});
router.get('/changeustatus', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.changeustatus('addpost',data,function(result){
    if(result){
      res.redirect('/admin/managepost');
    }
     else{
      res.render('managepost',{result:'Error during updation'})
    }
  })
  
});

// router.all('/changepassword',function(req, res, next){
//   if(req.method == 'GET'){
//     res.render('changepassword',{result:''})
//   }
//   else{
//         var data=req.body
//         usersmodel.fetchalldata('register', function(result){
//         if(result){
//           console.log(result)
//         }
//         else{
//           res.render('changepassword')
//         }
//        })
      
//   }
// })

module.exports = router;
