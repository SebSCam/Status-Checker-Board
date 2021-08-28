const express = require('express') //Crear expres
const app = express()
const axios = require('axios');
const { restart } = require('nodemon');

app.use("/static", express.static("static"))

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
})

app.get('/status', (req, res) => {
  getUser(res)
})

app.post('/restart-server/:serverid',(req, res)=>{
  restartServer(req.params.serverid);
})

async function restartServer(serverid){
  console.log("Restart en client")
  await axios.post('http://localhost:3001/restart/serverid');
}

async function getUser(res) {
    try {
      const response = await axios.get('http://localhost:3001/status');
      res.send(response.data)
    } catch (error) {
      console.error(error);
    }
  }


app.listen(3002, () => {
    console.log('El cliente esta corriendo en el puerto 3002')
})