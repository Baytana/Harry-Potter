//FIXED SCROLL
// window.addEventListener("scroll", function () {
//     var fixedHeader = document.querySelector(".inner_main");
//     var scrollTrigger = document.querySelector(".slider_block");
//
//     if (isElementVisible(scrollTrigger)) {
//         fixedHeader.style.opacity = "0"; // Показываем фиксированный текст
//     } else {
//         fixedHeader.style.opacity = "1"; // Скрываем фиксированный текст
//     }
// });

function isElementVisible(el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')
const generateBtn=document.querySelector('.btn-generate')
const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}
generateBtn.onclick=()=>setRandomColors()

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.style.color=buttonColor.innerHTML
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

// SLIDER BLOCK

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0


const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}
const showSlide = (i = 0) => {
    slides[i].style.opacity = 1
    slides[i].classList.add('active_slide')
}

hideSlide()
showSlide(index)


const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > slides.length - 1) {
            i = 0
        }
        hideSlide()
        showSlide(i)
    }, 10000)
}

next.onclick = () => {
    index < slides.length - 1 ? index++ : index = 0
    hideSlide()
    showSlide(index)
}

prev.onclick = () => {
    index > 0 ? index-- : index = slides.length - 1
    hideSlide()
    showSlide(index)
}

autoSlider(index)

//HOGWSRDS
const toggleBlocks = () => {
    const blocks = document.querySelectorAll('.block-img');

    blocks.forEach(block => {
        if (block.classList.toggle('hidden')){
            hogwartsContainer.style.height = '6000px'; // Высота при разворачивании
        }else {
            hogwartsContainer.style.height = '1200px'; // Высота при сворачивании
        }
    });

    const button = document.getElementById('toggleBtn');
    const button2=document.getElementById('toggleBtn2')
    const buttonText = button.textContent.trim(); // Получаем текущий текст
    const newButtonText = buttonText === 'Разворачивать' ? 'Сворачивать' : 'Разворачивать';
    button.textContent = newButtonText;
    button2.textContent= newButtonText
};

// Назначаем обработчик события на кнопку
document.getElementById('toggleBtn').addEventListener('click', toggleBlocks);
document.getElementById('toggleBtn2').addEventListener('click',toggleBlocks)
