var con = require('./conn')

function register(tbl_nm,data,cb){
	var query = "insert into "+tbl_nm+" values('(NULL)','"+data.nm+"','"+data.email+"','"+data.pass+"','"+data.address+"','"+data.mob+"','"+data.city+"','"+data.gender+"','user','0')"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function login(tbl_nm,data,cb){
	var query = "select * from "+tbl_nm+" where email='"+data.unm+"' && pass='"+data.pass+"' && status=1"// data.unm And data.pass are fields of login form
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
		
	})
}
/**********************function for adding category for admin********************/
function addcategory(tbl_nm,catnm,catimg_nm,cb){
	var query= "insert into " + tbl_nm +" values('NULL','"+catnm+"','"+catimg_nm+"')"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
/**********************function for adding subcategory for admin********************/
function addsubcategory(tbl_nm,subcatnm,subcatimg_nm,catnm,cb){
	var query= "insert into " + tbl_nm +" values('NULL','"+subcatnm+"','"+subcatimg_nm+"','"+catnm+"')"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}


function verify(tbl_nm,data,cb){
	var query = "update "+tbl_nm+" set status=1 where email="+data.email+"'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
/**********************function for managing registered users for admin********************/
function manageuser(tbl_nm,cb){
	var query = "select * from "+ tbl_nm +" where role = 'user'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

/************Function for blocking a registerd user***************/
function block_unblockuser(tbl_nm,data,cb){
	var query = "update " +tbl_nm+ " set status="+data.status+" where email= '"+data.email+"'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

/**********************function for deleting registered user from db for admin********************/
function deleteuser(tbl_nm,data,cb){
	var query = "delete from " +tbl_nm+ " where email= '"+data.email+"'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
/**********************function for managing category for admin********************/
function managecategory(tbl_nm,cb){
	var query = "select * from "+tbl_nm
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function managesubcategory(tbl_nm,cb){
	var query = "select * from "+tbl_nm
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

/**********************function for deleting category for admin********************/
function deletecategory(tbl_nm,data,cb){
	var query = "delete from " +tbl_nm+ " where catnm= '"+data.catnm+"'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
function deletesubcategory(tbl_nm,data,cb){
	var query = "delete from " +tbl_nm+ " where subcatnm= '"+data.subcatnm+"'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function fetchall(tbl_nm,cb){
	var query = "select * from "+tbl_nm+" order by cat_id desc"
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
function fetchallsubcat(tbl_nm,cb){
	var query = "select * from "+tbl_nm+" order by subcatid desc"
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function fetchalldata(tbl_nm,cb){
	var query = "select * from "+tbl_nm
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
/*********Displays subcategory of category*********************/
function viewsubcategoryindex(tbl_nm,data,cb){
	var query = "select * from "+tbl_nm+" where catnm='"+data.catnm+"'"
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
function viewpostindex(tbl_nm,data,cb){
	var query = "select * from "+tbl_nm+" where cat_nm='"+data.subcatnm+"' order by pid desc"
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function viewpostindexsort(tbl_nm,data,cb){
	var query = "select * from "+tbl_nm+" where  cat_nm = '"+data.subcatnm+"' && price between "+data.sprice+" and "+data.eprice
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
function viewpostindexsortbycity(tbl_nm,data,cb){
	var query = "select * from "+tbl_nm+" where  cat_nm = '"+data.subcatnm+"' && city = '"+data.city+"'"
	console.log(query)
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
/*********Function for posting ads*****************/
function addpost(data,img1,img2,img3,cb){
	var query= "insert into addpost values('NULL','"+data.title+"','"+data.cat_nm+"','"+data.description+"','"+data.price+"','"+img1+"','"+img2+"','"+img3+"','"+data.address+"','"+data.email+"','"+data.mob+"','"+data.city+"',0,0)" 
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
function reguseraddpost(data,img1,img2,img3,cb){
	var query= "insert into addpost values('NULL','"+data.title+"','"+data.cat_nm+"','"+data.description+"','"+data.price+"','"+img1+"','"+img2+"','"+img3+"','"+data.address+"','"+data.email+"','"+data.mob+"','"+data.city+"',0,0)" 
	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function changevstatus(tbl_nm,data,cb){
	var query = "update " +tbl_nm+ " set vstatus="+data.vstatus+" where email= '"+data.email+"'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function changeustatus(tbl_nm,data,cb){
	var query = "update " +tbl_nm+ " set ustatus="+data.ustatus+" where email= '"+data.email+"'"
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}

function viewpostindexmain(tbl_nm,data,cb){
    var query = "select * from "+tbl_nm+" where pid="+data.id;
    	con.query(query,function(err, result){
		if(err){
			console.log(err)
		}
		else{
			cb(result)
		}
	})
}
module.exports={viewpostindexsortbycity:viewpostindexsortbycity,viewpostindexmain:viewpostindexmain,viewpostindexsort:viewpostindexsort,viewpostindex:viewpostindex,changeustatus:changeustatus,changevstatus:changevstatus,fetchalldata:fetchalldata,addpost:addpost,fetchallsubcat:fetchallsubcat,deletesubcategory:deletesubcategory,managesubcategory:managesubcategory,viewsubcategoryindex:viewsubcategoryindex,addsubcategory:addsubcategory,fetchall:fetchall,deletecategory:deletecategory,managecategory:managecategory,register:register,login:login,addcategory:addcategory,verify:verify,manageuser:manageuser,block_unblockuser:block_unblockuser,deleteuser:deleteuser}


// function changepassword(tbl_nm,cb){
// 	var query = "select * from "+tbl_nm
// 	con.query(query,function(err, result){
// 		if(err){
// 			console.log(err)
// 		}
// 		else{
// 			cb(result)
// 		}
// 	})
// }