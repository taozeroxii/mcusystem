// --------------------------------------------------------------------- CONNECTION postgresql --------------------------------------------------------------
const { Pool, Client } = require('pg')
const pgconnection = new Pool({
  host:      process.env.PGSQL_HOST,
  user:      process.env.PGSQL_USER,
  password:  process.env.PGSQL_PASSWORD,
  database:  process.env.PGSQL_DB,
  charset:'utf8',
  port: process.env.PG_PORT
});
module.exports = pgconnection;

// --------------------------------------------------------------------- CONNECTION MYSQL --------------------------------------------------------------
//- MYSQL Module
try{
  var mysql_npm = require('../node_modules/mysql');
}catch(err){
  console.log("Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`.");
}

//-
//- Connection configuration
//-
var db_config = {
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DB,
  charset:'utf8'
};


//-
//- Create the connection variable
//-
var connection = mysql_npm.createPool(db_config);


//-
//- Establish a new connection
//-
connection.getConnection(function(err){
  if(err) {
      // mysqlErrorHandling(connection, err);
      // console.log("\n\t *** Cannot establish a connection with the database. ***");

      connection = reconnect(connection);
  }else {
      // console.log("\n\t *** New connection established with the database. ***")
  }
});


//-
//- Reconnection function
//-
function reconnect(connection){
  console.log("\n New connection tentative...");
  //- Create a new one
  connection = mysql_npm.createPool(db_config);
  //- Try to reconnect
  connection.getConnection(function(err){
      if(err) {
          //- Try to connect every 2 seconds.
          setTimeout(reconnect(connection), 2000);
      }else {
          console.log("\n\t *** New connection established with the database. ***")
          return connection;
      }
  });
}
//-
//- Error listener
//-
connection.on('error', function(err) {

  //-
  //- The server close the connection.
  //-
  if(err.code === "PROTOCOL_CONNECTION_LOST"){    
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

  else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
  }

  else{
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      return reconnect(connection);
  }

});


//-
//- Export
//-
module.exports = connection;
