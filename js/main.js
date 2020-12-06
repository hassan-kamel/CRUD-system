var firstInput = document.getElementById("first-name");
var lastInput = document.getElementById("last-name");
var submitBtn = document.getElementById("btn-submit");
var enterDiv = document.getElementById("enter-data");
// console.log(enterDiv);
var gIndex;
if (localStorage.getItem("allusers")) {
    var usersList = JSON.parse(localStorage.getItem("allusers"));
} else {
    var usersList = [];

}
var ID = [1];

function gen() {
    var i = 0;
    while (((Math.random()) * 999).round == ID[i]) {
        gen();
    }
    ID.push(Math.round(((Math.random()) * 999)));
    return Math.round(((Math.random()) * 999));

};
console.log(gen());


displayUsers(usersList);
submitBtn.addEventListener("click", function() {
    if (firstInput.value == "" || lastInput.value == "") {
        document.getElementById("warn").innerHTML = `<div class="bg-danger py-4 px-1 rounded-lg text-center warn">please enter complete user's data </div>`;
    } else {
        document.getElementById("warn").innerHTML = ``;
        addUsers();

    }
});

function addUsers() {
    var user = {
        first: firstInput.value,
        last: lastInput.value,
        id: gen(),
    }
    if (submitBtn.innerHTML == "Ubdate") {
        usersList.splice(gIndex, 1, user);
    } else {
        usersList.push(user);
    }
    localStorage.setItem("allusers", JSON.stringify(usersList));
    enterDiv.style.backgroundColor = "#fff";
    submitBtn.innerHTML = "Add";
    clear();
    displayUsers(usersList);
};

function displayUsers(array) {
    var data = ``;
    for (var i = 0; i < array.length; i++) {
        data += ` <tr>
        <td>${i+1}</td>
        <td>${array[i].first}</td>
        <td>${array[i].last}</td>
        <td>a${array[i].id}z</td>
        <td><i class="fas fa-pen text-warning" onclick="funUbdate(${i});"></i></td>
        <td><i class="fas fa-trash-alt text-danger" onclick="funDelete(${i});"></i></td>
    </tr>`;
        console.log(submitBtn);
    }
    document.getElementById("t-body").innerHTML = data;
}

function clear() {
    firstInput.value = "";
    lastInput.value = "";
}

function funDelete(index) {
    usersList.splice(index, 1);
    localStorage.setItem("allusers", JSON.stringify(usersList));
    displayUsers(usersList);

}

function funUbdate(index) {
    firstInput.value = usersList[index].first;
    lastInput.value = usersList[index].last;
    enterDiv.style.backgroundColor = "#FFC107";
    submitBtn.innerHTML = "Ubdate";
    gIndex = index;
}

function search(value) {
    var searched = [];
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].first.toLowerCase().includes(value.toLowerCase()) ||
            usersList[i].last.toLowerCase().includes(value.toLowerCase())) {
            searched.push(usersList[i]);
        }
    }
    displayUsers(searched);
}