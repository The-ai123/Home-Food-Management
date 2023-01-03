async function generateMainTable() {
    let result = await fetch("secret.txt");
    let ip = await result.text()

    //request the food table from the database server
    const response = await fetch("http://" + ip + ":3200/requestfoodlist");
    if (response.ok) {

        const lst = await response.json();
        const element = document.getElementById("mainTable");
        for (i in lst) { // for every row in the food table
            const item = lst[i];

            //generate the html elements for the row
            const row = document.createElement("tr");
            const namebox = document.createElement("td");
            const amountbox = document.createElement("td");
            const upbox = document.createElement("td");
            const upbutton = document.createElement("input");
            const downbutton = document.createElement("input");

            //lable every element
            namebox.textContent = item.foodName;
            amountbox.textContent = Number(item.Amount);
            amountbox.id = item.foodName + "amountbox";
            amountbox.style.textAlign = "center";
            upbutton.value = "\u2191";
            downbutton.value = "\u2193";
            row.value = item.foodName;

            //add functionality to the buttons
            upbutton.type = "button";
            upbutton.addEventListener('click', () => {
                increase(item.foodName)
            })

            downbutton.type = "button";
            downbutton.addEventListener('click', () => {
                decrease(item.foodName)
            })

            //assign each element to their parent
            upbox.appendChild(upbutton);
            upbox.appendChild(downbutton);
            row.appendChild(namebox);
            row.appendChild(amountbox);
            row.appendChild(upbox);
            element.appendChild(row);

        }
    } else {
        console.log("Did not recieve food list from database");
        alert("Could not connect to database");
        }              
    }  


function increase(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    let current = Number(element.textContent)
    fetch('http://127.0.0.1:3200/' + foodName + '/' + (current + 1))
    element.textContent = current + 1;
}

function decrease(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    let current = Number(element.textContent)
    if (current - 1 < 0) {
        //alert("Can not have a negative amount");
    } else {
        fetch('http://127.0.0.1:3200/' + foodName + '/' + (current - 1))
        element.textContent = current - 1;
    }
    
}

function updateAmount(foodName, amount) {
    let url = new URL('http://127.0.0.1:3200/' + foodName + '/' + amount);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onerror = function () {
        alert("Request failed: " + xhr.responseText);
    };
}

function test() {
    document.getElementById("help").innerHTML = "wow";
}
