const cards=async ()=>{
    try{
        const response= await fetch('../data/cards.json')
        const data=await response.json()

        const continentsWrapper=document.querySelector('.cards')

        data.forEach((i)=>
        {
            const Card=document.createElement('div')
            Card.setAttribute('class','Card')

            Card.innerHTML=`
            <div class="Image">
                <img src="${i.img}">
            </div>
            <div class="discipline">${i.discipline}</div>

            <h2>${i.name}</h2>`

            continentsWrapper.append(Card)
        })
    }catch (e){
        console.error(e)
    }
}

cards()