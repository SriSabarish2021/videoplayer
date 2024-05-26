const video=document.querySelector(".vid")
const plybtn=document.querySelector(".play")
const vol=document.querySelector(".volume")
const plyspped=document.querySelector(".playspeed")
const skipback=document.querySelector(".back10")
const skipfront=document.querySelector(".skip15")
const prgsflow=document.querySelector(".additional__progression")
const prgsbar=document.querySelector(".additional")
console.log(vol)
console.log(plybtn)
console.log(video)
video.style.height="500px"
video.style.width="800px"
function play(){
    if(video.paused){
        video.play()
        plybtn.textContent='⏯️'
    }
    else if(video.play){
        video.pause()
        plybtn.textContent='▶️'
    }
}
function volumechange(){
    console.log(this.value)
    video[this.name]=this.value
}
function speedchange(){
    console.log(this.value)
    video.playbackRate=this.value
}
function move(){
    console.log(this.dataset.skip)
    video.currentTime+=parseFloat(this.dataset.skip)
}
function flow(){
    const dur=(video.currentTime/video.duration)*100;
    prgsflow.style.flexBasis=`${dur}%`
    console.log(prgsflow)
}

function scrub(e){
    const move=(e.offsetX/prgsbar.offsetWidth)*video.duration
    video.currentTime=move
}



skipfront.addEventListener("click",move)
skipback.addEventListener("click",move)
plyspped.addEventListener("change",speedchange)
plyspped.addEventListener("mousemove",speedchange)
vol.addEventListener("change",volumechange)
vol.addEventListener("mousemove",volumechange)
plybtn.addEventListener("click",play)
video.addEventListener("click",play)
video.addEventListener("timeupdate",flow)
prgsbar.addEventListener("click",scrub)



const btn=document.querySelector(".getbtn")

/* btn.addEventListener("click",()=>{
    const input=document.querySelector(".inputsrc")
    const contrl=document.querySelector(".controls")
    console.log(input.value)
    video.src=input.value
    contrl.style.display="flex"
}) */


btn.addEventListener('click', () => {
    const input=document.querySelector(".inputsrc")
    const contrl=document.querySelector(".controls")


    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            video.src= JSON.stringify(data, null, 2);
            contrl.style.display="flex"
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
