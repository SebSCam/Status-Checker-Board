const express = require('express');
const axios = require('axios');
const date = require('date-and-time');
const pattern = date.compile('YYYY/MM/DD HH:mm:ss');
const server_host = ['localhost']

const app = express();

//Set App
app.set('port',process.env.PORT || 3001);
app.use('/resources', require('./resources/'))

async function verifyServer(url) {
    try {
        const {status, statusText, responseUrl, config} = await axios.get(url);
        const now = new Date();
        console.log(date.format(now, pattern),status, statusText, config.url);
        //curl http://localhost:3000 -w ", %{http_code}"
    } catch (error) {
      console.error(error);
    }
  }

  app.get('/status',(req, res)=>{
    for (const i in server_host) {
        verifyServer('http://'+server_host[i]+':3000');
        console.log(server_host[i]);
    }
  });

//start
app.listen(app.get('port'),()=>{
    console.log('Middleware running on http://localhost:3001')
});