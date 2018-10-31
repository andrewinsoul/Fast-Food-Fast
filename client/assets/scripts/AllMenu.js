const checkout = () => {
  const cartItems = document.querySelectorAll('.price-div');
  let total = 0;
  for (let i = 0; i < cartItems.length; i += 1) {
    total += Number(unformatPrice(cartItems[i].textContent));
  }
  return formatPrice(total);
}

function addRemoveQty(e) {
  const checkoutBtn = document.querySelector('#place-order');
  const parentNextSibling = e.parentElement.nextElementSibling;
  let foodPrice = Number(unformatPrice(e.parentElement.nextElementSibling.textContent));
  let sibling;
  if (e.className === 'add-plate-btn fa fa-caret-up') {
    sibling = e.nextElementSibling;
    const value = Number(sibling.innerHTML);
    sibling.innerHTML = value + 1;
    let initialPrice = foodPrice / (Number(sibling.innerText) - 1)
    parentNextSibling.textContent = formatPrice(initialPrice * Number(sibling.innerText));
  }
  else {
    const parentNextSibling = e.parentElement.nextElementSibling;
    sibling = e.previousElementSibling;
    const value = Number(sibling.innerHTML);
    if (value == 1) {
      sibling.innerHTML = 1;
    }
      else {
      sibling.innerHTML = value - 1;
      let initialPrice = foodPrice / (Number(sibling.innerText) + 1);
      parentNextSibling.textContent = formatPrice(foodPrice - initialPrice);
    }
  }
  let myOrders = localStorage.getItem('orders');
  myOrders = JSON.parse(myOrders)
  const greatGrand = e.parentElement.parentElement.parentElement;
  const findId = myOrders.find(order => order.foodId === Number(greatGrand.getAttribute('menuid')))
  findId.quantity = Number(sibling.textContent);
  localStorage.setItem('orders', JSON.stringify(myOrders));
  
  localStorage.setItem('total', Number(unformatPrice(checkout())));
  
  console.log(localStorage.getItem('total'));
  checkoutBtn.textContent = checkout();
}

function addRemoveFood(e) {
  const cartSection = document.querySelector('#cart');
  const cartSectionFirstChild = cartSection.children[0];
  const checkoutBtn = document.querySelector('button#place-order');
  if (e.className === 'pad-right add-item-btn') {
    const FoodDiv = e.parentElement.parentElement;
    const FoodDivSibling = FoodDiv.previousElementSibling;
    const mainElement = FoodDiv.parentElement.parentElement;
    const foodId = Number(mainElement.getAttribute('menuid'));
    e.style.display = 'none';
    const sibling = e.nextElementSibling;
    sibling.style.display = 'inline-block';
    const cartFoodDiv = createElement('div');
    cartFoodDiv.setAttribute('data-foodName', FoodDivSibling.children[0].textContent);
    cartFoodDiv.setAttribute('menuId', foodId);
    cartFoodDiv.className = 'bottom-line';
    cartFoodDiv.innerHTML = `
    
      <div class="flexblock">
        <div class="sn">${cartSectionFirstChild.childElementCount-=1}</div>
        <div class="food-item-name">${FoodDivSibling.children[0].textContent}</div>
      </div>
      <div class="and-div">
        <div>
          <button class="add-plate-btn fa fa-caret-up" onclick="addRemoveQty(this)">
          </button>
          <span>1</span>
          <button onclick="addRemoveQty(this)" class="add-plate-btn fa fa-caret-down">
          </button>
        </div>
        <div class="price-div">${FoodDivSibling.children[1].textContent}</div>
      </div>
    
    `;
    cartSectionFirstChild.insertBefore(cartFoodDiv, checkoutBtn);
    let orderExist = localStorage.getItem('orders');
    let totalExist = Number(localStorage.getItem('total'));
    const menuDiv = e.parentElement.parentElement.parentElement.parentElement;
    const menuId = menuDiv.getAttribute('menuid');
    let menuIds = localStorage.getItem('menu-ids');
    if (orderExist) {
      orderExist = JSON.parse(orderExist);
      orderExist.push({
        foodId: foodId,
        foodName: FoodDivSibling.children[0].textContent,
        quantity: 1,
        price: FoodDivSibling.children[1].textContent
      });
      totalExist += Number(unformatPrice(FoodDivSibling.children[1].textContent));
      menuIds = JSON.parse(menuIds);
      menuIds.push(menuId);
    }
    else{
      orderExist = [];
      totalExist = 0;
      menuIds = [];
      orderExist.push({
        foodId: foodId,
        foodName: FoodDivSibling.children[0].textContent,
        quantity: 1,
        price: FoodDivSibling.children[1].textContent
      });
      totalExist += Number(unformatPrice(FoodDivSibling.children[1].textContent));
      menuIds.push(menuId);
    }
    localStorage.setItem('orders', JSON.stringify(orderExist));
    localStorage.setItem('menu-ids', JSON.stringify(menuIds));
    localStorage.setItem('total', totalExist);
  }
  else {
    const mainElement = e.parentElement.parentElement.parentElement.parentElement;
    const menuId = mainElement.getAttribute('menuid');
    e.style.display = 'none';
    const sibling = e.previousElementSibling;
    sibling.style.display = 'inline-block';
    const cartArray = cartSectionFirstChild.children;
    for (let i = 1; i < cartArray.length-1; i += 1) {
      if (cartArray[i].getAttribute('menuid') === menuId) {
        const ItemPrice = Number(unformatPrice(cartArray[i].lastElementChild.lastElementChild.textContent));
        cartSectionFirstChild.removeChild(cartArray[i]);
        resetIndex();
        let allOrders = localStorage.getItem('orders');
        let menuIds = localStorage.getItem('menu-ids');
        allOrders = JSON.parse(allOrders);
        menuIds = JSON.parse(menuIds);
        const menuIdIndex = menuIds.findIndex(oneMenuId => oneMenuId === menuId );
        const anOrderIndex = allOrders.findIndex(order => order.foodId === Number(menuId));
        allOrders.splice(anOrderIndex, 1);
        menuIds.splice(menuIdIndex, 1);
        localStorage.setItem('orders', JSON.stringify(allOrders));
        localStorage.setItem('menu-ids', JSON.stringify(menuIds));
        const total = Number(localStorage.getItem('total'));
        const remainder = total - ItemPrice;
        localStorage.setItem('total', remainder);
        break;
      }
    }
  }
  checkoutBtn.textContent = checkout();
}

