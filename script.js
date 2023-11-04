let bodyele = document.querySelector('body')

let mainparent = document.createElement('div')
mainparent.classList.add('container')
bodyele.append(mainparent)

let parentdiv = document.createElement('div')
parentdiv.classList.add('row')
mainparent.append(parentdiv)

let maindiv = document.createElement('div')
maindiv.classList.add('col-lg-4')
maindiv.classList.add('col-sm-12')
parentdiv.append(maindiv)

async function restapi(){
    let fet = fetch('https://restcountries.com/v3.1/all')
    let restout1 = await fet;
    let prom1 = restout1.json()
    let restout2 = await prom1;
    for(let cont of restout2){
        try{
            CreateCard(cont)
        }
        catch{}
    }
}
restapi()

CreateCard = (con)=>{
    let carddiv = document.createElement('div')
    carddiv.classList.add('card')
    carddiv.classList.add('border-dark')
    carddiv.classList.add('bg-secondary')
    carddiv.classList.add('text-dark')
    carddiv.classList.add('text-center')
    maindiv.append(carddiv)

    let bodydiv = document.createElement('div')
    bodydiv.classList.add('card-body')
    bodydiv.setAttribute('lat',con.latlng[0])
    bodydiv.setAttribute('lng',con.latlng[1])
    

    let contyname = document.createElement('p')
    contyname.classList.add('card-header')
    contyname.classList.add('bg-dark')
    contyname.classList.add('text-light')
    contyname.innerText = con.name.common
    carddiv.append(contyname)

    let flag = document.createElement('img')
    flag.setAttribute('src',con.flags.png)
    carddiv.append(flag)

    let capitalname = document.createElement('p')
    capitalname.innerText = `Capital : ${con.capital[0]}`
    bodydiv.append(capitalname)

    let regionname = document.createElement('p')
    regionname.innerText = `Region : ${con.region[0]}`
    bodydiv.append(regionname)

    let countrycode = document.createElement('p')
    countrycode.innerText = `Country code : ${con.cca2}`
    bodydiv.append(countrycode)

    var btn = document.createElement('button')
    btn.classList.add('btn')
    btn.classList.add('btn-primary')
    btn.setAttribute('onclick',"weather(this)")
    btn.innerText = 'Click for Weather'
    bodydiv.append(btn)

    carddiv.append(bodydiv)
}
async function weather(e){
    let lati = e.parentElement.getAttribute('lat')
    let longi = e.parentElement.getAttribute('lng')

    let API_key = 'abb6b6f79cb2f88348fdcbc7c1691888';

    let weafet = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_key}`)
    let weatout1 = await weafet;
    let prom2 = weatout1.json();
    let weatout2 = await prom2;
    alert(`Temp : ${weatout2.main.temp} \n Humidity : ${weatout2.main.humidity} \n Main : ${weatout2.weather[0].main} \nDescription :${weatout2.weather[0].description}`)
}
