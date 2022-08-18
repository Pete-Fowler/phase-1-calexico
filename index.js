let menuObj;
let clicked;
let total;
const menu = document.querySelector('#menu-items');
const image = document.querySelector('#dish-image');
const title = document.querySelector('#dish-name');
const desc = document.querySelector('#dish-description');
const price = document.querySelector('#dish-price');
const form = document.querySelector('#cart-form');
const input = document.querySelector('#cart-amount');
const count = document.querySelector('#number-in-cart');

const addUp = (data) => {
  
}

const displayTotal = (data) => {
  const container = document.querySelector('#dish');
  const totalBox = document.createElement('h3');
  total = data.reduce((prev, current) => {
      return prev + current.price * current.number_in_bag;
    }, 0);
  console.log(total);
  
  totalBox.textContent = `Current Total: ${total}`;
  container.append(totalBox);
}

const cart = (e) => {
  e.preventDefault();
  clicked.number_in_bag += parseInt(input.value);
  count.textContent = clicked.number_in_bag;
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "number_in_bag": clicked.number_in_bag,
    }),
  };
  console.log(clicked.id);
  fetch(`http://localhost:3000/menu/${clicked.id}`, config)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
  displayTotal();
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
  count.textContent = item.number_in_bag;
  input.value = '';
}

const getMenu = () => {
  fetch(`http://localhost:3000/menu`)
  .then(res => res.json())
  .then(data => {
    addItems(data);
    addDetail(data[0]);
    displayTotal(data);
    menuObj = data;
  })
}

const init = (() => {
  getMenu();
  form.addEventListener('submit', cart);
})();