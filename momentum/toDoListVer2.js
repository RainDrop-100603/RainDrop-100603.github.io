const TDL_Container=document.querySelector(".js-toDoList");
  // toDo_ul=toDo_Container.querySelector("ul");

//size of list
const LIST_SIZE=10000;
const LC_LIST="TDL-list";
//[name of list ,placeholder,input where], if there's no input form, placeholder is null
const TDL_name=[  
  ["todo","What to do?","todo"],
  ["finish",null]
]; 
//map of list: [key: name, value: list(map)]
let TDL_listGroup=new Map();  

function saveToLocal(){
  const str=JSON.stringify(TDL_listGroup.entries());
  localStorage.setItem(LC_LIST,str);
}

function getFromLocal(listName){
  const str=localStorage.getItem(listName);
  return new Map(JSON.parse(str));
}

function handleBtn(event,destName){
  const fromLi=event.target.parentElement;
  const fromUl=fromLi.parentElement;
  const fromName=fromUl.parentElement.className;
  const fromID=fromLi.id;
  const fromList=TDL_listGroup.get(fromName);
  if(destName){ //move
    const destList=TDL_listGroup.get(destName);
    fromLi.id=getID(destList);
    const fromText=fromLi.querySelector("span").innerText;
    destList.set(fromLi.id,fromText);
    displayElement(destName,fromLi.id,fromText);
    saveToLocal(destName);
  }
  fromUl.removeChild(fromLi);
  fromList.delete(fromID);
  saveToLocal(fromName);
}

function makeBtn(btnText,dest){
  const btn=document.createElement("button");
  btn.innerText=btnText;
  btn.addEventListener("click",function(event){
    handleBtn(event,dest);
  });
  return btn;
}

function displayElement(name,key,value){
  //make li
  const tmpLi=document.createElement("li");
  const tmpSpan=document.createElement("span");
  tmpSpan.innerText=value;
  tmpLi.appendChild(tmpSpan);
  tmpLi.id=key;
  //make Btn
  if(name==="TDL-todo"){
    tmpLi.appendChild(makeBtn("✔","TDL-finish"));
  }
  if(name==="TDL-finish"){
    tmpLi.appendChild(makeBtn("♻","TDL-todo"));
  }
  tmpLi.appendChild(makeBtn("❌",null));
  //add li to ul
  const ul=TDL_Container.querySelector(`.${name}`).querySelector("ul");
  ul.appendChild(tmpLi);
}

function displayElement(targetList,newID,inputValue){

}

function displayList(){
  // map 자료형에 대한 이해 필요 
  for(let element of TDL_listGroup.entries()){
    const targetList=element[0];
    for(let list of element[1].entries()){

    }
  }
}

function handleSubmit(event,nameObj){
  event.preventDefault();
  event.target.querySelector("input").value="";
  let inputTarget=nameObj[2];
  if(inputTarget===null){
    inputTarget=nameObj[0];
  }
  const inputValue=event.target.querySelector("input").value;
  //add element to list
  const targetList=TDL_listGroup.get(inputTarget);
  const newID=String(Date.now());
  targetList.set(newID,inputValue);
  saveToLocal();
  //add element to html
  displayElement(targetList,newID,inputValue);
}

function buildHtmlBase(){
  TDL_name.forEach(function(nameObj){
    //create div
    const tDiv=document.createElement("div");
    tDiv.classList.add(nameObj[0]);
    //create title
    const tTitle=document.createElement("div");
    tTitle.classList.add("TDL-title");
    tTitle.innerText=nameObj[0];
    tDiv.appendChild(tTitle);
    //make input form if placeholder !== null
    if(nameObj[0]){
      const tInput=document.createElement("input");
      tInput.type="text";
      tInput.placeholder=nameObj[1];
      const tForm=document.createElement("form");
      tForm.appendChild(tInput);
      tForm.addEventListener("submit",function(event){handleSubmit(event,nameObj)});
      tDiv.appendChild(tForm);
    }
    //make ul
    const tUl=document.createElement("ul");
    tDiv.appendChild(tUl);
    TDL_Container.appendChild(tDiv);
  });
}

function loadList(){
  TDL_listGroup=getFromLocal(LC_LIST);
}

function init(){
  loadList();
  buildHtmlBase();
  displayList();
}

init();
//li를 옮길때, text를 list에서 찾아도 된다.


