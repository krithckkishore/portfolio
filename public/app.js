const video1 = document.getElementById('projectvideo1');
const video2 = document.getElementById('projectvideo2');
const video3 = document.getElementById('projectvideo3');

const hoversign = document.querySelector(".hover-sign");

const sideBar = document.querySelector('.sidebar');
const menu  = document.querySelector('.menu-icon');
const close = document.querySelector('.close-icon');

const contactform = document.querySelector('.contact-section');
let name = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');


const videolist = [video1, video2, video3];

videolist.forEach(function(video){
    video.addEventListener('mouseover',function(){
        video.play();
        hoversign.classList.add("active")
    })
    video.addEventListener('mouseout',function(){
        video.pause();
        hoversign.classList.remove("active")
    })
    

})

menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")

})

close.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar")
    sideBar.classList.add("close-sidebar")
})

contactform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formdata = {
        name: name.value,
        email: email.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    // xhr.open('POST','https://c08zpvs7-5000.inc1.devtunnels.ms/');
    xhr.open('POST','http://127.0.0.1:5000/');
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function(){

        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sent');
            name.value='';
            email.value='';
            message.value='';

        }else{
            alert('Something went wrong!')
        }
    }
    xhr.send(JSON.stringify(formdata))
    
})