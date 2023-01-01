
function test2() {
    let url = new URL('http://127.0.0.1:3200/requestfoodlist')
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        document.write("  ");
    }
    xhr.onerror = function () {
        alert("Request failed: " + xhr.responseText);
    };
}

function test() {
    document.getElementById("help").innerHTML = "wow";
}
