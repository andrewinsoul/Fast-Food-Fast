const menu = `
  create table if not exists menu (
    foodId serial primary key, 
    food varchar(350),
    price integer,
    userId int,
    foreign key(userId) references users(userId)
  )`;
export default menu;
