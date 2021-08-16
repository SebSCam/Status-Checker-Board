const express = require('express');
const axios = require('axios');
const exec = require('child_process').exec
const lineReader = require('line-reader')
const cors = require('cors')
var answer = []
const config = {
  application: {
      cors: {
          server: [
              {
                  origin: ('*'), 
                  credentials: true
              }
          ]
      }}
}
const app = express();

//Set App
app.set('port',process.env.PORT || 3001);
app.use(cors(config.application.cors.server));
//app.use('/resources', require('./resources/'))

function readStatusLog(){
  lineReader.eachLine('info.log', function (line) {
      if (answer.length >= 2) {
          answer.shift();
      }
      answer.push(line)
  });
}

//const myShellScript = exec('bash /resources/script.sh')
const myShellScript = exec('bash script.sh')

  app.get('/status',(req, res)=>{
    readStatusLog();
    setTimeout(function() {
        var data = JSON.stringify(answer)
        res.status(200)
        res.send(data)
    },4000);
  });

//start
app.listen(app.get('port'),()=>{
    console.log('Middleware running on http://localhost:3001')
});