const cart = `
  create table if not exists cart (
    orderId serial primary key, 
    orders jsonb [], 
    status text default 'new',  
    userid int, 
    createdAt timestamptz,
    foreign key(userId) references 
    users(userId) on delete cascade on update cascade
  )`;
export default cart;
