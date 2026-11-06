---
name: ro-balancing
description: Balance and adjust skills, equipment, monsters and progression for an rAthena server with numbers - effective HP, time to kill, DPS, exp rate, before/after tables. Use when the user says "balance this class / skill / item / boss", "is this OP", "nerf / buff", "tune the difficulty", "why is X too strong or weak", or "compare these".
---

# ro-balancing

Balance is a design decision backed by arithmetic. Follow
[principles](../runewright-shared/principles.md). Output is a table and a
recommendation, never just an opinion.

## 1. Anchor on intent

Read the profile's purpose (PvP, PvE, community, ...). Ask what the experience
should feel like: how long should a fight last, how often should players die,
how fast should a level take. Without a target, numbers mean nothing.

## 2. Gather the real numbers

From the user's checkout, never from memory:

- Skill data (`db/` skill DBs and `db/import/`), skill damage ratios, cast,
  delay and cooldown, SP cost, and any formulas in `src/` for the skill.
- Item and mob stats from their databases.
- Global modifiers in `conf/battle/` and `conf/import/`.
- Renewal vs pre-renewal formulas differ; read the one the profile uses.

## 3. Model

Build a small, explicit model and show the assumptions:

- **Offense:** damage per hit x hits per second x uptime, with cast/delay.
- **Defense:** effective HP = HP / (1 - mitigation) under stated DEF/MDEF/
  resist assumptions.
- **Time to kill** both directions for representative matchups at target gear
  tiers.
- **Progression:** exp per hour for the planned hunting spots and rates.
- **PvP:** burst vs sustain, control duration vs cleanse, counterplay.

State the unknowns you could not read from the files and how sensitive the
result is to them.

## 4. Diagnose and propose

Compare against a baseline (stock behavior, other classes, other items of the
same tier). Identify the lever with the smallest side effects, in this order:
data value, config, then source change (L3, see `ro-source-modification`).
Offer 1 to 3 options with their effects, and recommend one.

## 5. Show before and after

Provide a table: metric, before, after, delta. Include second-order effects
(economy, other skills, PvP vs PvE split). Apply changes through `ro-db-edit`
and test with `ro-testing`. Record the decision and reasoning in the profile
notes so future balance passes know why.

## Rules

- Never change a number without showing the delta.
- Separate PvE and PvP effects when the server has both.
- Prefer small steps and re-measure.