class getAvailableMenu {
  constructor() {
    this.token = localStorage.getItem('x-access-token');
  }

  fetchMenu() {
    const endPoint = `${hostURL}/menu`;
    return fetch(endPoint, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Cache-Control": "no-cache, must-revalidate",
        Expires: "Sat, 26 Jul 1997 05:00:00 GMT",
        'x-access-token': this.token
      }
    })
      .then(res => res.json())
      .catch(error => console.error(error));
  }

  formatPrice(price) {
    let amt = String(price), amtArray = amt.split(""), index = amtArray.length - 1, i = 0;
    while (index != -1) {
      i++;
      if (i == 3) {
        i = 0;
        amtArray.splice(index, 0, ",");
      }
      index--;
    }
    if (amt.length % 3 == 0) {
      amtArray.shift();
    }
    amtArray.splice(0, 0, '₦');
    return amtArray.join("");
  }

  displayMenuForUser() {
    let menu;
    this.fetchMenu()
      .then((res) => {
        const menuSection = document.querySelector('#menu-items');
        res.menuList.forEach((item) => {
          const div = createElement('div');
          div.className = 'menu-row';
          div.setAttribute('menuId', item.foodid);

          div.innerHTML = `
            <div class="bottom-line">
            <div class="space-item-in-flex">
              <p class="pad-left pad-right" >${item.food}</p>
              <p class="pad-left pad-right" >${this.formatPrice(item.price)}</p>
            </div>
            <div class="space-item-in-flex">
              <p class="pad-left pad-right no-marg-top"><small>${item.description}</small></p>
              <div class="pad-right">
                <button class="pad-right add-item-btn" onclick="addRemoveFood(this)">
                  <img src="./assets/images/add-img.png"/>
                </button>
                <button onclick="addRemoveFood(this)" class="pad-right remove-item-btn">
                  <img src="./assets/images/remove-img.png"/>
                </button>
              </div>
            </div>
          </div>
          `
          menuSection.append(div);
        });
      })
  }

  LoadFromLocalStorage() {
    const cartSection = document.querySelector('#cart');
    const cartSectionFirstChild = cartSection.children[0];
    const checkoutBtn = document.querySelector('button#place-order');
    const elementCount = cartSectionFirstChild.childElementCount - 1;
    let cart = localStorage.getItem('orders');
    let total = localStorage.getItem('total');
    const menuItems = document.querySelector('#menu-items');
    cart = JSON.parse(cart);
    const selectMenuIds = JSON.parse(localStorage.getItem('menu-ids'));
    for (let i = 1; i < menuItems.children.length; i += 1) {
      const menuId = menuItems.children[i].getAttribute('menuid');
      const menuAdded = selectMenuIds.find(id => menuId == id);
      if (menuAdded) {
        const lastChild = menuItems.children[i].lastElementChild;
        const buttonsDiv = lastChild.lastElementChild.lastElementChild;
        buttonsDiv.children[0].style.display = 'none';
        buttonsDiv.children[1].style.display = 'inline-block';
      }
      
    }
    cart.forEach((order, index) => {
      const cartFoodDiv = createElement('div');
      cartFoodDiv.setAttribute('data-foodName', order.foodName);
      cartFoodDiv.setAttribute('menuId', order.foodId);
      cartFoodDiv.className = 'bottom-line';
      cartFoodDiv.innerHTML = `
        <div class="flexblock">
          <div class="sn">${index + 1}</div>
          <div class="food-item-name">${order.foodName}</div>
        </div>
        <div class="and-div">
          <div>
            <button class="add-plate-btn fa fa-caret-up" onclick="addRemoveQty(this)">
            </button>
            <span>1</span>
            <button onclick="addRemoveQty(this)" class="add-plate-btn fa fa-caret-down">
            </button>
          </div>
          <div class="price-div">${order.price}</div>
        </div>`
      cartSectionFirstChild.insertBefore(cartFoodDiv, checkoutBtn);
      checkoutBtn.textContent = this.formatPrice(total);
    })
  }
}
const allMenu = new getAvailableMenu();
allMenu.displayMenuForUser();
allMenu.LoadFromLocalStorage();