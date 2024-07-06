const apiKey ="f219ce4830f8ce4c4df101f3";
const BASE_URL =
  `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

  

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const message = document.querySelector(".msg");


// access country list 
// for(code in countryList) {
//     console.log(code,countryList[code]);
// }


for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name == "from" && currcode == "USD"){
            newOption.selected = "selected";
        } else if(select.name == "to" && currcode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })

}



const updateflag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let srcLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = srcLink; 
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();  // no reload on form button
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal < 1 || amtVal===""){
        amtVal = 1;
        amount.value = 1;
    } 
    
    const url =`${BASE_URL}/${fromcurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.conversion_rates[tocurr.value];
    let finalAmount = amtVal * rate ;
    console.log(rate);
    message.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;

}); 