---
name: ro-serverops
description: Operate a running rAthena server - start/stop/restart, logs, backups, restores, monitoring, GM tools, reloads and routine maintenance, mainly on Linux VPS but also Windows. Use when the user says "restart the server", "backup the database", "check logs", "server is slow", "monitor", "maintenance window", "ban / GM commands", or "run this in production".
---

# ro-serverops

Day-to-day operation of a live server. Follow
[principles](../runewright-shared/principles.md). Anything that interrupts
players or changes live data needs the user's confirmation first.

## 1. Know the environment

Read the profile: platform, paths, service manager (systemd, Docker, scripts
or Windows services), database location, and where logs live. Ask when unknown.

## 2. Routine tasks

| Task | Guidance |
| --- | --- |
| Start order | Database, then login, char, map (and web if used). Stop in reverse |
| Restart | Announce in game first, wait, save, stop, start, then verify each server connects |
| Reload vs restart | Use targeted `@reload*` commands for DB/script changes when the version supports them; restart for source, packetver or removed policy entries |
| Logs | Rotate and cap them; tail the map server log during changes; keep a copy of the error when reporting |
| Backups | Scheduled dumps of game and log databases, stored off the server, plus config and custom folders in git. Test a restore regularly |
| Updates | Staging first (`ro-upgrade`), then production per `ro-deployplan` |
| Monitoring | Process up, port open, player count, DB connections, disk space, error rate in logs |
| Accounts/GM | Use the server's own permission and atcommand system; never share the database root login |

## 3. Safety rules

- Backup before any risky change. State where the backup is.
- Never run destructive SQL or file deletes on production without showing the
  exact statement and getting confirmation.
- Keep credentials in the host's secret storage or git-ignored configs.
- Make changes reversible: note the previous value or commit.

## 4. Incident flow

Stabilize (stop the bleeding, warn players), capture logs and the DB state,
identify the cause with `ro-troubleshoot`, fix on a copy, deploy, verify,
write a short post-incident note in the workspace.

## 5. Output

For each operation: the exact commands for the user's platform, what to
expect, how to verify success, and how to roll back.
