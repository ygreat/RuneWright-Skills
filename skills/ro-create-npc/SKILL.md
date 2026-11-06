---
name: ro-create-npc
description: Design and implement a custom NPC script for rAthena - intake, script, registration, reload, and test plan. Use when the user says "create an NPC", "add a shop / warper / quest giver / healer", "write dialogue for an NPC", "add an NPC to map X", or wants an NPC with a service, quest or story role.
---

# ro-create-npc

Turn an idea into a working, registered NPC. Follow
[principles](../runewright-shared/principles.md). Classify the request with
[feasibility](../runewright-shared/feasibility.md); a plain NPC is L1, but a
signboard, new sprite or custom portrait also touches L4 (client files).

## 1. Read the project

- `.runewright/profile.md`: dialogue style, locale, custom ID ranges.
- The checkout's `doc/script_commands.txt` and `npc/` for existing patterns
  (shops, warps, quests). Match the local conventions; command availability
  depends on the version.

## 2. Intake (ask once, skip what is known)

| Detail | Note |
| --- | --- |
| Name | Display name; also the unique script name |
| Map, X, Y, facing | Verify the map exists and the cell is walkable (check the map's data or ask) |
| Sprite | Name, constant or ID; help search the checkout's constants and client assets |
| Role / purpose | Service, quest, shop, flavor only. Dialogue-only is valid |
| Dialogue personality | Default to the NPC's role; ask only if unclear. User style overrides |
| Dialogue content | Required lines, lore, topics |
| Portrait (cutin) | Optional; needs a client image (L4) |

Offer a short request template the user can paste back. If the user does not
know a map or sprite, propose options from the local data and let them choose.

## 3. Write the script

- Put it under the custom NPC folder (for example `npc/custom/<area>/<name>.txt`)
  and register it in the custom scripts list the checkout uses
  (for example `npc/scripts_custom.conf`). Check the actual convention.
- Use the profile's dialogue style for every `mes` header; reset any color codes.
- Use unique script names and the profile's ID ranges for any quest or item IDs.
- Prefer existing constants over magic numbers. Keep labels descriptive.
- For rewards, check the item exists in the loaded DB; for shops, check prices
  against the economy intent.
- Keep the script readable: one NPC per file unless a set is intentionally
  linked.

## 4. Validate

Follow `ro-testing`: load in isolation, reload the script, check logs for
parse errors or missing IDs, then give a short in-game test plan (talk, every
menu branch, a failure path, repeat use).

## 5. Report

List the files created/changed (server and client), what was verified, what
the user must check in game, and any L4 step (signboard entry, portrait, sprite).
Then follow `ro-git` for the commit.

## Rules

- Never edit stock NPC files for custom content.
- Never invent item/mob/quest IDs; look them up or allocate from the reserved range.
- If the NPC needs a client change you cannot make, say it plainly and give
  the nearest script-only alternative.
