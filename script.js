// Set the date we're counting down to
const countDownDate = new Date("Oct 22, 2021 15:00:00").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"

  document.getElementById("countdown").innerHTML =
  "<h1 class='title' style='cursor: default;' data-tooltip='Daqui a " + days + " dias " + hours + " horas " + minutes + " minutos " + seconds + " segundos!'> <i class='fas fa-calendar-day'></i> <strong>22</strong> de <strong>Outubro</strong> de <strong>2021</strong></h1>";

  //document.getElementById("countdown").innerHTML = "Faltam " + days + " dias " + hours + " horas "
  //+ minutes + " minutos " + seconds + " segundos para o casamento!";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "<h1 class='title' data-tooltip='Já começou!!'><strong>17</strong> de <strong>Outubro</strong> de <strong>2020</strong></h1>";;
  }
}, 1000);


function copyToClipboard() {
  /* Get the text field */
  const copyText = document.getElementById("inputToCopy");
  const button = document.getElementById("buttonToCopy");
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  button.classList.add('has-tooltip-active');
  button.dataset.tooltip = "IBAN copiado!!";
}

const backToTopButton = document.getElementById("backToTopButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTopButton.style.display = "block";
	} else {
		backToTopButton.style.display = "none";
	}
};

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function goTo (location){
  document.querySelector('#' + location).scrollIntoView(true);
  window.scrollBy(0, -80);
}

const array = ["home", "quandoOnde", "comoChegar", "agradecimento", "confirmacoes", "alojamento", "contactos"];
const arrayElement = [];

array.forEach(element => {
  arrayElement.push(document.querySelector('#' + element));
});

function obCallback(payload) {
    payload.forEach(p => {
      if(p.isIntersecting){
        array.forEach(b => {
            document.querySelector("#button" + b.charAt(0).toUpperCase() + b.slice(1)).classList.remove("is-inverted");
        });
        document.querySelector("#button" + p.target.id.charAt(0).toUpperCase() + p.target.id.slice(1)).classList.add("is-inverted");
      }
    });
  }

const ob = new IntersectionObserver(obCallback, {
  threshold: 0.75,
});

arrayElement.forEach(e => {
  //console.log(e);
  ob.observe(e);
});



function formSubmit()
{

  const formValid = document.forms["form"].reportValidity();
  if(!formValid){
    return formValid;
  }
  else{
    document.querySelector("#buttonSend").classList.add('is-loading');
    document.querySelector("#buttonAdd").setAttribute('disabled', true);
    document.querySelector("#buttonRemove").setAttribute('disabled', true);
    const elements = document.querySelectorAll(".formData");
    const formData = new FormData(); 
    elements.forEach( e => {
      formData.append(e.name, e.value);
    });
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            document.getElementById('mensagem').innerHTML = xmlHttp.responseText;
            document.querySelector('#notificacao').classList.remove('is-hidden');
            document.forms["form"].reset();
            document.querySelector("#buttonSend").classList.remove('is-loading');
            document.querySelector("#buttonAdd").removeAttribute('disabled');
            document.querySelector("#buttonRemove").removeAttribute('disabled');
            goTo("notificacao");
        }
    }
    xmlHttp.open("post", "https://marcosmendes.net:8443/pfm/api/receiveForm"); 
    xmlHttp.send(formData);
  }
}

const name1 = document.querySelector("#nome1");
const name2 = document.querySelector("#nome2");
const name3 = document.querySelector("#nome3");
const name4 = document.querySelector("#nome4");
const name5 = document.querySelector("#nome5");

function addFormRow()
{
  document.querySelector("#buttonRemove").classList.remove("is-hidden");
  if(! name4.classList.contains("is-hidden")){
    document.querySelector("#buttonAdd").classList.add("is-hidden");
  }
  if(name2.classList.contains("is-hidden")){
    name2.classList.remove("is-hidden");
    name2.children[0].name = "nome2";
    name2.children[0].novalidate = false;
    name2.children[0].required = true;
    document.querySelector("#apelido2").classList.remove("is-hidden");
    document.querySelector("#apelido2").children[0].name = "apelido2";
    document.querySelector("#apelido2").children[0].novalidate = false;
    document.querySelector("#apelido2").children[0].required = true;
    document.querySelector("#idade2").classList.remove("is-hidden");
    document.querySelector("#idade2").children[0].children[0].name = "idade2";
    document.querySelector("#idade2").children[0].children[0].novalidate = false;
    document.querySelector("#idade2").children[0].children[0].required = true;
    document.querySelector("#outraInfo2").classList.remove("is-hidden");
    document.querySelector("#outraInfo2").children[0].name = "outraInfo2";

    return;
  }
  if(name3.classList.contains("is-hidden")){
    name3.classList.remove("is-hidden");
    name3.children[0].name = "nome3";
    name3.children[0].novalidate = false;
    name3.children[0].required = true;
    document.querySelector("#apelido3").classList.remove("is-hidden");
    document.querySelector("#apelido3").children[0].name = "apelido3";
    document.querySelector("#apelido3").children[0].novalidate = false;
    document.querySelector("#apelido3").children[0].required = true;
    document.querySelector("#idade3").classList.remove("is-hidden");
    document.querySelector("#idade3").children[0].children[0].name = "idade3";
    document.querySelector("#idade3").children[0].children[0].novalidate = false;
    document.querySelector("#idade3").children[0].children[0].required = true;
    document.querySelector("#outraInfo3").classList.remove("is-hidden");
    document.querySelector("#outraInfo3").children[0].name = "outraInfo3";
    return;
  }
  if(name4.classList.contains("is-hidden")){
    name4.classList.remove("is-hidden");
    name4.children[0].name = "nome4";
    name4.children[0].novalidate = false;
    name4.children[0].required = true;
    document.querySelector("#apelido4").classList.remove("is-hidden");
    document.querySelector("#apelido4").children[0].name = "apelido4";
    document.querySelector("#apelido4").children[0].novalidate = false;
    document.querySelector("#apelido4").children[0].required = true;
    document.querySelector("#idade4").classList.remove("is-hidden");
    document.querySelector("#idade4").children[0].children[0].name = "idade4";
    document.querySelector("#idade4").children[0].children[0].novalidate = false;
    document.querySelector("#idade4").children[0].children[0].required = true;
    document.querySelector("#outraInfo4").classList.remove("is-hidden");
    document.querySelector("#outraInfo4").children[0].name = "outraInfo4";
    return;
  }
  if(name5.classList.contains("is-hidden")){
    name5.classList.remove("is-hidden");
    name5.children[0].name = "nome5";
    name5.children[0].novalidate = false;
    name5.children[0].required = true;
    document.querySelector("#apelido5").classList.remove("is-hidden");
    document.querySelector("#apelido5").children[0].name = "apelido5";
    document.querySelector("#apelido5").children[0].novalidate = false;
    document.querySelector("#apelido5").children[0].required = true;
    document.querySelector("#idade5").classList.remove("is-hidden");
    document.querySelector("#idade5").children[0].children[0].name = "idade5";
    document.querySelector("#idade5").children[0].children[0].novalidate = false;
    document.querySelector("#idade5").children[0].children[0].required = true;
    document.querySelector("#outraInfo5").classList.remove("is-hidden");
    document.querySelector("#outraInfo5").children[0].name = "outraInfo5";
    return;
  }
}

