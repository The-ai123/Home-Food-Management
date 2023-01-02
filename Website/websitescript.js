
function generateFoodDropDown() {
    let url = new URL('http://127.0.0.1:3200/requestfoodlist')
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = function () {
        let lst = this.response
        let element = document.getElementById("mainTable");
        for (i in lst) {
            let item = lst[i];

            let row = document.createElement("tr");
            let namebox = document.createElement("td");
            let amountbox = document.createElement("td");
            let upbox = document.createElement("td");
            let downbox = document.createElement("td");
            let upbutton = document.createElement("input");
            let downbutton = document.createElement("input");

            console.log(item.foodName);
            namebox.textContent = item.foodName;
            amountbox.textContent = Number(item.Amount);
            amountbox.id = item.foodName + "amountbox";
            upbutton.value = "\u2191";
            downbutton.value = "\u2193";
            row.value = item.foodName;
            //downbutton.value = item.foodName;
            //upbutton.value = item.foodName;

            upbutton.type = "button"; 
            upbutton.addEventListener('click', () => {
                increase(item.foodName)
            })

            downbutton.type = "button";
            downbutton.addEventListener('click', () => {
                decrease(item.foodName)
            })

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
    element = document.getElementById(foodName + "amountbox");
    element.textContent = Number(element.textContent) + 1;
}

function decrease(foodName) {
    element = document.getElementById(foodName + "amountbox");
    element.textContent = Number(element.textContent) - 1;
}

function test() {
    document.getElementById("help").innerHTML = "wow";
}
