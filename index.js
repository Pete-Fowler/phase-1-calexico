let menuObj;
let clicked;
const menu = document.querySelector('#menu-items');
const image = document.querySelector('#dish-image');
const title = document.querySelector('#dish-name');
const desc = document.querySelector('#dish-description');
const price = document.querySelector('#dish-price');

const cart = () => {
  
}

const addItems = (data) => {
  data.forEach(dish => {
    const span = document.createElement('span');
    span.textContent = dish.name;
    menu.append(span);
    span.addEventListener('click', () => addDetail(dish))
  });
}

const addDetail = (item) => {
  clicked = item;
  image.src = item.image;
  title.textContent = item.name;
  desc.textContent = item.description;
  price.textContent = item.price;
}

const getMenu = () => {
  fetch(`http://localhost:3000/menu`)
  .then(res => res.json())
  .then(data => {
    addItems(data);
    addDetail(data[0]);
    menuObj = data;
  })
}

const init = (() => {
  getMenu();
})();