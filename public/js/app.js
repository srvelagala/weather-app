

// const getWeather = () => {
// let city = document.getElementById("idCity").value;
// var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         document.getElementById("demo").innerHTML = this.responseText;
//     }
//   };
//   xhttp.open("GET", "/weather?city="+city, true);
//   xhttp.send();

// }

const getWeather = () => {
  let city = document.getElementById("idCity").value;
  fetch("/weather?city="+city).then((response) => {
  response.json().then((data) => {
    document.getElementById("demo").innerHTML = data ;
  })
});
}