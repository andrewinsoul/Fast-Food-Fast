/* eslint-disable max-len */
const cart = 'create table if not exists cart (orderId serial primary key, quantity int, price int, userId int, menuId int, foreign key(userId) references users(userId), foreign key(menuId) references menu)';
export default cart;
