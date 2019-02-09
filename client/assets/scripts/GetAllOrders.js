let tableData;

function completeOrder(e) {
  const payload = {
    status: 'complete'
  }
  const parentElement = e.parentElement;
  const grandParentElement = parentElement.parentElement;
  const orderId = grandParentElement.getAttribute('orderId');
  const endpoint = `orders/${orderId}`;
  allOrders.put(endpoint, payload)
    .then((res) => {
      if (res.error) {
        console.error(res.error);
        return;
      }
      e.remove();
      const div = createElement('div');
      div.style.background = 'green';
      div.style.color = 'white';
      div.style.padding = '10px';
      div.style.display = 'inline-block';
      div.style.margin = '13px';
      div.innerHTML = '<small>Completed</small>';
      parentElement.appendChild(div);
    })
}

function acceptOrder(e) {
  const payload = {
    status: 'processing'
  }
  const parentElement = e.parentElement;
  const grandParentElement = parentElement.parentElement;
  const orderId = grandParentElement.getAttribute('orderId');
  const nextElementSibling = e.nextElementSibling;
  const endpoint = `orders/${orderId}`;
  allOrders.put(endpoint, payload)
    .then((res) => {
      if (res.error) {
        console.error(error);
        return;
      }
      e.remove();
      nextElementSibling.remove();
      const btnElement = createElement('button');
      btnElement.textContent = 'Complete Order';
      btnElement.onclick = 'completeOrder(this)';
      btnElement.style.background = 'rgb(160, 121, 23)';
      btnElement.style.color = 'white';
      btnElement.setAttribute('onclick', 'completeOrder(this)');
      parentElement.appendChild(btnElement);
    })
}

function declineOrder(e) {
  const payload = {
    status: 'cancelled'
  }
  const parentElement = e.parentElement;
  const grandParentElement = parentElement.parentElement;
  const orderId = grandParentElement.getAttribute('orderId');
  const previousElementSibling = e.previousElementSibling;
  const endpoint = `orders/${orderId}`;
  allOrders.put(endpoint, payload)
    .then((res) => {
      if (res.error) {
        console.error(error);
        return;
      }
      const previousElementSibling = e.previousElementSibling;
      e.remove();
      previousElementSibling.remove();
      const div = createElement('div');
      div.style.background = 'tomato';
      div.style.color = 'white';
      div.style.padding = '10px';
      div.style.margin = '13px';
      div.style.display = 'inline-block';
      div.innerHTML = '<small>Cancelled</small>';
      parentElement.appendChild(div);
    })
}
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
          tr.setAttribute('orderId', order.orderid);
          tr.setAttribute('status', order.status);
          if (tr.getAttribute('status') === 'new') {
            tableData = `
              <td data-holder="Action" class="action">
                <button onclick="acceptOrder(this)" class="accept-btn">
                  <i>Accept</i>
                </button>
                <button class="cancel-btn" onclick="declineOrder(this)">
                  <i>Cancel</i>
                </button>
              </td>
            `;
          }
          else if (tr.getAttribute('status') === 'processing') {
            tableData = `
              <td data-holder="Action" class="action">
                <button class="process-btn" onclick="completeOrder(this)">
                  Complete Order
                </button>
              </td>
            `
          }
          else if (tr.getAttribute('status') === 'cancelled') {
            tableData = `
              <td data-holder="Action" class="action">
                <div 
                  style="
                    background: tomato; 
                    color: white; 
                    padding: 10px; 
                    margin: 13px; 
                    display: inline-block;">
                  <small>Cancelled</small>
                </div>
              </td>
            `  
          }
          else {
            tableData = `
              <td data-holder="Action" class="action">
                <div
                  style="
                    background: green;
                    color: white;
                    padding: 10px;
                    display: inline-block;
                    margin: 13px;">
                  <small>Completed</small>
                </div>
              </td>
            `
          }
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
          `
          tr.innerHTML += tableData;
          tbody.appendChild(tr);
        })
      })
  }

  put(endpoint, payload) {
    const url = `${hostURL}/${endpoint}`
    return fetch(url, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.token
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
  }
}
const allOrders = new GetAllOrders();
allOrders.displayAllOrders();
