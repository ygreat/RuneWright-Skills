---
name: ro-economy
description: Design and audit an rAthena server economy - zeny sources and sinks, drop values, shop prices, crafting, inflation, rarity tiers and event rewards. Use when the user says "design the economy", "is this reward too generous", "price this item", "zeny inflation", "what should this drop rate be", "add a zeny sink", or "audit drops / shops".
---

# ro-economy

Treat the economy as a flow system. Follow
[principles](../runewright-shared/principles.md). Output is a flow table and
concrete values, grounded in the user's data.

## 1. Anchor

Read the profile: purpose, rates, population expectations, trading rules, and
whether real-money trading or botting is a concern. Ask the intended
progression pace and what scarcity should feel like.

## 2. Map sources and sinks

From the checkout (item DB, mob DB drops, shop NPCs, quest rewards, event
scripts):

| Flow | Examples to inventory |
| --- | --- |
| Zeny sources | Monster zeny drops, NPC sell prices, quest/event rewards |
| Item sources | Drops, shops, crafting, quests, events, gacha-like systems |
| Sinks | NPC buy prices, repairs, refine costs, services, fees, consumables |

Estimate hourly zeny and item value per activity, and compare activities so no
single farm dominates. Use the server's drop rates and the NPC sell/buy
price rules in `conf/battle/` rather than assumptions.

## 3. Price and rate rules of thumb

- Rarity ladder: define tiers (common, uncommon, rare, epic, unique) with
  target drop rates and target time to obtain, then place items on it.
- Value follows usefulness and scarcity, not the price field alone.
- Anything sold to NPC at a fixed price sets a floor for that item; check for
  arbitrage loops (buy low from an NPC, sell high to another).
- A reward must be less valuable than the effort it asks for, or it will be
  farmed until the economy absorbs it.

## 4. Audit checklist

- Any item whose NPC sell value exceeds its effective source cost.
- Infinite loops: craft -> sell -> buy materials -> craft.
- Rewards that scale with player count or time without a cap.
- Rate multipliers applied to both drops and zeny.
- Missing sinks relative to sources, which means long-run inflation.

## 5. Output

A short model: sources, sinks, net flow per hour per activity, issues found,
and a ranked list of fixes (data value, shop, new sink, cap). Show before and
after values; apply via `ro-db-edit`; record decisions in the profile notes.
