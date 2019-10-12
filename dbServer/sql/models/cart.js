const cart = `
  create table if not exists cart (
    orderId serial primary key, 
    menuid int,
    status text default 'new',  
    userid int,
    quantity int,
    createdAt timestamp default NOW(),
    foreign key(menuId) references
    menu(foodId) on delete cascade on update cascade,
    foreign key(userId) references 
    users(userId) on delete cascade on update cascade
  )`;
export default cart;
