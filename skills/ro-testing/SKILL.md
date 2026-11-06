---
name: ro-testing
description: Validate rAthena changes before calling them done - isolated server start, script and DB reload checks, log reading, and a concrete in-game test plan. Use after any NPC, DB, config or source change, or when the user says "test this", "does it load", "check for errors", "validate", or "why won't the map server start".
---

# ro-testing

A change is done when it loads and behaves. Follow
[principles](../runewright-shared/principles.md). Report what was verified and
what was not; never imply a check you did not run.

## Static checks (no server)

- `git diff --check` for whitespace damage.
- Syntax sanity: YAML indentation, balanced braces/quotes in scripts, correct
  field counts in CSV-style files.
- Cross-references: every item, mob, skill, map, quest or label named exists.
  Search stock and import files.
- File encoding and line endings unchanged for existing files (see
  [gotchas](../runewright-shared/gotchas.md)).

## Load checks (server)

1. Confirm the DB container/service is running and the servers are built.
2. Start the map server in an isolated way so nothing else is affected. Check
   `map-server --help` for options such as a run-once flag that exits after
   initialization. If none exists, start it, wait for the ready message, then stop.
3. Read the console/log for: script parse errors, missing item/mob/map warnings,
   DB load errors, "unknown" warnings. Quote the first relevant line.
4. For live servers, prefer targeted reload commands (`@reloadscript`,
   `@reloaditemdb`, `@reloadmobdb`, ...), confirming each exists via
   `doc/atcommands.txt`, and say when a restart is required instead.

## Behavior checks (in game)

Write a numbered test plan the user can run in under five minutes:

1. Setup commands (warp to the map, spawn the item/mob, set level).
2. Happy path.
3. Each branch or menu option.
4. A failure path (not enough zeny, wrong job, full inventory, quest already done).
5. Repeat use and abandon/reset behavior.
6. Persistence: relog and confirm state.

## Report

- **Verified:** what you ran and the result.
- **Not verified:** what needs the user in game or a client.
- **Failures:** exact output, likely cause, proposed fix.

If anything fails, stop and fix before committing. If the failure predates your
change, say so clearly.

## Troubleshooting a server that won't start

Collect the first error, check DB connectivity and credentials, check the
config import files for typos, check for a missing map cache or data file, and
bisect recent changes (revert the last change in a scratch copy, not the
working tree).
