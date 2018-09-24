/* eslint-disable max-len */
const cart = 'create table if not exists cart(orderId serial primary key, userId int, cart json [], foreign key(userId) references users(userId))';
export default cart;
