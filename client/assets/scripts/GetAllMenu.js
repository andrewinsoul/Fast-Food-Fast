class GetAllMenu {
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

  /**
  * @description - this function formats numerical value of price to use comma seperation and add the currency to the price
  * @param {string} price
  * @returns {string} 
  */
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

  displayMenu() {
    if (!this.token) {
      window.location.href = '../../login.html';
      return
    }
    const fetchMenu = this.fetchMenu();
    const container = document.querySelector('.container');
    fetchMenu
      .then((res) => {
        const menu = res.menuList;
        menu.forEach((menuItem) => {
          const parentNode = createNode('div', 'jumbotron');
          parentNode.innerHTML =  `
      
            <div>
              <h3>Name</h3>
              <span>${menuItem.food}</span>
            </div>
            <div>
              <h3>Category</h3>
              <span>${menuItem.category}</span>
            </div>
            <div>
              <h3>Price</h3>
              <span>${this.formatPrice(menuItem.price)}</span>
            </div>
            <div>
              <h3>Description</h3>
              <p class="wrap">${menuItem.description}</p>
            </div>
            <div class="space-item-in-flex">
              <div>
                <button onclick="openModal(this)" class="edit-btn">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="del-btn" onclick="openDelModal()">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
              <div>
                <button onclick="displayMenu(this)">
                  <i class="fa fa-caret-down"></i>
                </button>
              </div>
            </div>
          `
          container.appendChild(parentNode);
        })
      })
  }
}
const menu = new GetAllMenu();
menu.displayMenu();