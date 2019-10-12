const user = `
  create table if not exists users(
    userId serial primary key, 
    username varchar(340) unique, 
    email varchar(300) unique, 
    address varchar(400), 
    Password varchar(340), 
    phone varchar(53), 
    createdAt timestamp default NOW(),
    user_role boolean default false
  )`;
export default user;
