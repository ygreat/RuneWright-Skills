---
name: ro-source-modification
description: Modify rAthena C++ server source safely - justify the change, isolate custom code, compile, test, and keep upstream merges possible. Use when the user says "change the source", "new script command", "new status effect", "change skill formula", "add a battle config option", "recompile with my change", or when data and config cannot do the job.
---

# ro-source-modification

Source changes are the highest-risk server change (L3 in
[feasibility](../runewright-shared/feasibility.md)). Follow
[principles](../runewright-shared/principles.md).

## 1. Prove it is necessary

Before touching `src/`, show that L1 (data/script) and L2 (config) cannot
deliver the behavior. If they can, redirect to `ro-db-edit` or the NPC skills.
If the request needs the client to behave differently, check whether it is L5
and say so now.

## 2. Understand the code

Read the relevant functions and their callers in the user's checkout
(`src/map/`, `src/common/`, `src/char/`, `src/login/`). Find an existing
analogous feature and follow its pattern. Check `doc/` for developer notes.
Cite `file:line` for what you found.

## 3. Isolate custom code

- Prefer the checkout's custom hooks (the `src/custom/` folder and its
  defines/script/battle config files, if present in this version) over editing
  core functions.
- Keep each change small, commented with the reason, and marked so upstream
  merges can find it (for example a `// CUSTOM:` comment convention agreed with
  the user and recorded in the profile).
- Add new options as battle config entries when they are tunables, with a
  documented default that preserves stock behavior.
- Do not reformat unrelated code.

## 4. Build and test

1. Build per the profile's platform (see the `ro-create` build reference).
2. Run `ro-testing`: server starts, affected feature works, a regression pass
   on nearby features, and a log check.
3. Test failure paths and edge values (zero, max, negative, null targets).
4. Watch for packetver gating: some features depend on packet definitions.

## 5. Risk notes

State what the change could break (balance, saves, other skills, PvP/WoE),
whether it affects data stored in the database (migrations needed), and what
the merge cost with upstream will be. Provide a rollback (a single commit).

## 6. Commit

One logical change per commit via `ro-git`, with a message describing the
behavior and the reason source was required.
