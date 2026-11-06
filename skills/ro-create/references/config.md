# Applying the interview answers

Rule: **never edit stock `conf/` or `db/` files.** rAthena reads override files
in `conf/import/` and `db/import/` that win over stock values and survive
upstream updates. Confirm each file name and key in the user's checkout first.

| Answer | Where it goes | How to find the exact key |
| --- | --- | --- |
| Rates (base/job exp, drops, MVP) | `conf/import/battle_conf.txt` | Search `conf/battle/exp.conf` and `drops.conf` for the `*_rate` keys; exp rates are in percent |
| Level / job caps | Job database import (`db/import/` job and exp files) | See the job and exp database docs in `doc/`; cap changes may also need an exp table that reaches the new level |
| Max stat | `conf/import/battle_conf.txt` | Search `conf/battle/player.conf` for the max parameter keys |
| Server name, ports, addresses | `conf/import/*_conf.txt` for login/char/map | See the stock `conf/*_athena.conf` for key names |
| New accounts | `conf/import/login_conf.txt` | Search `conf/login_athena.conf` for account creation settings |
| Packetver | Build configuration | Search the source for the `PACKETVER` definition; changing it requires a rebuild |
| Pre-renewal vs renewal | Build configuration | Search the source/config for the renewal switch; a rebuild is required and databases differ between modes |

## Steps

1. Read the stock file, find the key, note its stock value.
2. Create or append to the import file with only the changed keys, with a
   comment saying why.
3. Record the change in `.runewright/profile.md`.
4. Some keys need a restart; reloadable ones have an `@reload*` command.

## Caution on caps

Raising level, stat or job caps touches databases, balance and client limits.
Warn the user that clients and some skills assume classic limits, and verify
against [feasibility](../../runewright-shared/feasibility.md) before promising
very high caps.
