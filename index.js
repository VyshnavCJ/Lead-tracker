const inputBtn = document.getElementById("input-btn");
const inputEL = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function (e) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    e.preventDefault();
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
      <a target = '_blank' href ='${leads[i]}'>
        ${leads[i]}
      </a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function (e) {
  myLeads.push("http://" + inputEL.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  e.preventDefault();
  inputEL.value = "";
});

deleteBtn.addEventListener("dblclick", function (e) {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
  e.preventDefault();
});
