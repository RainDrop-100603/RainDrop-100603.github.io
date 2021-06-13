const greet_Container=document.querySelector(".js-greetings"),
  greet_form=greet_Container.querySelector("form"),
  greet_input=greet_form.querySelector("input"),
  greet_sayHello=greet_Container.querySelector("h4");

const CN_INVISIBLE="display-none",
  LC_USER="greetings-userName";

function greetUser(user){
  greet_sayHello.classList.remove(CN_INVISIBLE);
  greet_sayHello.innerText=`Hello ${user}!`;
}

function handleSubmit(event){
  event.preventDefault(); //submit시 새로고침 방지
  const inputValue=greet_input.value;
  localStorage.setItem(LC_USER,inputValue);
  greet_form.classList.add(CN_INVISIBLE);
  greetUser(inputValue);
}

function getUser(){
  greet_form.classList.remove(CN_INVISIBLE);
  greet_form.addEventListener("submit",handleSubmit);
}

function init(){
  const user=localStorage.getItem(LC_USER);
  if(user){
    greetUser(user);
  }else{
    getUser();
  }
}

init();