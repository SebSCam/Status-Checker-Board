const express = require('express') //Crear expres
const app = express()

app.use("/static", express.static("static"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3002, () => {
    console.log('El cliente esta corriendo en el puerto 3002')
})