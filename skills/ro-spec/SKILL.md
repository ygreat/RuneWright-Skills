---
name: ro-spec
description: Turn a game design idea into an implementation spec for an rAthena server - requirements, feasibility layers, files to touch, data, acceptance tests, risks. Use when the user says "write a spec", "plan this feature", "how would we build X", "break this down", or hands a design to be implemented across several skills.
---

# ro-spec

The bridge between design and engineering. Follow
[principles](../runewright-shared/principles.md). Produce a spec that other
skills can execute without re-asking.

## 1. Understand the idea

Restate the feature in two sentences and the player experience it creates.
Confirm. Read the profile for mechanics, packetver, conventions and ID ranges.

## 2. Classify

Use [feasibility](../runewright-shared/feasibility.md): list every layer the
feature touches (L1 to L5) and the lowest-risk way to deliver each part. If any
part is L5, say it first and offer a script-only alternative that keeps the
player experience.

## 3. Write the spec

```text
Feature / goal / player experience:
Scope (in) and non-goals (out):
Layers touched:
Data: DB entries, IDs (from reserved ranges), config keys
Scripts: NPCs, events, quests, timers
Source changes (L3): file, function, why it can't be data
Client changes (L4): files, assets, encoding notes
Dependencies and order of work:
Economy/balance impact (and who checks it):
Acceptance tests (numbered, observable):
Risks and rollback:
Implementation plan: which skill does which step
```

## 4. Route the work

Map each step to a skill: `ro-create-npc`, `ro-create-item`, `ro-create-mob`,
`ro-create-quest`, `ro-db-edit`, `ro-source-modification`, `ro-client-files`,
then `ro-testing` and `ro-git`. Order steps so each can be tested alone.

## 5. Deliver

Save the spec in the workspace (for example `docs/specs/<feature>.md`) so
later sessions and teammates can follow it. Flag open questions for the user
and do not start implementing until they approve.
