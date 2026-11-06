# Gotchas

Hard-won, generic lessons. Skills append here when they discover a repeatable
trap. Each entry: symptom, cause, fix. Verify against the user's version.

## Process

- **Stock files edited directly.** Upstream updates then conflict. Use
  `db/import/` and `npc/custom/` override paths.
- **Reload is not restart.** Some DB or policy changes need a map-server
  restart (for example removals). Check the relevant `@reload*` command and
  say which applies.
- **Server and client drift.** A server-side definition with no matching
  client entry (quest info, item description, signboard) shows blank or broken
  text in game. List every file in both trees before editing.

## Scripting

- **`completequest` before `erasequest`** on a repeatable quest can show an
  extra blank "quest was deleted" message. Use `erasequest` alone when the
  quest is immediately repeatable.
- **Subroutine arguments.** A value passed with `callsub Label, .@x` must be
  read with `getarg(0)` in the subroutine; otherwise it silently reads zero.
- **Colors and bracketed names.** Dialogue color codes (`^RRGGBB`) must be
  reset (`^000000`) or they bleed into later text.

## Client files

- **Encoding.** Legacy client Lua/lub/text files are often not UTF-8. Detect
  and preserve the encoding; do not "fix" it by re-saving as UTF-8.
- **Missing table entries.** Adding a server definition without the matching
  client table entry can produce nil-table Lua errors in the client.

## Environment

- **Line endings.** Mixed CRLF/LF in YAML or scripts causes subtle parse
  problems. Match the file's existing style.
- **Secrets in version control.** DB passwords, `char_athena`/`inter_athena`
  credentials and local connection settings stay out of commits.
