var mysql      = require('mysql');
function MySqlConnection(server,port,user,password)
{
    this.__server   = server ;
    this.__user     = user;
    this.__password = password ;
    this.__port     = port ;
    //this.__connection = connection;
};
MySqlConnection.prototype.open=function()
{
    this.__connection= mysql.createConnection({
            host     : this.__server,
            user     : this.__user,
            password : this.__password,
            port     : this.__port,
            queryFormat:function (query, values) {
                        if (!values) return query;
                        return query.replace(/\:(\w+)/g, function (txt, key) {
                            if (values.hasOwnProperty(key)) {
                                return this.escape(values[key]);
                            }
                            return txt;
                        }.bind(this));
    }});
    this.__connection.connect();
};
MySqlConnection.prototype.close=function()
{
    if(this.__connection)
    {
        this.__connection.end();
    }
};
MySqlConnection.prototype.query =function (sql, args, rsCallback, errorCallback ) {
    if(!this.__connection)
    {
       console.log("call function open before any action");
        return ;
    }
    var query = this.__connection.query(sql, args, function(err, result) {
        if(err && errorCallback )
        {
            errorCallback(err);
        }
        else
        {
            if(rsCallback)
            {
                rsCallback(result);
            }
        }
    });
    console.log(query.sql);
}
exports = MySqlConnection ;
