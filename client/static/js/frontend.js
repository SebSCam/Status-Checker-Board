var idsLabels = ['et1','et2']
var idsButtons = ['bt1', 'bt2']
var idsIndicators = ['ind1','ind2']
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
    var iterator = null;
    var httprq = new XMLHttpRequest();
    var arrayTemp = []
    httprq.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(httprq.responseText)            
            for (let step = 0; step < response.length; step++) {
                iterator=response[step]
                arrayTemp = []
                arrayTemp = iterator.split('#')
                if (arrayTemp[3]==('offline')){
                    document.getElementById(idsLabels[step]).innerHTML='El servidor '+arrayTemp[2]+ ' a las '+arrayTemp[1]+' no esta en funcionamiento'
                    showButton(idsButtons[step])
                    changeIndicator('r', idsIndicators[step])
                }  else if(arrayTemp[4]==('200')){
                    document.getElementById(idsLabels[step]).innerHTML='El servidor '+arrayTemp[2]+ ' a las '+arrayTemp[1]+' esta en funcionamiento'                    
                    changeIndicator('g', idsIndicators[step])
                }   else {
                    document.getElementById(idsLabels[step]).innerHTML='El servidor '+arrayTemp[2]+ ' a las '+arrayTemp[1]+' esta en funcionamiento pero es un caso especial que no recuerdo jajaj XD'                    
                    changeIndicator('o', idsIndicators[step])
                }
            }
            /*for (x of response) {

            }*/
            //console.log(response)          
        }
      };
    httprq.open("GET", "http://192.168.0.111:3001/status", true);
    httprq.send();


    /*
    try{
        const response = await axios.get('https://www.youtube.com/watch?v=dbiKgSBc_h0')
        console.log(response)
    }catch (error) {
        console.log(error)
    }*/
}

function showButton(idButton){
    document.getElementById(idButton).style.display = 'block';
}

function changeIndicator(color, idIndicator){
    if (color == 'r'){
        document.getElementById(idIndicator).style.fill='red'
    } else if (color == 'g'){
        document.getElementById(idIndicator).style.fill='green'
    } else {
        document.getElementById(idIndicator).style.fill='orange'
    }
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