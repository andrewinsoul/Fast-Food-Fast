/* eslint-disable max-len */
const user = 'create table if not exists users(userId serial primary key, name varchar(350), username varchar(340) unique, Password varchar(340), email varchar(300) unique, address varchar(400), role varchar(60))';
export default user;
