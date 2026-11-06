---
name: ro-client-files
description: Handle the client-side files that accompany server content in RO - item names and descriptions, quest text, signboards, sprites, images, GRF overrides, encoding and load order - matched to the user's client and packetver. Use when the user says "client files", "item shows blank", "add item description", "quest window empty", "add a sprite", "GRF", "lub / lua file", or after a server feature that needs client entries.
---

# ro-client-files

The server is half of every feature; the client is the other half (L4 in
[feasibility](../runewright-shared/feasibility.md)). Follow
[principles](../runewright-shared/principles.md) and
[client-compat](../runewright-shared/client-compat.md). The client's file
layout depends on its build, so discover it; do not assume.

## 1. Discover the client

Read the profile for client path, type and encoding. Inspect the client folder:
how resources are loaded (a data folder overriding archives, GRF load order in
the client's data configuration), which language/system folders exist, and
whether the client uses Lua, Lub or text tables for items, quests and
monsters. Note the packetver and build date.

## 2. Map the feature to files

| Server content | Typical client entries (verify per client) |
| --- | --- |
| Item | Name and description tables, resource name table, item info file, inventory/collection icon, equipment sprite and view ID |
| Monster | Sprite/actor files, name table entry for the view ID |
| Quest | Quest info file keyed by the quest ID |
| NPC | NPC sprite, optional portrait image, optional signboard entry |
| Map | Map files, name tables, minimap image |

For each, find an existing example in the user's client and copy its pattern.

## 3. Edit rules

- **Preserve encoding and line endings.** Detect the existing encoding first
  (legacy codepages and BOM are common) and write back in the same encoding.
  Never convert a file to UTF-8 "to fix" it.
- Prefer loose override files in the client's data folder over editing archives,
  so changes are visible in git and easy to ship. Edit GRF contents only with a
  proper tool, and keep a backup.
- Keep binary assets out of git unless the project decided to track them; track
  the source and the script that reproduces a build.
- Compiled client Lua (Lub) may need decompiling/compiling with a tool; do not
  hand-edit binary files.

## 4. Ship it

Changes reach players through the project's patch or GRF delivery method (a
patcher, a launcher, a manual zip). Name the shipping step for the user's
setup, and do not claim players have the change until it is shipped.

## 5. Verify

Launch the client, check the exact text, icon and sprite; test in game. Report
files changed, encoding preserved, and the ship step. If a feature would
need changes to the client executable, stop and report it as L5.
