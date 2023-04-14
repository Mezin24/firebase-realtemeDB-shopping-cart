import { database } from './firebase.config';
import { ref, push, onValue, remove } from 'firebase/database';
import '../style/index.scss';

const shoppingListInDb = ref(database, 'shopping_list');
const form = document.querySelector('#form');
const mainInput = document.querySelector('#main-input');
const shoppingList = document.querySelector('.shopping-list');
const trashBtn = document.querySelector('.btn-trash');
const cartMsg = document.querySelector('.cart-msg');

form.addEventListener('submit', addToCart);
shoppingList.addEventListener('click', removeItemFromsCart);
trashBtn.addEventListener('click', clearShoppingCart);

onValue(shoppingListInDb, updateShopList, {
  onlyOnce: false,
});

// FUNCTIONS
function addToCart(e) {
  e.preventDefault();
  const { value } = mainInput;
  if (value.trim() === '') return;
  push(shoppingListInDb, value);
  clearInput(mainInput);
}

function updateShopList(snapshot) {
  shoppingList.innerHTML = '';
  if (snapshot.size > 0) {
    cartMsg.classList.add('hide');
  } else {
    cartMsg.classList.remove('hide');
  }
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    renderNewItemToCart(shoppingList, { childKey, childData });
  });
}

function renderNewItemToCart(listNode, { childKey, childData }) {
  const shoppingItem = `<li class='cart-item' data-id=${childKey}>${childData}</li>`;
  listNode.insertAdjacentHTML('afterbegin', shoppingItem);
}

function clearInput(input) {
  input.value = '';
}

async function removeItemFromsCart(e) {
  if (!e.target.classList.contains('cart-item')) return;
  const item = e.target;
  const itemId = item.dataset.id;
  await remove(ref(database, `/shopping_list/${itemId}`));
}

async function clearShoppingCart() {
  await remove(ref(database, '/shopping_list'));
}
