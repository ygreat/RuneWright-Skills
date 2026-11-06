---
name: ro-troubleshoot
description: Diagnose rAthena and RO client problems - servers not starting, database errors, script load errors, crashes, login failures, packet errors, missing sprites, build failures. Use when the user says "it's not working", "server won't start", "error in map server", "can't log in", "crash", "unknown packet", "blank text in client", or pastes a log.
---

# ro-troubleshoot

Find the cause, then fix the smallest thing. Follow
[principles](../runewright-shared/principles.md).

## 1. Reproduce and capture

Get the exact symptom, when it started, what changed (use `git log` and `git
diff`), and the first error line from the relevant log or console. The first
error matters more than the last. Identify the component: build, DB, login,
char, map, script, client, or network.

## 2. Triage table

| Symptom | Check first |
| --- | --- |
| Server exits at start | DB reachable, credentials in import conf, config typo, port in use |
| Build fails | Toolchain/workload, platform, stale build folder, packetver, recent source edit |
| Script parse error | Quote the file and line, then look for a missing semicolon, unbalanced brace, unknown command for this version, duplicate script name |
| "Item/mob/skill not found" warnings | ID not in DB, wrong file, wrong format, reload missing |
| Login rejected | Account missing/banned, client date vs packetver, `clientinfo.xml` address, server account credentials |
| "Unknown packet version" | Client date and server packetver differ; see [client-compat](../runewright-shared/client-compat.md) |
| Client text blank or Lua error | Missing client entry for a server ID, wrong encoding ([gotchas](../runewright-shared/gotchas.md)) |
| Lag or crash under load | Recent source change, runaway timer in a script, huge spawn counts |
| Works locally, not on VPS | Firewall/ports, bind address, public IP in config, case-sensitive paths on Linux |

## 3. Narrow down

Bisect: compare to the last known-good commit, disable the newest custom
script or DB entry, test with stock config in a scratch copy. Do not discard
working-tree changes to test; use a scratch copy or branch.

## 4. Fix and verify

State the cause in one sentence with evidence (log line, file:line). Apply the
smallest fix, then `ro-testing`. If the fix is a repeatable trap, add it to
[gotchas](../runewright-shared/gotchas.md) as a suggestion for the maintainers.

## 5. Escalate honestly

If the cause is not found, list what was ruled out, the next two tests, and
which upstream issue tracker or doc to check. Never present a guess as a
diagnosis.
