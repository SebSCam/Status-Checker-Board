const express = require('express');

//init
const app = express();

//Set App
app.set('port',process.env.PORT || 3000);

app.get('/',(req, res)=>{
    res.sendStatus(500);
    console.log('SERVER: I´m working :)');
})

//start
app.listen(app.get('port'),()=>{
    console.log('Server running on http://localhost:3000')
});