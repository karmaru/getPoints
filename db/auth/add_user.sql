insert into users2
(name, password)
values (${name},${password})
returning name;