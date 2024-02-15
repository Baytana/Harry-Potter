// круг------------------------------------------------------------------------------
const parentCircle = document.querySelector('.parent_block');
const childCircle = document.querySelector('.child_block');

let speed=0.02
let angle = 0;

moveCircle=()=> {
    const radius = parentCircle.offsetWidth / 2.2 - childCircle.offsetWidth / 2.2;
    const centerX = parentCircle.offsetWidth / 2.65;
    const centerY = parentCircle.offsetHeight / 2.4;

    const posX = centerX + radius * Math.cos(angle);
    const posY = centerY + radius * Math.sin(angle);

    childCircle.style.left = posX + 'px';
    childCircle.style.top = posY + 'px';

    angle += speed // Измените этот параметр для изменения скорости движения

    requestAnimationFrame(moveCircle);
}
const increaseSpeed=()=>{
    speed+=0.01
}
const decreaseSpeed=()=>{
    if (speed > 0) {
        speed -= 0.01;
    }}

increaseSpeedBtn.addEventListener('click', increaseSpeed);
decreaseSpeedBtn.addEventListener('click', decreaseSpeed);

moveCircle();