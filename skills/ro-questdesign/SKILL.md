---
name: ro-questdesign
description: Design quests, quest chains, dailies and events for an RO server as a spec - premise, steps, pacing, rewards, failure states, client needs - ready for implementation. Use when the user says "design a quest", "quest chain idea", "daily quests", "event design", "what makes a good quest", or needs a quest brief before building.
---

# ro-questdesign

Design first, then hand a spec to `ro-create-quest`. Follow
[principles](../runewright-shared/principles.md). Pair with `ro-writing` for
story and `ro-economy` for rewards.

## 1. Anchor

Read the profile (purpose, level range, lore notes). Ask: who is this for
(newbie, mid-game, endgame), what should they learn or feel, how long should
it take, is it one-time, repeatable or seasonal.

## 2. Structure

Every quest needs:

- **Hook:** why the player cares in one line.
- **Goal:** a clear, checkable objective the quest window can show.
- **Friction:** something that makes it interesting (a choice, a risk, a place
  to discover), not just a count.
- **Payoff:** reward plus a story beat; the reward fits the economy.
- **Exit:** completion, repeat or abandon behavior.

## 3. Pick the shape

Hunting, delivery, escort-like (script-limited), investigation (multi-NPC
clues), dungeon run, party objective, timed event, choice-and-consequence
(branching flags). Match the shape to what the engine and client support
(see [feasibility](../runewright-shared/feasibility.md)); say early what is not
possible in plain scripts.

## 4. Pace

Define the step list, travel between steps, expected time, level gating, and
the reward per minute compared to normal hunting. Avoid backtracking padding.
For chains, design the whole arc then each node.

## 5. Output: the quest spec

```text
Title / ID range:
Audience and level:
Premise (2 lines):
Steps (NPC, map, action, completion check):
Targets/counts:
Rewards (items with IDs, exp, zeny) and economy note:
Failure/abandon/repeat rules:
Dialogue notes (speaker, tone):
Client needs (quest text, icons, sprites):
Open questions:
```

Confirm with the user, then implement through `ro-create-quest`.
