//TAB SLIDER-------------------------------------------------------------

const tabContentBlocks=document.querySelectorAll('.tab_content_block')
const tabs=document.querySelectorAll('.tab_content_item')
const tabsParent=document.querySelector('.tab_content_items')
let currentTab=0
const hideTabContent=()=>{
    tabContentBlocks.forEach(tabContentBlocks=>{
        tabContentBlocks.style.display='none'
    })
    tabs.forEach(tab=>{
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent=(tabIndex=0)=>{
    tabContentBlocks[tabIndex].style.display='block'
    tabs[tabIndex].classList.add('tab_content_item_active')
}

const autoSlider=(tabIndex)=>{
    hideTabContent()
    currentTab=(currentTab+1)%tabs.length
    showTabContent(currentTab)
}
hideTabContent()
showTabContent()
setInterval(autoSlider,3000)

tabsParent.onclick=(event)=>{
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tab,tabIndex)=> {
            if (event.target===tab){
                hideTabContent()
                currentTab=tabIndex
                showTabContent(currentTab)
            }
        })
    }
}
//CARD SWITCHER--------------------------------------------------------

const card = document.querySelector('.card'),
    btnNext=document.querySelector('#btn-next'),
    btnPrev=document.querySelector('#btn-prev')

API_URL='https://jsonplaceholder.typicode.com/todos'

let count= 0
let totalObjects;

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const response=await fetch(API_URL)
        const data=await response.json()
        totalObjects = data.length

        btnNext.addEventListener('click', () => fetchDataAndUpdateCard(1))
        btnPrev.addEventListener('click', () => fetchDataAndUpdateCard(-1))
        fetchDataAndUpdateCard(1)
    }
    catch (e){
        console.error('Ошибка при получении данных:',e)
    }
})

const fetchDataAndUpdateCard = async (offset ) => {
    count = (count + offset + totalObjects) % totalObjects || totalObjects

    try {
        const response = await fetch(`${API_URL}/${count}`);
        const data = await response.json();
        updateCard(data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
};

const updateCard = (data) => {
    card.innerHTML = `
        <p>${data.title}</p>
        <p style=" color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
    `;
};

//WEATHER----------------------------------------------------------------

const cityNameInput= document.querySelector('.cityName')
const city= document.querySelector('.city')
const temp=document.querySelector('.temp')

const API_KEY=`e417df62e04d3b1b111abeab19cea714`
const BASE_URL=`http://api.openweathermap.org/data/2.5/weather`
let delayTimer
const citySearch=()=>{
    cityNameInput.oninput=async (event)=>{
        clearTimeout(delayTimer)
        delayTimer=setTimeout(async ()=>{
            const inputValue = event.target.value.trim();
            if (inputValue === '') {
                // Поле ввода пусто, не делать запрос
                city.innerHTML = 'Введите название города...';
                temp.innerHTML = ' ';
                return;
            }
            try{
                const response=await fetch(`${BASE_URL}?q=${event.target.value}&appid=${API_KEY}`)
                const data=await response.json()
                city.innerHTML=data?.name ? data?.name : 'город не найден...'
                temp.innerHTML=data?.main?.temp ? Math.round(data?.main?.temp-273)+`&degC`: ' '
            }catch (e){
                console.error('Ошибка при получении данных:',e)
            }
        },800)
    }
}
citySearch()

