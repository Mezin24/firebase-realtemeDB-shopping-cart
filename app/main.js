import { app, database } from './firebase.config';
import '../style/index.scss';

console.log(app);
console.log(database);

console.log(app);
const addBtn = document.querySelector('#add-item');
const mainInput = document.querySelector('#main-input');

addBtn.addEventListener('click', () => {
  const { value } = mainInput;
  console.log(value);
});
