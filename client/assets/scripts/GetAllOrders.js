class GetAllOrders {
  constructor() {
    this.token = localStorage.getItem('x-access-token');
  }

  fetchAllOrders() {
    const endpoint = `${hostURL}/orders`;
    return fetch(endpoint, {
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

  displayAllOrders() {
    const token = localStorage.getItem('x-access-token');
    if (!token) {
      window.location.href = '../../login.html';
      return;
    }
    const fetchAllOrders = this.fetchAllOrders();
    const tbody = document.querySelector('tbody');
    const tr = createElement('tr');
    // const td = createNode('td');
    fetchAllOrders
      .then((res) => {
        const orders = res.allOrders;
        orders.forEach((order) => {
          let orderList = '';
          for (let k = 0; k < order.orders.length; k += 1) {
            orderList = orderList + `${order.orders[k].quantity} ${order.orders[k].food}, `
          }
          let orderArray = orderList.split('');
          orderArray.pop();
          orderArray.pop();
          orderList = orderArray.join('');
          const tr = createElement('tr');
          tr.innerHTML = `
            <td scope="row" data-holder="Name of Orderer">
              ${order.username}
            </td>
            <td data-holder="Orders">
              ${orderList};
            </td>
            <td data-holder="Address">
              ${order.address}
            </td>
            <td data-holder="Phon number">
              ${order.phone}
            </td>
            <td data-holder="Action" class="action">
              <button onclick="acceptOrder(this)" class="accept-btn">
                <i>Accept</i>
              </button>
              <button class="cancel-btn" onclick="declineOrder(this)">
                <i>Cancel</i>
              </button>
            </td>
          `
          tbody.appendChild(tr);
        })
      })
  }
}
const allOrders = new GetAllOrders();
allOrders.displayAllOrders();