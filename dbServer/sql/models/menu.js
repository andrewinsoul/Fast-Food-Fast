const menu = `
  create table if not exists menu (
    foodId serial primary key, 
    food varchar(350),
    price integer,
    description varchar(450),
    userId integer,
    foreign key(userId) references users(userId) 
    on delete cascade on update cascade
  )`;
export default menu;
