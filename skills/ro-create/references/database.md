# Database setup

Goal: a MariaDB/MySQL instance that survives restarts and holds the game
databases. Verify names and file lists in the user's checkout (`sql-files/`,
`conf/inter_athena.conf`) before running anything.

## Container (recommended)

Bind to localhost only and use a named volume so data persists:

```sh
docker run -d --name ro-db \
  -e MARIADB_ROOT_PASSWORD=<choose-a-strong-password> \
  -v ro-db-data:/var/lib/mysql \
  -p 127.0.0.1:3306:3306 \
  mariadb:lts
```

- Ask the user for a password or generate one; never commit it. Remind them
  where it is stored.
- Wait until the container reports it is ready: `docker logs ro-db` should show
  the server accepting connections.

## Create databases and a game user

Create the main and log databases and a dedicated user (do not run the game as
root). Use the database names the checkout's `conf/inter_athena.conf` expects,
or set your own through `conf/import/inter_conf.txt`.

## Import the schema

Import the SQL files from the checkout's `sql-files/` (the main schema and the
logs schema, plus any upgrade scripts the docs call for). On PowerShell, avoid
the `<` redirect; copy the file into the container and source it instead:

```sh
docker cp server/sql-files/main.sql ro-db:/tmp/main.sql
docker exec -i ro-db mariadb -uroot -p<password> <database> -e "source /tmp/main.sql"
```

## Point the servers at it

Write credentials to the git-ignored import config (for example
`conf/import/inter_conf.txt`): host `127.0.0.1`, port, user, password and
database names, for the login, char, map and log connections. Check the
checkout's `conf/` for the exact keys.

## Verify

Connect with the game user and list tables. Fail loudly if the main tables
(accounts, characters, inventory) are missing.

## Backups (teach early)

`docker exec ro-db mariadb-dump -uroot -p<password> --databases <db> > backup.sql`
and store backups outside the project folder.
