# Feasibility: what is possible, and at what cost

Classify every request before designing it. Pick the **lowest** layer that can
do the job, and tell the user which layer you chose and why.

| Layer | What it covers | Risk | Needs |
| --- | --- | --- | --- |
| **L1 Script / data** | NPCs, quests, shops, events, items, mobs, spawns, drop tables, skill and status DB values, `db/import/` overrides | Low | Reload or restart |
| **L2 Config** | `conf/battle/*.conf`, rates, mapflags, atcommand permissions, login/char/map settings | Low | Reload or restart |
| **L3 Server source** | New script commands, new status changes, skill formulas and behavior, battle logic, new bonuses | Medium | Recompile, retest, merge cost on upstream updates |
| **L4 Client data** | `.lub`/`.lua` files, GRF contents, sprites, images, effects, client text, signboards, quest info shown in the client | Medium | Client files shipped to players (patcher or GRF) |
| **L5 Client binary / protocol** | New UI behavior the client does not implement, new packets, changed packet layouts, behavior fixed in the client executable | High | Client modification beyond this collection's scope |

## How to use it

1. State the layer in your first reply: "This is L1, scripts and DB only."
2. If it is **L5**, say so plainly, explain what the client cannot do, and offer
   the closest L1-L4 alternative that delivers the same player experience.
3. If it is **L3**, first check whether L1/L2 can do it. Source changes should
   be justified, minimal and isolated.
4. A feature may span layers (for example a quest: L1 server definition plus L4
   client quest text). List every layer it touches so nothing is left out of
   sync.
5. Check that the profile's `packetver` supports the feature. See
   [`client-compat.md`](client-compat.md).

## Common classifications

- Custom NPC with dialogue and rewards: L1.
- New item with an existing client sprite: L1 (+ L4 for item description text).
- New item with a new sprite or card illustration: L1 + L4.
- Changing a skill's damage formula: L3. Changing its cooldown or SP in the DB: L1.
- New status effect with a custom icon: L3 + L4 (and L5 if the icon has no
  existing status slot).
- A custom UI window the client does not provide: L5.
- Server-wide event with timed spawns and announcements: L1/L2.

This table is a starting point. Verify against the user's checkout and
packetver before promising anything.
