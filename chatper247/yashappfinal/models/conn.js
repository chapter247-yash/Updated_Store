var mysql = require('mysql')
//creating the connection
var con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'mydatabase'
})

con.connect(function(err){
	if(err){
		console.log(err)
	}
	else{
		console.log('Connection established....')
	}
})
module.exports=con