const express = require('express');
const exec = require('child_process').exec
const lineReader = require('line-reader')
const cors = require('cors');
const hosts = ['192.168.100.140','192.168.100.160']
var answer = []

const app = express();

//Set App
app.set('port',process.env.PORT || 3001);
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

app.use(cors(
  config.application.cors.server
));

function readStatusLog(){
  lineReader.eachLine('info.log', function (line) {
      if (answer.length >= 2) {
          answer.shift();
      }
      answer.push(line)
  });
}

// const myShellScript = exec('bash script.sh')

  app.get('/status',(req, res)=>{
    readStatusLog();
    setTimeout(function() {
        res.status(200)
        res.send(convertData())
    },4000);
  });

  app.post('/restart/:serverid',(req, res)=>{
    restartServer(req.params.serverid);
  })

  function restartServer(serverid){
    console.log('sshpass -p vagrant ssh vagrant@' + hosts[serverid] + ' "bash restart.sh"')
    exec('sshpass -p vagrant ssh vagrant@' + hosts[serverid] + ' "bash restart.sh"');
  }

  function convertData(){
    var server = [];
    for (const i in answer ) {
       let temp = answer[i].split("#")
       server.push({"date":temp[0],"time":temp[1]
                    ,"host":temp[2],"status":temp[3]
                    ,"message":temp[4],"code":temp[5]});
    }
    return JSON.stringify(server)
  }

//start
app.listen(app.get('port'),()=>{
    console.log('Middleware running on http://localhost:3001')
});