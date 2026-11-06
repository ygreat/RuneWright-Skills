---
name: runewright-explain
description: Explain how something works in rAthena or in the user's own project, with citations to the files read. Use for questions like "how does X work", "what does this script command do", "how is drop rate / reputation / a status calculated", "where is Y defined", "why does Z happen", or "can I do X in RO".
---

# runewright-explain

Answer from the source, not from memory. Follow
[principles](../runewright-shared/principles.md) and the
[truth order](../runewright-shared/truth-order.md).

## Steps

1. **Read the profile** (`.runewright/profile.md`) for mechanics, packetver and
   paths. If missing, locate the rAthena checkout and continue; suggest
   `runewright-setup` at the end.
2. **Find the system.** Search the checkout in this order, as relevant:
   - `doc/` for the documented behavior (script commands, DB formats, bonuses).
   - `db/` and `db/import/` for data and local overrides.
   - `conf/` and `conf/import/` for tunable settings.
   - `npc/` for script-level implementations (including custom folders).
   - `src/` for the engine behavior (formulas, handlers).
3. **Separate layers.** State what is stock rAthena behavior, what this project
   overrides, and what the client is responsible for.
4. **Explain** from the user's level: lead with the answer in one or two
   sentences, then the mechanism, then where to change it.
5. **Cite** each claim as `path:line` (or the file and symbol). Mark anything
   not verified in the local files as unverified.
6. **Classify possibility.** If the user is asking whether something can be
   done, use [feasibility](../runewright-shared/feasibility.md) and give the layer.
7. **Offer the next step**: the skill that would implement it (`ro-create-npc`,
   `ro-db-edit`, ...). Do not make changes during an explain request.

## Output shape

- **Short answer**
- **How it works** (with citations)
- **Where to change it** (layer and file)
- **Caveats** (version, packetver, client)

## Rules

- Read-only. Never edit files in this skill.
- If the checkout version is unknown or the code differs from upstream, say so
  and prefer the local code.
- If the answer is a design question ("should I..."), give a recommendation and
  the reasoning, not a survey.
