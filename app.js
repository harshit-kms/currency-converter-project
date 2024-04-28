const base_url =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownSelects = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const finalMsg = document.querySelector("#msg");

for(let select of dropdownSelects){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected";
        }
    }


    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); /*evt is event object and evt.target represents the element i.e, select where change has been made*/
    }); 
}

const updateFlag = (element) =>{
    let currCode = element.value; 
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img"); /*element contains the select*/
    image.src = newSrc; // not innerText
}

btn.addEventListener("click", async (evt) => {

    evt.preventDefault(); // prevents all the default functions of button like refreshing
    let amt = document.querySelector(".input-amt input");
    let inputAmt = amt.value; // not innerText
    if(inputAmt == "" || inputAmt<0){
        inputAmt= 1.00;
        amt.value= 1.00; //caution
    }
    console.log(fromCurr.value, toCurr.value); 
    const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; //caution 
    let response = await fetch(url);
    let data = await(response).json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = inputAmt*rate;
    finalMsg.innerText = `${inputAmt} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;


}
);