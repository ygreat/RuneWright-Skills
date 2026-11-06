---
name: ro-create
description: Guided wizard that creates a new local Ragnarok Online server project with rAthena - interview, prerequisite check, database container, build, client setup, git, first boot, and a short dev-workflow tutorial. Use when the user says "create a new RO server", "start an RO project", "set up rAthena", "new private server", or is a newcomer with nothing installed yet.
---

# ro-create

Take a newcomer from nothing to a running local server, calmly and without
jargon. Windows first for local work. Follow
[principles](../runewright-shared/principles.md); this skill is staged, with a
checkpoint after every stage. Never skip ahead; never leave the user with a raw
stack trace; explain what each step does in one sentence.

## Stage 0: Interview (once, bundled)

Ask in one message, offering sensible defaults they can accept with "ok":

1. **Project name** and folder location.
2. **Purpose:** PvP, PvE, community, economy, roleplay, or mixed. Explain it
   shapes later advice (balance, rates, events), and can change later.
3. **Mechanics:** pre-renewal, renewal, classic-style (a pre-renewal base with
   chosen renewal pieces), or custom. If unsure, explain the tradeoff briefly.
   Mechanics are chosen at build time, so settle this now.
4. **Rates:** base exp, job exp, item drop, MVP drop, in percent (100 = 1x).
5. **Caps:** max base level, max job level, max stat.
6. **Client:** which client date / packetver they plan to use, or help them
   choose. See [client-compat](../runewright-shared/client-compat.md).
7. **Experience level** (newcomer or experienced) to set tutorial depth.

Summarize the answers as a plan and get confirmation before touching disk.

## Stage 1: Preflight

Check, and offer to fix or explain how to install: Git, a C++ toolchain
(Visual Studio Build Tools on Windows), Docker (or MariaDB/MySQL), Node if
needed. Details and commands: [prerequisites](references/prerequisites.md).
Report one clear line per tool: found, missing, or too old.

## Stage 2: Source

Clone rAthena (<https://github.com/rathena/rathena>) into `<project>/server/`
and record the commit. Initialize the workspace repo (see `ro-git`) and decide
with the user whether the server is a nested checkout or a fork.

## Stage 3: Database

Start MariaDB or MySQL in a container with a named volume, create the
databases and user, and import the SQL from the checkout's `sql-files/`.
Steps: [database](references/database.md). Keep credentials out of git; write
them only to the git-ignored import configs.

## Stage 4: Configure and build

Apply the interview answers through **import overrides**, not by editing stock
files (see [config](references/config.md)): rates, caps, packetver, mechanics.
Then build (see [build](references/build.md)). Renewal or pre-renewal is a
build-time choice; confirm it before compiling.

## Stage 5: Client

Help the user get a client matching their packetver. Recommend and, when
useful, read live the documentation of community tools:
[tooling](references/tooling.md) (WARPGATE, a GRF editor, a web control panel,
a patcher). Point `clientinfo.xml` at the server. Remind them the connection
file is not changed by those tools.

## Stage 6: First boot

Start login, char and map servers, watch for the ready messages, create a test
account, log in with the client. Troubleshooting for the common failures lives
in [first-boot](references/first-boot.md). Do not declare success until a
character is standing in a town.

## Stage 7: Handoff

- Write `.runewright/profile.md` via the schema in
  [profile-schema](../runewright-shared/profile-schema.md).
- Give a short tutorial of the RO dev loop: edit a script or DB import,
  reload (`@reloadscript`, `@reloaditemdb`, ...) or restart, test, commit.
  Match depth to the experience level.
- Suggest next steps: `ro-create-npc`, `ro-db-edit`, `runewright-explain`.

## Rules

- Work in the user's chosen folder only; never delete anything you did not
  create in this flow, and confirm before any destructive command.
- If a stage fails, stop, explain in plain words, propose one fix, then retry.
- Record every decision in the profile so later skills do not re-ask.
