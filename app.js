const base_url = "https://api.frankfurter.app/latest?amount=1&from=";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
for (let currencyCode in countryList) {
let nwOptn = document.createElement("option");
nwOptn.innerText = currencyCode;
nwOptn.value = currencyCode;
if (select.name === "from" && currencyCode === "USD") {
nwOptn.selected = "1";
}
if (select.name === "to" && currencyCode === "INR") {
nwOptn.selected = "1";
}
select.append(nwOptn);
}
select.addEventListener("change", (evt) => {
updateFlag(evt.target);
});
}
const updateFlag = (element) => {
let currencyCode = element.value;
let countryCode = countryList[currencyCode];
let nwsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = nwsrc;
};
btn.addEventListener("click", async (evt) => {
evt.preventDefault();
let amt = document.querySelector(".amount input");
let amtVal = amt.value;
if (amtVal === "" || amtVal < 1) {
amtVal = 1;
amt.value = "1";
}
const URL = `${base_url}${fromCurr.value}&to=${toCurr.value}`;
let response = await fetch(URL);
let data = await response.json();
let rate = data.rates[toCurr.value];
let finalAmount = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});