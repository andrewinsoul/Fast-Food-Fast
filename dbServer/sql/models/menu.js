/* eslint-disable max-len */
const menu = 'create table if not exists menu (menuId serial primary key, food varchar(350), price int, userId int, foreign key(userId) references users(userId))';
export default menu;
