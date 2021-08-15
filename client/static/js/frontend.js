
//const axios = require('axios')
/*
const button = document.getElementById('buttonGetInfo')

button.addEventListener('click', () => {
    axios({
        method: 'GET',
        url: 'https://www.youtube.com/watch?v=dbiKgSBc_h0'
    }).then(res => {
        console.log(res)
    })
})*/

async function verifyServer(){
    var httprq = new XMLHttpRequest();
    httprq.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(httprq.responseText)            
            console.log(response)          
        }
      };
    httprq.open("GET", "http://192.168.0.111:3030", true);
    httprq.send();


    /*
    try{
        const response = await axios.get('https://www.youtube.com/watch?v=dbiKgSBc_h0')
        console.log(response)
    }catch (error) {
        console.log(error)
    }*/
}


/*
axios.get('http://localhost:3031').then(response => {
    if (response.status == 200){

        document.getElementById("et1").innerHTML="El servidor 1 esta en funcionamiento"
        console.log("El servidor esta en funcionamiento")
    }else{
        document.getElementById("et2").innerHTML="El servidor 1 no esta en funcionamiento"
        console.log("El servidor esta caido")
    }

})
.catch(e => {
    console.log(e);
})

axios.get('http://localhost:3032')
.then(response => {
    if (response.status == 200){
        document.getElementById("et2").innerHTML="El servidor 2 esta en funcionamiento"
        console.log("El servidor esta en funcionamiento")
    }else{
        document.getElementById("et2").innerHTML="El servidor 2 no esta en funcionamiento"
        console.log("El servidor esta caido")
    }

})
.catch(e => {
    console.log(e);
})*/