var idsLabels = ["et1", "et2"];
var idsButtons = ["bt1", "bt2"];
var idsIndicators = ["ind1", "ind2"];

const button = document.getElementById("buttonGetInfo");
const btn1 = document.getElementById("bt1");
const btn2 = document.getElementById("bt2");

btn1.addEventListener("click", restartServerA, false);
btn2.addEventListener("click", restartServerB, false);

function verifyServer() {
  axios
    .get("http://localhost:3002/status", {
      responseType: "json",
    })
    .then(function (res) {
      if (res.status == 200) {
        for (const i in res.data) {
          verify(res.data[i], i);
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    })
    .then(function () {});
}

async function restartServerA() {
  await axios.post("http://localhost:3002/restart-server/0");
  document.getElementById(btn1).style.display = "none";
  verifyServer()
}

async function restartServerB() {
  await axios.post("http://localhost:3002/restart-server/1");
  document.getElementById(btn2).style.display = "none";
  verifyServer()
}

function verify(data, i) {
  if (data.status == "offline") {
    document.getElementById(idsLabels[i]).innerHTML =
    "El servidor " +
    data.host +
    " a las " +
    data.time +
    " no esta en funcionamiento";
    showButton(idsButtons[i]);
    changeIndicator("r", idsIndicators[i]);
    } else if (data.code == "200") {
        document.getElementById(idsLabels[i]).innerHTML =
        "El servidor " +
        data.host +
        " a las " +
        data.time +
        " esta en funcionamiento";
        changeIndicator("g", idsIndicators[i]);
    } else {
        document.getElementById(idsLabels[i]).innerHTML =
        "El servidor " +
        data.host +
        " a las " +
        data.time +
        " esta en funcionamiento pero es un caso especial que no recuerdo jajaj XD";
    changeIndicator("o", idsIndicators[i]);
  }
}

function showButton(idButton) {
  document.getElementById(idButton).style.display = "block";
}

function changeIndicator(color, idIndicator) {
  if (color == "r") {
    document.getElementById(idIndicator).style.fill = "red";
  } else if (color == "g") {
    document.getElementById(idIndicator).style.fill = "green";
  } else {
    document.getElementById(idIndicator).style.fill = "orange";
  }
}
