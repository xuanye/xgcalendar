
/*
 * GET home page.
 */
var util        = require('util');
exports.index = function(req, res){
  //res.send(util.format("\\/(Date(%d))\\/",new Date().getTime()));
  res.redirect("/calendar");
  //res.render('index', { title: 'Cloud Foundry',data:'new world coming!' });
};