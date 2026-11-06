# Roadmap

Status: `planned` until a skill ships in `skills/`.

## v0.1: vertical slice

| Skill | Category | Purpose |
| --- | --- | --- |
| `runewright-setup` | Setup | Install the collection, write the project profile, set preferences |
| `ro-create` | Setup | Guided new-project wizard: prerequisites, DB, build, client, first boot, tutorial |
| `runewright-explain` | Engineering | Explain how something works in rAthena or in this project, with citations |
| `ro-create-npc` | Engineering | Intake, script, validate, and reload an NPC |
| `ro-db-edit` | Engineering | Safe edits to item/mob/skill/quest DBs via import overrides |
| `ro-git` | Engineering | Focused commits, safe staging, no history rewrites |
| `ro-testing` | Engineering | Isolated server startup, reload, log check, in-game test plan |

Plus: shared references, `@runewright/skills` CLI (`install`, `list`, `update`, `doctor`).

## Later

**Setup:** `ro-upgrade` (merge upstream rAthena into a customized fork), `ro-troubleshoot`.

**Concepting:** `ro-writing`, `ro-balancing`, `ro-economy`, `ro-questdesign`, `ro-spec` (design-to-engineering handoff).

**Engineering:** `ro-create-item`, `ro-create-mob`, `ro-create-quest`, `ro-source-modification`, `ro-client-files`.

**Server:** `ro-serverops`, `ro-deployplan` (Linux VPS focus: systemd/Docker, MariaDB, firewall, backups).

**Distribution:** Claude Code plugin, adapters for Codex, Cursor, Gemini CLI, Copilot.
