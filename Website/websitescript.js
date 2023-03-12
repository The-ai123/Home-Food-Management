async function generateMain() {
    const ipresult = await fetch("secret.txt");
    ip = await ipresult.text()
    const sqlPort = 3300;
    //see if server is responding



    //request the food table from the database server
    const response = await fetch("http://" + ip + ":" + sqlPort + "/requestfoodlist");

    const lst = await response.json();
    const selectelement = document.getElementById("removeselector");
    const selector = document.createElement("select");
    regenerateTable();
    selector.id = "selector";
    for (i in lst) { // for every row in the food table
        const item = lst[i];
        
       

        //selector code
        const option = document.createElement("option");
        option.text = item.foodName;
        option.value = item.foodName;
        option.id = item.foodName + "option";
        selector.appendChild(option);            
    }
    selectelement.appendChild(selector);
}  

async function regenerateTable() {
    let table = document.getElementById("mainTable");
    table.remove();
    table = document.createElement("tbody");
    table.id = "mainTable";
    document.getElementById("tablebody").appendChild(table);
    const response = await fetch("http://" + ip + ":" + sqlPort + "/requestfoodlist");
    const lst = await response.json();
    for (i in lst) { // for every row in the food table
        const item = lst[i];
        generateRow(item.foodName, Number(item.Amount), Number(item.Target));
    }
}

function generateRow(foodName, amount, target) {
    //generate the html elements for the row
    const row = document.createElement("tr");
    const namebox = document.createElement("td");
    const amountbox = document.createElement("td");
    const upbox = document.createElement("td");
    const upbutton = document.createElement("input");
    const downbutton = document.createElement("input");
    const upbutton2 = document.createElement("input");
    const downbutton2 = document.createElement("input");
    const targetbox = document.createElement("td");
    const upbox2 = document.createElement("td");

    //lable every element
    if (amount < target) {
        const temp = document.createElement("mark");
        temp.textContent = foodName;
        namebox.appendChild(temp);
    } else {
        namebox.textContent = foodName;
    }
    
    amountbox.textContent = amount;
    targetbox.textContent = target;
    row.id = foodName + "row";
    amountbox.id = foodName + "amountbox";
    amountbox.style.textAlign = "center";
    targetbox.id = foodName + "targetbox";
    targetbox.style.textAlign = "center";
    upbutton.value = "\u2191";
    downbutton.value = "\u2193";
    upbutton2.value = "\u2191";
    downbutton2.value = "\u2193";
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

    upbutton2.type = "button";
    upbutton2.addEventListener('click', () => {
        updateTarget(foodName, 1)
    })

    downbutton2.type = "button";
    downbutton2.addEventListener('click', () => {
        updateTarget(foodName,-1)
    })

    //assign each element to their parent
    upbox.appendChild(upbutton);
    upbox.appendChild(downbutton);
    upbox2.appendChild(upbutton2);
    upbox2.appendChild(downbutton2);
    row.appendChild(namebox);
    row.appendChild(amountbox);
    row.appendChild(upbox);
    row.appendChild(targetbox);
    row.appendChild(upbox2);
    document.getElementById("mainTable").appendChild(row);
}


function increase(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    let current = Number(element.textContent)    
    fetch('http://' + ip + ':" + sqlPort + "/updateamount/' + foodName + '/' + (current + 1))
    regenerateTable();
}

function decrease(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    let current = Number(element.textContent)
    if (current - 1 < 0) {
        //alert("Can not have a negative amount");
    } else {
        fetch('http://' + ip + ':" + sqlPort + "/updateamount/' + foodName + '/' + (current - 1))
        regenerateTable();
    }
    
}

function updateTarget(foodName, amount) {
    let element = document.getElementById(foodName + "targetbox");
    let current = Number(element.textContent) + amount
    if (current < 0) {
        //alert("Can not have a negative amount");
    } else {
        fetch('http://' + ip + ':" + sqlPort + "/updatetarget/' + foodName + '/' + current)
        regenerateTable();
        
    }

}


async function remove() {
    const selector = document.getElementById("selector");
    const foodName = selector.value;
    const response = await fetch("http://" + ip + ":" + sqlPort + "/remove/" + foodName);
    const res = await response.text();
    if (res == 'true') {
        regenerateTable();
        const option = document.getElementById(foodName + "option");
        option.remove();
    }
}

async function add() {
    const foodName = document.getElementById("newfoodinput").value;
    const response = await fetch("http://" + ip + ":" + sqlPort + "/add/" + foodName)
    const res = await response.text();
    if (res == 'true') {
        regenerateTable();
        const option = document.createElement("option");
        option.text = foodName;
        option.value = foodName;
        option.id = foodName + "option";
        const selector = document.getElementById("selector");
        selector.appendChild(option);        
    }
}

async function generateShoppingList() {
    const ipresult = await fetch("secret.txt");
    ip = await ipresult.text()
    const response = await fetch("http://" + ip + ":" + sqlPort + "/requestfoodlist");
    const lst = await response.json();
    const shoppinglist = document.getElementById("mainlist");
    for (i in lst) { // for every row in the food table
        const item = lst[i];
        const amount = Number(item.Amount);
        const target = Number(item.Target);
        if (amount < target) {
            const entry = document.createElement("li");
            entry.textContent = (target - amount) + " - " + item.foodName
            shoppinglist.appendChild(entry);
        }
    }
}

