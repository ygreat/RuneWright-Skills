# Source of truth order

When sources disagree, the higher one wins. State which one you used.

1. **The user's project profile** (`.runewright/profile.md`) and any local
   override the user documents. Custom projects may intentionally diverge from
   stock rAthena.
2. **The user's local rAthena checkout.** Its `doc/` folder (for example
   `script_commands.txt`, `item_db.txt`, `mob_db.txt`, `skill_db.txt`,
   `item_bonus.txt`, `mapflags.txt`, `atcommands.txt`, `packet_struct_notation.md`),
   its `db/` (including `db/import/`), `npc/`, `conf/` and `src/`.
   This matches the user's exact version, so prefer it over upstream.
3. **Upstream rAthena**: <https://github.com/rathena/rathena> (docs, commits,
   issues, wiki). Use it when the local checkout lacks the answer or to
   explain what changed between versions.
4. **Community tools and docs** (for example WARPGATE, GRF Editor, FluxCP).
   Read their current documentation live; do not rely on remembered details.
5. **Your own memory.** Last resort. Mark anything from here as unverified.

## Rules

- Quote or cite the file (and line when practical) behind every factual claim
  about IDs, constants, formulas, commands or file formats.
- Separate "stock rAthena does X" from "this project overrides it with Y".
- If the local checkout is missing or the version is unknown, ask the user for
  the path or the commit before answering version-sensitive questions.
- rAthena is GPL-3.0. Reference and briefly quote it; do not paste large
  portions of its docs or code into this repository.
