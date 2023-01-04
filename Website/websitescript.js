async function generateMain() {
    const ipresult = await fetch("secret.txt");
    ip = await ipresult.text()

    //see if server is responding



    //request the food table from the database server
    const response = await fetch("http://" + ip + ":3200/requestfoodlist");
    if (response.ok) {

        const lst = await response.json();
        const selectelement = document.getElementById("removeselector");
        const selector = document.createElement("select");
        selector.id = "selector";
        for (i in lst) { // for every row in the food table
            const item = lst[i];

            generateRow(item.foodName, Number(item.Amount));

            //selector code
            const option = document.createElement("option");
            option.text = item.foodName;
            option.value = item.foodName;
            option.id = item.foodName + "option";
            selector.appendChild(option);            
        }
        selectelement.appendChild(selector);
    } else {
        console.log("Did not recieve food list from database");
        alert("Could not connect to database");
        }              
    }  

function generateRow(foodName, amount) {
    //generate the html elements for the row
    const row = document.createElement("tr");
    const namebox = document.createElement("td");
    const amountbox = document.createElement("td");
    const upbox = document.createElement("td");
    const upbutton = document.createElement("input");
    const downbutton = document.createElement("input");

    //lable every element
    namebox.textContent = foodName;
    amountbox.textContent = amount;
    row.id = foodName + "row";
    amountbox.id = foodName + "amountbox";
    amountbox.style.textAlign = "center";
    upbutton.value = "\u2191";
    downbutton.value = "\u2193";
    row.value = foodName;

    //add functionality to the buttons
    upbutton.type = "button";
    upbutton.addEventListener('click', () => {
        increase(foodName)
    })

    downbutton.type = "button";
    downbutton.addEventListener('click', () => {
        decrease(foodName)
    })

    //assign each element to their parent
    upbox.appendChild(upbutton);
    upbox.appendChild(downbutton);
    row.appendChild(namebox);
    row.appendChild(amountbox);
    row.appendChild(upbox);
    document.getElementById("mainTable").appendChild(row);
}


function increase(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    console.log(foodName)
    let current = Number(element.textContent)
    
    fetch('http://' + ip + ':3200/update/' + foodName + '/' + (current + 1))
    element.textContent = current + 1;
}

function decrease(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    let current = Number(element.textContent)
    if (current - 1 < 0) {
        //alert("Can not have a negative amount");
    } else {
        fetch('http://' + ip + ':3200/update/' + foodName + '/' + (current - 1))
        element.textContent = current - 1;
    }
    
}

async function remove() {
    const selector = document.getElementById("selector");
    const foodName = selector.value;
    const response = await fetch("http://" + ip + ":3200/remove/" + foodName);
    const res = await response.text();
    if (res == 'true') {
        const element = document.getElementById(foodName + "row");
        element.remove();
        const option = document.getElementById(foodName + "option");
        option.remove();
    }
}

async function add() {
    const foodName = document.getElementById("newfoodinput").value;
    const response = await fetch("http://" + ip + ":3200/add/" + foodName)
    const res = await response.text();
    if (res == 'true') {
        generateRow(foodName, 0);
        const option = document.createElement("option");
        option.text = foodName;
        option.value = foodName;
        option.id = foodName + "option";
        const selector = document.getElementById("selector");
        selector.appendChild(option);        
    }
}

