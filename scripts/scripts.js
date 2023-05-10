//declare variable for html tags and get value from user
const userId = document.getElementById("userId")
const userName = document.getElementById("userName")
const userOccupation = document.getElementById("userOccupation")
const form = document.getElementById("submit");
const sortSelect = document.getElementById("sortBy");

//when user click add button with arrow function
form.addEventListener("submit", (e) => {   
    //make the defaul action that belongs to the event will not occur
    e.preventDefault();
    
    //increment the value in input userId
    var currentValue = parseInt(userId.value);
    var newValue = currentValue + 1;
    userId.value = newValue;

    //get value for other inputs
    const userIDValue = userId.value;
    const userNameValue = userName.value;
    const userOccupationValue = userOccupation.value;

    //get existing data from localStorage or initialize an empty array
    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    //create a new user object and add it to the userData array
    let newUser = {
        userID: userIDValue,
        userName: userNameValue,
        userOccupation: userOccupationValue
    };
    userData.push(newUser);

    //store the updated userData array in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    //display the new user in the table
    let userTable = document.getElementById("user-table");
    let newRow = userTable.insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    cell1.innerHTML = userIDValue;
    cell2.innerHTML = userNameValue;
    cell3.innerHTML = userOccupationValue;
    
});

// function to sort the table rows based on selected option
function sortTable() {
    const userTable = document.getElementById("user-table");
    const sortValue = document.getElementById("sortBy").value;
  
    // get existing data from localStorage or initialize an empty array
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
  
    // sort the array based on the selected value
    userData.sort(function(a, b) {
      let rowA, rowB;
      //if sortValue is integer value (userId)
      if(sortValue === "userId"){
        rowA = parseInt(a[sortValue]);
        rowB = parseInt(b[sortValue]);
      }else {
        rowA = a[sortValue].toLowerCase();
        rowB = b[sortValue].toLowerCase();
      }
      if (rowA < rowB) {
        return -1;
      } else if (rowA > rowB) {
        return 1;
      } else {
        return 0;
      }
    });
  
    // remove all rows from the table except the header row
    while (userTable.rows.length > 1) {
      userTable.deleteRow(1);
    }
  
    // add sorted rows back to the table
    for (let i = 0; i < userData.length; i++) {
      let newRow = userTable.insertRow(-1);
      let cell1 = newRow.insertCell(0);
      let cell2 = newRow.insertCell(1);
      let cell3 = newRow.insertCell(2);
      cell1.innerHTML = userData[i].userID;
      cell2.innerHTML = userData[i].userName;
      cell3.innerHTML = userData[i].userOccupation;
    }
  }

// event listener to call sortTable function when dropdown selection changes
sortSelect.addEventListener("change", (e) => {
     //make the defaul action that belongs to the event will not occur
    e.preventDefault();
    //call sortTable()
    sortTable();
});
