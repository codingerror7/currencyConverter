const URL = "https://v6.exchangerate-api.com/v6/e89f444a769c98d50bf62ee0/latest/USD";


let dropDown = document.querySelectorAll(".dropdown select");
let result = document.querySelector("#res");
let btn = document.querySelector("#btn");
let input = document.querySelector("#input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

for(let select of dropDown){
    for(let currCode in countryList){
        //console.log(currCode,countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode == "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode == "INR"){
            newOption.selected = "Selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}

function updateFlag(elements){
   // console.log(elements.value);
    let currCode = elements.value;
    let countryCode = countryList[currCode];
   // console.log(countryCode);
    let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = elements.parentElement.querySelector("img");
    img.src = newImg;
}

btn.addEventListener("click",async (event)=>{
    event.preventDefault();
    if(input.value === "" || input.value <= 0){
        console.log("Invalid input");
        input.value = 1;
    }
    else{
        console.log(fromCurr.value);
        console.log(toCurr.value);
        let newUrl = `https://v6.exchangerate-api.com/v6/e89f444a769c98d50bf62ee0/pair/${fromCurr.value}/${toCurr.value}`;
        let response = await fetch(newUrl);
        console.log(response);
        let data = await response.json();
        console.log(data);
        let amt = data.conversion_rate;
        let finalAmt = (input.value)*amt;
        console.log(finalAmt);
        result.innerHTML = `${input.value} ${fromCurr.value} = ${Math.ceil(finalAmt)} ${toCurr.value}`;
    }
})
