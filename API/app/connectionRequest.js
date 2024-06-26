module.exports = function () {
    let mysql = require("mysql2");

    const conex = mysql.createConnection({
                                            host:"mysql_vita",
                                            user:"root",
                                            password:"root",
                                            database:"mysql_vita",
                                            port:'3306'
                                        });
    //Instantiate the connection

    conex.connect(function (err) {
        if (err) {
            console.log(`connectionRequest Failed ${err.stack}`)
        } else {
            console.log(`DB connectionRequest Successful ${connection.threadId}`)
        }
    });

    //return connection object
    return conex;
}
