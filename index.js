let localData;
const menu = document.querySelector('#menu-items');

const addItems = (data) => {
  data.forEach(el => {
    const span = document.createElement('span');
    span.textContent = el.name;
    menu.append(span);
  });
}

const getMenu = () => {
  fetch(`http://localhost:3000/menu`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    addItems(data);
    localData = data;
  })
}

const init = (() => {
  getMenu();
})();