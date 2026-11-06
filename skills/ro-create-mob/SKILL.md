---
name: ro-create-mob
description: Design and implement a custom monster or boss for rAthena - role and stats, mob database entry, drops, skills/AI, spawns, client sprite. Use when the user says "create a monster", "add a boss / MVP / mini-boss", "new mob", "change where monsters spawn", or "design a hunting ground".
---

# ro-create-mob

Follow [principles](../runewright-shared/principles.md). Server data is L1;
a new sprite or animation is L4; new AI behavior beyond the mode flags and
mob skills may be L3. Check [feasibility](../runewright-shared/feasibility.md).

## 1. Read the project

Profile (mechanics, caps, custom mob ID range, purpose), `doc/mob_db.txt`,
`doc/mob_db_mode_list.txt`, `doc/mob_skill_db_powerskill.txt` if present, and
two or three stock mobs of the target level to calibrate. Formats differ by
version and by renewal vs pre-renewal; read the local files.

## 2. Intake

Role (grinder, elite, boss, event), target level range and map, race/element/
size, intended player count and party size, signature mechanic (what makes
the fight memorable), reward theme, respawn pacing, and art (existing sprite
or new).

## 3. Design before data

Use `ro-balancing`: pick HP, ATK, DEF, speeds and exp relative to stock mobs of
the same level. State expected time to kill for the intended player power and
the exp per hour implied. For bosses, define phases or skills and counterplay.

## 4. Implement

1. Allocate an ID in the reserved range; verify it is unused.
2. Add the mob to the mob DB import file; set the AEGIS name uniquely.
3. Drops: choose items by role, set rates relative to the profile's drop rates,
   and keep rare drops rare. Check every item exists. Mind the checkout's drop
   caps and MVP reward fields.
4. Skills/AI: use the mob skill DB import and mode flags that exist in the
   user's version; do not invent states.
5. Spawn: add the monster spawn in a custom NPC script file under the custom
   folder (registered like other scripts); set map, count and respawn timers.
   Check the map exists and has walkable space.
6. Sprite: the client needs the mob sprite and name table entries for the view
   ID. Hand off to `ro-client-files`, or reuse an existing sprite.

## 5. Validate and report

Reload mob DB and script, `@monster`/`@mobinfo`, kill it, inspect drops over a
sample (repeated kill test), and confirm the spawn on the real map. Report
numbers vs the comparison, files changed, client follow-up. Commit via
`ro-git`.
