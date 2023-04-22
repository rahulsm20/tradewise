 //Table creation
 
 create table users(
 id serial primary key,
 username text unique,
 email varchar(255) unique,
 password varchar(128),
 );

 create table stocks(
 username text primary key,
 symbol char(5)[],
 foreign key (username) references users(username)
 );

 create table income_source(
 username text primary key,
 category text[],
 amount int[],
 foreign key (username) references users(username)
 );

 create table spending(
 username text primary key,
 category text[],
 amount int[],
 foreign key (username) references users(username)
 );

 create table debt(
 username text primary key,
 category text[],
 amount int[],
 foreign key (username) references users(username)
 );

 