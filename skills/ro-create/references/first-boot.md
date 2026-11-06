# First boot

## Start order

Start `login-server`, then `char-server`, then `map-server`, each in its own
console. Watch for each server's "ready" / "listening" message. If the repo
documents a start script, use it.

## Create a test account

Use the account creation method the checkout supports (a client-side `_M`/`_F`
registration if enabled in the login config, or direct insertion through the
web panel / database). Explain the method chosen.

## Client connection

`clientinfo.xml` (or the client's equivalent) must point at the login server's
address and port. The client date must match the server's packetver. See
[client-compat](../../runewright-shared/client-compat.md).

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Servers exit immediately | Cannot reach the database | Check the container is running, host/port/user/password in the import conf |
| "Unknown packet version" disconnects | Client date and server packetver differ | Align the client or rebuild with the right packetver |
| Client cannot reach login | Wrong IP/port, firewall | Use `127.0.0.1` locally; allow the ports |
| Char server stuck at "connecting to login" | Inter-server user/password mismatch | Set the same server account credentials in login and char configs |
| Map server reports missing maps | No map cache for custom maps | Regenerate the map cache with the checkout's tool |
| Login works, world empty | Map server not connected to char | Check the map-server log for the connection message |

## Done means

A character stands in a town on the client, and the user can talk to an NPC.
Only then declare the server up.
