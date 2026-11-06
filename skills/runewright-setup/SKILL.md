---
name: runewright-setup
description: Configure Rune*Wright Skills for an existing rAthena project. Creates or updates the project profile (.runewright/profile.md) with mechanics, packetver, rates, caps, paths and conventions. Use when the user says "set up runewright", "configure the skills", "my preferences", "change my profile", or when another ro- skill finds no profile.
---

# runewright-setup

Create or update `.runewright/profile.md` so every other skill adapts to this
server. Follow [principles](../runewright-shared/principles.md) and the schema in
[profile-schema](../runewright-shared/profile-schema.md).

## When to use

- First time the collection is used in a workspace.
- The user wants to change preferences (dialogue style, commit policy, locale).
- Another skill reports a missing or inconsistent profile.

For a brand-new server with nothing installed yet, use `ro-create` instead; it
writes the profile as part of its flow.

## Steps

1. **Look first.** If `.runewright/profile.md` exists, read it and show a short
   summary. Ask what to change; do not re-ask what is already filled in.
2. **Discover, don't interrogate.** Find the rAthena checkout (look for
   `src/map`, `db/`, `npc/`, `conf/` and `rathena.sln` or `configure`). Read:
   - `PACKETVER` (search `src/config/`, `src/custom/`, `src/common/`).
   - Renewal vs pre-renewal (search `src/config/renewal.hpp` or the build flag).
   - Current rates in `conf/battle/exp.conf`, `conf/battle/drops.conf`
     and overrides in `conf/import/battle_conf.txt`.
   - Whether `.git` exists and which remotes, so `git.repos` is accurate.
   Report what you found with file paths, then confirm with the user.
3. **Ask only what you cannot read**, bundled in one message:
   - Server purpose (pvp, pve, community, economy, roleplay, mixed).
   - Mechanics intent if custom (what is renewal-like, what is classic).
   - Level and stat caps they want, and rates.
   - Dialogue style for NPCs (offer a few examples; it is their choice).
   - Custom ID ranges they reserve for items, mobs and quests.
   - Commit policy: ask each time, or commit after each completed change.
   - Reply and in-game text language (`locale`).
4. **Write the profile** using the schema. Never store passwords or keys.
5. **Show the result** and where it lives. Mention that `.runewright/` is
   git-ignored by default and the user can commit it if they want.
6. If an inconsistency exists (profile vs checkout), name it and ask which is
   correct before writing.

## Output

A readable `.runewright/profile.md`, plus a 3 line recap: what was set, what
was detected automatically, and which skills to try next (`runewright-explain`,
`ro-create-npc`, `ro-db-edit`).
