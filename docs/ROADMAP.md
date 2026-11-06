# Roadmap

All skills below exist in `skills/` as **drafts**. They are written from the rAthena docs and general knowledge and have not yet been validated against a live checkout; each skill tells the agent to verify file names, keys and commands locally. Testing feedback drives the next releases.

## Draft skills

| Category | Skills |
| --- | --- |
| Setup | `runewright-setup`, `ro-create`, `ro-upgrade`, `ro-troubleshoot` |
| Concepting | `ro-writing`, `ro-balancing`, `ro-economy`, `ro-questdesign`, `ro-spec` |
| Engineering | `runewright-explain`, `ro-create-npc`, `ro-create-item`, `ro-create-mob`, `ro-create-quest`, `ro-db-edit`, `ro-source-modification`, `ro-client-files`, `ro-testing`, `ro-git` |
| Server | `ro-serverops`, `ro-deployplan` |

## Next

- Real-world test passes per skill; fix wrong file names and keys.
- Verified-version notes in `runewright-shared` (which rAthena commit each reference was checked against).
- Publish `@runewright/skills` to npm.
- Claude Code plugin packaging; confirm each agent adapter path in the CLI.
- Ideas: `ro-events`, `ro-map-design`, `ro-pvp-woe`, `ro-localization`.
