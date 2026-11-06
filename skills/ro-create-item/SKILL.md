---
name: ro-create-item
description: Design and implement a custom item for rAthena - concept and stats, ID allocation, database entry, item script, sources (drop/shop/quest), client files, validation. Use when the user says "create an item", "new weapon / armor / card / consumable / headgear / costume", "add an item with a bonus", or "make a custom reward item".
---

# ro-create-item

Follow [principles](../runewright-shared/principles.md). Items span layers:
server data (L1) plus client name, description and sprite (L4). Classify with
[feasibility](../runewright-shared/feasibility.md) first; a bonus the engine
does not support is L3.

## 1. Read the project

- `.runewright/profile.md`: mechanics, custom item ID range, locale, caps.
- `doc/item_db.txt` and `doc/item_bonus.txt` in the checkout for the fields and
  the bonus list of the user's version. Look at similar stock items.

## 2. Intake (ask once)

Role and fantasy (what is it for, who wants it), type (weapon, armor, card,
consumable, etc.), slot/equip location, job/level restrictions, desired
effect in plain words, rarity and how players obtain it (drop, shop, quest,
craft, event), tradeability, and any art (existing sprite or new).

## 3. Design before data

Translate the effect to numbers with `ro-balancing` and `ro-economy` thinking:
compare against two or three comparable stock items at the same level, state
the intended power tier, and name the trade-off that keeps it from being
strictly best. Show the user the comparison table before writing.

## 4. Implement

1. Allocate an ID from the reserved range; prove it is unused in stock and
   import files.
2. Add the entry to the item DB import file (`db/import/`), matching the format
   in the user's version. Keep weight, price and flags realistic.
3. Write the item script using bonuses that exist in `doc/item_bonus.txt`
   for this version. Do not invent bonus names.
4. Wire the source: drop (via `ro-create-mob` or the mob DB), shop price,
   quest reward, or script reward. An item with no source is dead content; say
   where players get it.

## 5. Client files (L4)

List what the client needs and hand off to `ro-client-files`: display name,
description, resource name (inventory/collection sprite), and for equipment
the view ID and sprite. The client file set depends on the packetver and
client build; check [client-compat](../runewright-shared/client-compat.md).
If the art does not exist, say so and suggest an existing sprite as a stand-in.

## 6. Validate and report

Reload the item DB (see `ro-testing`), spawn with `@item`, check
`@iteminfo`, equip/use it, confirm the bonus applies and persists after
relog. Report files changed, the comparison table, the source, and the client
follow-ups. Commit via `ro-git`.
