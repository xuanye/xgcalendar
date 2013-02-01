var installdb  = require('../libs/installdb');

exports.index = function(req, res){
    installdb.installdb();
    res.send("db setup complete!");
};