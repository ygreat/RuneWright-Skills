---
name: ro-db-edit
description: Safely add or change rAthena database entries (items, monsters, skills, quests, drops, jobs, exp) through import overrides, with ID checks, validation and reload. Use when the user says "add an item", "change a monster", "edit drops", "tweak a skill value", "add a quest to the DB", "edit item_db / mob_db / skill_db", or "change exp tables".
---

# ro-db-edit

Make database changes that are correct, reversible and upgrade-safe. Follow
[principles](../runewright-shared/principles.md). This is layer L1 (or L2) in
[feasibility](../runewright-shared/feasibility.md); if the request needs new
engine behavior, stop and route to source modification.

## 1. Locate and learn the format

- Identify which DB is involved and its format in the user's version: look at
  `db/` (stock) and `db/import/` (overrides), and the matching doc in `doc/`.
  Recent versions use YAML databases; older ones use text/CSV. Never assume.
- Read two or three existing entries as the pattern before writing a new one.

## 2. Write to the override, not the stock file

- Add or change entries in `db/import/<name>` (create it if absent). An entry
  in the import file overrides the same ID in the stock file.
- Keep a comment line per change explaining intent (who/what/why).

## 3. IDs

- Use the profile's reserved custom ID ranges. Search stock and import files
  to prove the ID is unused. Never reuse an ID that exists in the stock DB
  unless the intent is an explicit override.
- Item IDs often need matching client entries (names, descriptions, icons).
  That is L4: list what is needed and flag it.

## 4. Validate before declaring done

1. Check syntax (indentation and types for YAML, field count for CSV).
2. Check cross-references: an item used in a drop, shop or script exists;
   a mob used in a spawn or quest exists; a skill or status referenced exists.
3. Start the map server in isolation or use its reload (see `ro-testing`) and
   read the log for load errors and warnings.
4. Spot-check in game (`@iteminfo`, `@mobinfo`, `@monster`, `@item` where the
   atcommand exists in the version).

## 5. Reload

Prefer a live reload where available (for example `@reloaditemdb`,
`@reloadmobdb`, `@reloadskilldb`, `@reloadquestdb`), and say when a map-server
restart is required instead. Verify the command exists in the profile's
version via `doc/atcommands.txt`.

## 6. Balance awareness

Numbers have consequences: when changing stats, drops, prices or exp, state the
effect on progression or the economy. For anything beyond a single entry, hand
the numbers to the balancing/economy skills when they exist, and show before
and after values.

## 7. Report and commit

Summarize entries added/changed, their IDs, what was validated, and any client
follow-up. Then follow `ro-git`.
