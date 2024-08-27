const inputEl = document.getElementById('input-el');
const button = document.getElementById('add-button');

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

const shoppingList = document.getElementById('shopping-list')

const appSettings = {
   databaseURL: "https://listo-f60a3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);

const listInDB = ref(database, 'list')

onValue(listInDB, function (snapshot) {
   console.log(shoppingList, 'shoppingList');
   clearUlElement() 
   if (snapshot.exists()) {
      const listItems = Object.entries(snapshot.val());
      for (let i = 0; i < listItems.length; i++) {
         appendLiElementToUl(listItems[i])
      }  
   }
})

button.addEventListener('click', function () {
   if (inputEl.value.trim() !== "") {
      push(listInDB, inputEl.value)
      clearInputField()
   } else {
      alert('Please enter an item')
   }
})

function clearInputField() {
   inputEl.value = ''
}

function appendLiElementToUl(item) {
   const itemID = item[0];
   const itemValue = item[1];

   let newListItem = document.createElement('li');
   newListItem.textContent = itemValue;

   newListItem.addEventListener('click', function () {
      console.log(itemID, 'itemID');
      console.log(itemValue, 'itemValue');
      const locationInDB = ref(database, `list/${itemID}`);
      remove(locationInDB)
   })
   shoppingList.appendChild(newListItem)
   
}

function clearUlElement() {
   shoppingList.innerHTML = ''
}