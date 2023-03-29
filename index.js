let myLeads = [] 
//array to contain all the urls
const inputEl = document.getElementById("input-el")
// grabbing the input element from the html and creating a variable to set it to
const inputBtn = document.getElementById("input-btn")
// grabbing th save input button from the html and creating a variable to set it to
const ulEl = document.getElementById("ul-el")
// grabbing the unordered list element from the html and creating a variable to set it to
const deleteBtn = document.getElementById("delete-btn")
// grabbing the delete button element from the html and creating a variable to set it to
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
// if the leads from local storage variable is not empty, set the myLeads array to be the leads from localstorage 
// then render the myLeads elements

//getting the current tab using chrome.tabs.query
//and then storing it into myLeads array
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

