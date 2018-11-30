var express = require('express');
var usersmodel = require('../models/usersmodel')
var url = require('url')
var path = require('path')
var mail = require('mail')
var router = express.Router();


/* GET home page. */

var d = ''
router.use('/',function(req, res, next){
  usersmodel.fetchall('category',function(result){
    d=result;
    next()
  })
})

var d1 = ''
router.use('/', function(req, res, next) {
  usersmodel.fetchalldata('subcategory',function(result){
    d1=result
    next()
  })
});

// router.use('/viewsubcategoryindex', function(req, res, next) {
//      usersmodel.fetchall('category',function(result){
//       d=result
//       next()
//      })
// });

router.use('/', function(req, res, next) {
     usersmodel.fetchallsubcat('subcategory',function(result){
      d1=result
      next()
     })
});

router.get('/', function(req, res, next) {
  usersmodel.fetchall('category',function(result){
   res.render('index',{result:result});

  })
});

router.get('/home', function(req, res, next) {
  usersmodel.fetchall('category',function(result){
     res.render('index',{result:result});
  })
});


router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/login')
});


router.get('/services', function(req, res, next) {
  res.render('services');
});


router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/verify', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.verify('register',data,function(result){
    if(result){
      res.render('login',{title:'Verified Now try Login..'})
    }
    else{
      res.render('regiter',{title:'Error during verification..'})
    }
  })
});
router.all('/register', function(req, res, next) {
  if(req.method == 'GET'){
    res.render('register',{title:''})
  }
    else{
       var data = req.body
       usersmodel.register('register',data,function(result){
           if(result){
            mail.sendmail(data,function(newresult){
              if(newresult){
                  res.render('register',{title:'Registered Successfully & verification link has been sent to your registerd email'})
              }
            })
           
           }
           else{
           	res.render('register',{title:'Registration Failed...'})
           }

       })
    }
});
router.all('/login', function(req, res, next) {
	if(req.method == 'GET'){
        res.render('login',{result:''});
    }
    else{
         var data = req.body
         usersmodel.login('register',data,function(result){
         	if(result.length>0){
            req.session.unm = data.unm
            req.session.role = result[0].role
            if(result[0].role == 'admin'){
         			res.redirect('/admin')
         		}
         		if(result[0].role == 'user'){
                  res.redirect('/users')
         		}
         	}
         	else{
            res.render('login',{result:'Invalid User details or verification required','result1':"color:red"})

          }
         })
     }
});

router.get('/viewsubcategoryindex', function(req, res, next) {
  var data = url.parse(req.url,true).query
  usersmodel.viewsubcategoryindex('subcategory',data,function(result){
    if(result.length>0){
      res.render('viewsubcategoryindex',{'result':result,'catlist':d})
    }
    else{
      res.render('viewsubcategoryindex',{'result':'','catlist':d})
    }
  })
});

router.all('/viewpostindex', function(req, res, next) {
  if(req.method == "GET"){
    var data = url.parse(req.url,true).query
    usersmodel.viewpostindex('addpost',data,function(result){
      if(result.length>0){
        res.render('viewpostindex',{result:result,subcatlist:d1})
      }
      else{
        res.render('viewpostindex',{result:'',subcatlist:d1})
      }
    })
  }
  else{
    if(req.body.sprice != undefined)
    usersmodel.viewpostindexsort('addpost',req.body,function(result){
      if(result.length>0){
        res.render('viewpostindex',{result:result,subcatlist:d1})
      }
      else{
        res.render('viewpostindex',{result:'',subcatlist:d1})
      }
    });
  
  else{
    usersmodel.viewpostindexsortbycity('addpost',req.body,function(result){
      if(result.length>0){
        res.render('viewpostindex',{result:result,subcatlist:d1})
      }
      else{
        res.render('viewpostindex',{result:'',subcatlist:d1})
      }
    });
  }
  }
  
});

router.get('/viewpostindexmain', function(req, res, next) {
    var data = url.parse(req.url,true).query
    usersmodel.viewpostindexmain('addpost',data,function(result){
      console.log(result)
      if(result.length>0){
        res.render('viewpostindexmain',{result:result,subcatlist:d1})
      }
      else{
        res.render('viewpostindexmain',{result:'',subcatlist:d1})
      }
    })
  
});

router.all('/addpost', function(req, res, next) {
  if(req.method =='GET'){
    res.render('addpost',{'result':'','subcatlist':d1})
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
          res.render('addpost',{'result':'Post Uploaded Successfully','subcatlist':d1})
        }
        else{
          res.render('addpost',{'result':'Failed!! Try Again...','subcatlist':d1})
        }
        
      })
  }
});
module.exports = router;
