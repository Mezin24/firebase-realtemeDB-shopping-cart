import { database } from './firebase.config';
import { ref, push, onValue } from 'firebase/database';
import '../style/index.scss';

const shoppingListInDb = ref(database, 'shopping_list');
const form = document.querySelector('#form');
const mainInput = document.querySelector('#main-input');
const shoppingList = document.querySelector('.shopping-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = mainInput;
  push(shoppingListInDb, value);
  mainInput.value = '';
});

onValue(
  shoppingListInDb,
  (snapshot) => {
    shoppingList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      const shoppingItem = `<li data-id=${childKey}>${childData}</li>`;
      shoppingList.insertAdjacentHTML('beforeend', shoppingItem);
      console.log(childData);
    });
  },
  {
    onlyOnce: false,
  }
);
