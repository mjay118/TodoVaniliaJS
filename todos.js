
function replaceButtonWithInput() {
    document.getElementById("lists").innerHTML = '<div style="margin-top: 25px; width:20rem;">' +
        '<br><input id="input_list" type="text" class="form-control ms-3">' +
        '<button style="margin-top: 5px;" class="btn btn-success ms-3" onclick="createNewCard(input_list.value)">Add Card</button><br></div>';
}
function replaceInputWithButton() {
    document.getElementById("lists").innerHTML = '<div class="card mt-4 add-list ms-3  " onclick="replaceButtonWithInput()" style="width: 17rem; ">' +
        '<div  class="card-body p-2">Add a list</div></div>';
}
function createNewCard(cardName) {
    if (cardName !== "") {
        var pdiv = document.getElementById("pdiv");
        var card_html = ' <div class="w-25"><div class="card ms-3 mt-4 grey" "> <div class="card-title ms-2 mt-2"><h6>'
        card_html += cardName + '</h6></div><div id="' + cardName + '"><div class="form-group mt-1 ps-2 pb-1 pe-2"><input type="text" class="form-control"></div></div><div id="' + cardName + '" class="ms-3"onclick="addTask(this.id)">+ Add another Card <i class="fa fa-newspaper-o addcard" aria-hidden="true"></i></div></div></div>'
        pdiv.innerHTML = card_html + pdiv.innerHTML;
    }
    replaceInputWithButton();
}
function addTask(id) {
    var input_card = document.getElementById(id);
    var inputs = input_card.getElementsByTagName("input");
    var storedValue = inputs[inputs.length - 1].value;
    if (storedValue) {
        input_card.innerHTML += '<div class="form-group mt-1 ps-2 pb-1 pe-2"><input type="text" class="form-control"></div>'
        let oldValue = JSON.parse(localStorage.getItem(id));
        let newValue = { key: "" + (inputs.length - 1), value: storedValue };
        var finalValue = [];
        if (oldValue !== null)
            for (i in oldValue)
        finalValue.push(oldValue[i]);
        finalValue.push(newValue);
        localStorage.setItem(id, JSON.stringify(finalValue));
        getCardValues();
    }
}
function getCardValues() {
    var keys = Object.keys(localStorage);
    for (i in keys) {
        document.getElementById(keys[i]).innerHTML = "";
        let oldValue = JSON.parse(localStorage.getItem(keys[i]));
        for (let j = 0; j < oldValue.length; j++) {
            let dataValue = oldValue[j].value;
            showValues(keys[i], dataValue)
        }
        showInput(keys[i]);
    }
}
function showValues(id, dataValue) {
    var input_card = document.getElementById(id);
    var inputs = input_card.getElementsByTagName("input");
    input_card.innerHTML += '<div class="form-group mt-1 ps-2 pb-1 pe-2"><input disabled=true type="text" class="form-control" value = "' + dataValue + '"></div>'
}
function showInput(id) {
    var input_card = document.getElementById(id);
    var inputs = input_card.getElementsByTagName("input");
    input_card.innerHTML += '<div class="form-group mt-1 ps-2 pb-1 pe-2"><input  type="text" class="form-control"></div>'
}
function createDynamicCard() {
    var keys = Object.keys(localStorage);
    for (i in keys) {
        console.log(i);
        createNewCard(localStorage.key(i));
    }
    getCardValues();
}