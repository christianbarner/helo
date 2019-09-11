insert into users
(is_admin, username, hash)
values
($1, $2, $3)
returning *
