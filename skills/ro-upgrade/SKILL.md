---
name: ro-upgrade
description: Safely update a customized rAthena server with upstream changes - plan, branch, merge or rebase, resolve conflicts, rebuild, migrate the database, retest. Use when the user says "update rAthena", "pull latest rathena", "merge upstream", "upgrade my server", "my fork is behind", or "new database version".
---

# ro-upgrade

Pull upstream improvements without losing custom work. Follow
[principles](../runewright-shared/principles.md) and `ro-git`. Never push or
rewrite history unless asked.

## 1. Assess

- Read the profile and `git status`; require a clean tree or commit/stash first.
- Identify the upstream remote and the current base commit.
- List customizations: files changed outside override paths (`db/import/`,
  `conf/import/`, `npc/custom/`, `src/custom/`). Those are the conflict risk.
- Read upstream's recent commits and release notes for breaking changes:
  database format changes, SQL upgrade scripts, renamed files, packetver
  defaults, config key changes. Summarize them for the user.

## 2. Plan

Choose with the user: merge (keeps history, simpler) or rebase (linear
history). Create a dedicated branch for the upgrade. Take a database backup
and a copy of the current build before starting.

## 3. Merge and resolve

1. Fetch upstream, merge/rebase onto the branch.
2. For each conflict: keep custom intent, adopt upstream structure. Move stray
   customizations into override paths where possible and note them.
3. Apply any SQL upgrade scripts in the order the docs state, on a **copy** of
   the database first.
4. Update import files for renamed or removed keys.

## 4. Rebuild and test

Rebuild with the profile's settings (packetver and renewal flags may need to
be re-applied). Run `ro-testing` on the whole server: startup, login, key
custom features, and a regression pass over critical systems. Test against the
database copy, not production.

## 5. Land it

Summarize what changed, what broke and how it was fixed, and the new upstream
commit. Merge the branch only after the user confirms. Record the upstream
commit and date in the profile notes. Remind the user to back up before
deploying and to follow `ro-deployplan` for live servers.
