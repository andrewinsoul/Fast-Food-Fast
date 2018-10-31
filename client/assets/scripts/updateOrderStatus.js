let payload;
class UpdateOrderStatus {
  constructor() {
    this.token = localStorage.getItem('x-access-token');
  }

  fetchOrderStatus() {
    const endPoint = `${hostURL}/orders/:orderId`;
    // const endPoint = `${hostURL}/orders/1`;
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

  consoleStatus () {
   const status = this.fetchOrderStatus();
   status
    .then((res) => {
      console.log(res)
    })
  }
  
}
const update = new UpdateOrderStatus();