function removeFormRow()
{
  document.querySelector("#buttonAdd").classList.remove("is-hidden");
  if(name3.classList.contains("is-hidden")){
    document.querySelector("#buttonRemove").classList.add("is-hidden");
  }
  if(! name5.classList.contains("is-hidden")){
    name5.classList.add("is-hidden");
    name5.children[0].name = "";
    name5.children[0].novalidate = true;
    name5.children[0].required = false;
    document.querySelector("#apelido5").classList.add("is-hidden");
    document.querySelector("#apelido5").children[0].name = "";
    document.querySelector("#apelido5").children[0].novalidate = true;
    document.querySelector("#apelido5").children[0].required = false;
    document.querySelector("#idade5").classList.add("is-hidden");
    document.querySelector("#idade5").children[0].children[0].name = "";
    document.querySelector("#idade5").children[0].children[0].novalidate = true;
    document.querySelector("#idade5").children[0].children[0].required = false;
    document.querySelector("#outraInfo5").classList.add("is-hidden");
    document.querySelector("#outraInfo5").children[0].name = "";
    return;
  }
  if(! name4.classList.contains("is-hidden")){
    name4.classList.add("is-hidden");
    name4.children[0].name = "";
    name4.children[0].novalidate = true;
    name4.children[0].required = false;
    document.querySelector("#apelido4").classList.add("is-hidden");
    document.querySelector("#apelido4").children[0].name = "";
    document.querySelector("#apelido4").children[0].novalidate = true;
    document.querySelector("#apelido4").children[0].required = false;
    document.querySelector("#idade4").classList.add("is-hidden");
    document.querySelector("#idade4").children[0].children[0].name = "";
    document.querySelector("#idade4").children[0].children[0].novalidate = true;
    document.querySelector("#idade4").children[0].children[0].required = false;
    document.querySelector("#outraInfo4").classList.add("is-hidden");
    document.querySelector("#outraInfo4").children[0].name = "";
    return;
  }
  if(! name3.classList.contains("is-hidden")){
    name3.classList.add("is-hidden");
    name3.children[0].name = "";
    name3.children[0].novalidate = true;
    name3.children[0].required = false;
    document.querySelector("#apelido3").classList.add("is-hidden");
    document.querySelector("#apelido3").children[0].name = "";
    document.querySelector("#apelido3").children[0].novalidate = true;
    document.querySelector("#apelido3").children[0].required = false;
    document.querySelector("#idade3").classList.add("is-hidden");
    document.querySelector("#idade3").children[0].children[0].name = "";
    document.querySelector("#idade3").children[0].children[0].novalidate = true;
    document.querySelector("#idade3").children[0].children[0].required = false;
    document.querySelector("#outraInfo3").classList.add("is-hidden");
    document.querySelector("#outraInfo3").children[0].name = "";
    return;
  }
  if(! name2.classList.contains("is-hidden")){
    name2.classList.add("is-hidden");
    name2.children[0].name = "";
    name2.children[0].novalidate = true;
    name2.children[0].required = false;
    document.querySelector("#apelido2").classList.add("is-hidden");
    document.querySelector("#apelido2").children[0].name = "";
    document.querySelector("#apelido2").children[0].novalidate = true;
    document.querySelector("#apelido2").children[0].required = false;
    document.querySelector("#idade2").classList.add("is-hidden");
    document.querySelector("#idade2").children[0].children[0].name = "";
    document.querySelector("#idade2").children[0].children[0].novalidate = true;
    document.querySelector("#idade2").children[0].children[0].required = false;
    document.querySelector("#outraInfo2").classList.add("is-hidden");
    document.querySelector("#outraInfo2").children[0].name = "";
    return;
  }
}