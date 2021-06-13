const body=document.body;

function handleLoad(image){
  image.classList.add("bg-image");
  body.appendChild(image);
}

function init(){
  const image=new Image();
  imgNum=Math.floor(Math.random()*2)+4;
  image.src=`images/${imgNum}.jpg`
  image.addEventListener("load",handleLoad(image),{once:true})
}

init();