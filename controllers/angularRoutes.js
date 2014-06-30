// var UserModel = require('../models/userModel.js')


module.exports = {
 index : function(req, res) {
   UserModel.find({userid : { $exists : true }}, function(err, data){
     if (err) throw err;
     res.render('layout',{
       users: data,
       username: req.user.profile.first_name });
   });
 },
 partials : function (req, res) {
   var name = req.params.name;
   // console.log('partial render-', name);
   res.render('partials/' + name);
 },
 templates: function(req, res) {
   var name = req.params.name;
   res.render('templates/' + name);
 }
}