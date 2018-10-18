const addMenuBtn = document.querySelector('button#add');
const AddMenuform = document.querySelector('form#add-menu-form');
const addBtn = document.querySelector('button#add');
const loader = document.querySelector('div.loader');
const foodNameInput = document.querySelector('input#add-name');
const categoryInput = document.querySelector('input#add-category');
const priceInput = document.querySelector('input#add-price');
const descInput = document.querySelector('textarea#add-description');
class CreateMenu {
  constructor() {
    this.token = localStorage.getItem('x-access-token');
  }

  addMenu() {
    const token = localStorage.getItem('x-access-token');
    if (!token) {
      window.location.href = '../../login.html';
      return
    }
    const endPoint = `${hostURL}/menu`;
    const payload = {
      foodName: foodNameInput.value,
      category: categoryInput.value,
      price: priceInput.value,
      description: descInput.value
    }
    loader.style.display = 'flex';
    loader.style.margin = '3% auto';
    return fetch(endPoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.token
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then((res) => {
        if(res.error) {
          if ((res.error).includes('already')){
            const genError = document.querySelector('#gen-error');
            genError.style.color = 'yellow';
            genError.style.margin = '8px auto';
            genError.style.textAlign = 'center';
            loader.style.display = 'none';
            genError.textContent = 'menu already added'
            return false;
          }
          else {
            if(foodNameInput.value.length === 0) {
              const span = document.querySelector('#name-error');
              span.style.color = 'yellow';
              span.textContent = '  (name field is required)';
              loader.style.display = 'none';
            }
            else if(foodNameInput.value.length !== 0) {
              const span = document.querySelector('#name-error');
              span.textContent = '';
            }
            if(categoryInput.value.length === 0) {
              const span = document.querySelector('#category-error');
              span.style.color = 'yellow';
              span.textContent = '  (category field is required)';
              loader.style.display = 'none';
            }
            else if(categoryInput.value.length !== 0) {
              const span = document.querySelector('#category-error');
              span.textContent = '';
            }
            if(priceInput.value.length === 0) {
              const span = document.querySelector('#price-error');
              span.style.color = 'yellow';
              span.textContent = '  (price field is required)';
              loader.style.display = 'none';
            }
            else if(priceInput.value.length !== 0) {
              const span = document.querySelector('#price-error');
              span.textContent = '';
            }
            if (descInput.value.length === 0) {
              const span = document.querySelector('#desc-error');
              span.style.color = 'yellow';
              span.textContent = '  (description field is required)';
              loader.style.display = 'none';
            }
            else if(descInput.value.length !== 0) {
              const span = document.querySelector('#desc-error');
              span.textContent = '';
            }
            return false;
          }
        }
        loader.style.display = 'none';
        const div = createNode('div');
        const parentNode = document.querySelector("#addModal-wrapper");
        div.style.color = 'yellow';
        div.style.margin = '8px auto';
        div.style.textAlign = 'center';
        div.textContent = 'menu successfully added';
        parentNode.insertBefore(div, loader)
        setTimeout(() => {
          location.reload();
        }, 1200)

      })
      .catch(error => console.error(error));
  }
}
const add = new CreateMenu();
if (addBtn) {
  addBtn.onclick = (event) => {
    add.addMenu();
  }
}

foodNameInput.onchange = () => {
  if (!(/^[a-zA-Z\s]*$/).test(foodNameInput.value)) {
    const span = document.querySelector('#name-error');
    span.style.color = 'yellow';
    span.textContent = '  (only letters and space is allowed)'; 
    addMenuBtn.style.pointerEvents = 'none'
  }
  else {
    const span = document.querySelector('#name-error');
    span.textContent = '';
    addMenuBtn.style.pointerEvents = 'auto'
  }
  loader.style.display = 'none'; 
}

priceInput.onchange = () => {
  const validPrice = parseInt(priceInput.value, 10);
  if (
    isNaN(validPrice) || 
    isNaN(Number(priceInput.value)) || 
    !(parseInt(priceInput.value, 10) === validPrice)
  ) {
      const span = document.querySelector('#price-error');
      span.style.color = 'yellow';
      span.textContent = '  (price must be a number)'; 
      addMenuBtn.style.pointerEvents = 'none'
  }
  else {
    const span = document.querySelector('#price-error');
    span.textContent = '';
    addMenuBtn.style.pointerEvents = 'auto'
  }
  loader.style.display = 'none';
}

descInput.onkeypress = () => {
  const span = document.querySelector('#desc-error');
  if(descInput.value.length === 150) {
    span.style.color = 'yellow';
    span.textContent = 'max length reached'
  }
  loader.style.display = 'none';
}

descInput.onchange = () => {
  const span = document.querySelector('#desc-error');
  if(descInput.value.length < 150) {
    span.textContent = ''
  }
}