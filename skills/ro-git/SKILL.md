---
name: ro-git
description: Version-control discipline for RO server projects - focused commits, safe staging, what to keep out of git, and handling a rAthena checkout inside a workspace. Use when the user says "commit this", "set up git for my server", "what should I ignore", "update from upstream rAthena", or after any completed change.
---

# ro-git

Keep history clean and the repo safe to share. Follow
[principles](../runewright-shared/principles.md).

## Policy

Read `git.commit_policy` in `.runewright/profile.md`:

- `ask`: propose the commit message and files, wait for a yes.
- `after-each-change`: commit after each coherent, validated change.

Never push, amend, reset, rebase or force anything unless the user asks in
that moment. Approval for one commit does not cover a push.

## Before committing

1. `git status` and `git diff`. Understand every changed file.
2. Stage only files that belong to this task, by explicit path. Preserve
   unrelated edits and anything the user staged. Never discard work to get a
   clean tree.
3. Inspect the staged diff. Run `git diff --check`.
4. Confirm validation happened (`ro-testing`). If a check failed, fix
   task-related failures first; record unrelated existing failures in the
   commit body instead of claiming everything passed.

## Message

Short subject describing the resulting behavior ("Add Alchemist trainer NPC"),
not the mechanics. Body for material validation results or open problems. Add
any attribution trailer only if the user or their policy asks for one.

## Repository layout

Common arrangements; choose with the user and record it in the profile:

- **Workspace repo + nested rAthena repo.** Workspace tracks instructions,
  client overrides and tooling; the rAthena checkout is its own repo (a fork).
  A task touching both makes one commit in each; report both IDs.
- **Single fork repo.** Custom work lives in `npc/custom/`, `db/import/`,
  `conf/import/`, `src/custom/` inside the fork.

Use `git -C <path>` when targeting a specific repo.

## Keep out of git

Credentials and local connection settings, database data and dumps, built
binaries and DLLs, build output, logs, caches, save data, large vendor
archives (GRFs), and the `.runewright/` profile unless the user opts in.
Track editable sources, overrides and the tools that reproduce generated
assets. If something sensitive is already tracked, tell the user; do not
rewrite history without being asked.

## Upstream updates

For pulling in upstream rAthena changes: use a dedicated branch, merge or
rebase per the user's preference, resolve conflicts by keeping custom work in
override paths, rebuild, run `ro-testing`, then merge. Record the upstream
commit in the profile notes.
