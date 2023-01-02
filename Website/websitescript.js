
function generateMainTable() {
    //request the food table from the database server
    let url = new URL('http://127.0.0.1:3200/requestfoodlist')
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = function () {
        let lst = this.response
        let element = document.getElementById("mainTable");
        for (i in lst) { // for every row in the food table
            let item = lst[i];

            //generate the html elements for the row
            let row = document.createElement("tr");
            let namebox = document.createElement("td");
            let amountbox = document.createElement("td");
            let upbox = document.createElement("td");
            let downbox = document.createElement("td");
            let upbutton = document.createElement("input");
            let downbutton = document.createElement("input");

            //lable every element
            namebox.textContent = item.foodName;
            amountbox.textContent = Number(item.Amount);
            amountbox.id = item.foodName + "amountbox";
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
            downbox.appendChild(downbutton);
            row.appendChild(namebox);
            row.appendChild(amountbox);
            row.appendChild(upbox);
            row.appendChild(downbox);
            element.appendChild(row);
        }          
    }
    xhr.onerror = function () {
        alert("Request failed: " + xhr.responseText);
    };
}

function increase(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    let current = Number(element.textContent)
    updateAmount(foodName, current + 1)
    element.textContent = current + 1;
}

function decrease(foodName) {
    let element = document.getElementById(foodName + "amountbox");
    let current = Number(element.textContent)
    if (current - 1 < 0) {
        alert("Can not have a negative amount");
    } else {
        updateAmount(foodName,current-1)
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
