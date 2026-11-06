---
name: ro-create-quest
description: Implement a custom rAthena quest end to end - server quest database entry, NPC script, rewards, repeat/abandon behavior, and client quest window text. Use when the user says "create a quest", "implement this quest design", "hunting quest", "delivery quest", "quest chain", or hands over a quest spec from ro-questdesign.
---

# ro-create-quest

Implements; it does not invent the design. If there is no spec, run
`ro-questdesign` (or ask for the premise, steps and rewards). Follow
[principles](../runewright-shared/principles.md). A quest is L1 on the server
and L4 on the client; keep both in sync
([gotchas](../runewright-shared/gotchas.md)).

## 1. Read the project

Profile (quest ID range, dialogue style, locale), `doc/quest_db.txt` and
`doc/script_commands.txt` for the quest commands in this version, existing
quest DB and `db/import/` for the format and used IDs.

## 2. Server side

1. Allocate a quest ID from the reserved range; prove it is unused.
2. Add the definition to the quest DB import file (title, targets/counts, time
   limit if any), in the format the user's version uses.
3. Write the NPC script (see `ro-create-npc` for intake and placement):
   accept (`setquest`), progress check (`checkquest`, including hunting
   progress), reward, and completion.
4. Choose the end behavior deliberately:
   - One-time: `completequest` after reward.
   - Immediately repeatable: `erasequest` only (using `completequest` first can
     show a blank "quest deleted" message).
   - Time-gated repeat: use the quest time limit or a stored timestamp.
5. Handle edge cases: inventory weight/slots before rewards, quest already
   active, requirements not met, abandoned quests, party/level restrictions.
6. Rewards must exist in the item DB and match the economy intent
   (`ro-economy`).

## 3. Client side (L4)

The client needs quest info (title, description, summary, icons) keyed by the
same ID, in the file the user's client build reads. The correct file and format
depend on the client; hand off to `ro-client-files` and preserve encoding.
A missing client entry can cause Lua errors on accept.

## 4. Validate and report

Follow `ro-testing`: load, accept, progress, report, reward, repeat, abandon,
relog. Report files on both sides, IDs used, and what remains unverified
in-client. Commit via `ro-git`.
