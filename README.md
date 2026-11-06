# Rune*Wright Skills

**Agent skills for [rAthena](https://github.com/rathena/rathena) Ragnarok Online server development.**
A designer x engineer partner for RO server owners and developers: it thinks
like a game designer and solves problems like an engineer.

> Status: early preview (v0.0.x). The installer and the first seven skills exist; more ship
> incrementally. See the [roadmap](docs/ROADMAP.md).

Created by **Rune\*Wright Studio by ygreat**.

## What it is

A collection of focused skills for AI coding agents (Claude Code, Codex,
Cursor, Gemini CLI, Copilot and others). Each skill does one job, asks for the
details it needs once, checks your own rAthena checkout as the source of truth,
and tells you early what is and is not possible.

Design goals:

- **Project agnostic.** Skills adapt to your server through a project profile
  (mechanics, packetver, rates, caps, conventions).
- **rAthena docs are the source of truth.** Your local checkout first, upstream
  second. See [`truth-order.md`](skills/runewright-shared/truth-order.md).
- **Honest about limits.** Every request is classified by
  [feasibility layer](skills/runewright-shared/feasibility.md), from script-only to
  client-binary-only.
- **Friendly to newcomers.** `ro-create` takes you from nothing to a running
  local server with a short tutorial of the RO dev workflow.

## Install

> Not yet published to npm. Once it is:

```sh
npx @runewright/skills install
```

It will detect your agents and install the skills in the right place for each
(for example `.claude/skills/`, `.agents/skills/`), project-local or global.

## Skills

Planned categories (details in the [roadmap](docs/ROADMAP.md)):

| Category | Skills |
| --- | --- |
| Setup | `runewright-setup`, `ro-create`, `ro-upgrade`, `ro-troubleshoot` |
| Concepting | `ro-writing`, `ro-balancing`, `ro-economy`, `ro-questdesign`, `ro-spec` |
| Engineering | `runewright-explain`, `ro-create-npc`, `ro-create-item`, `ro-create-mob`, `ro-db-edit`, `ro-source-modification`, `ro-testing`, `ro-git` |
| Server | `ro-serverops`, `ro-deployplan` |

## Repository layout

```
bin/              the npx installer CLI
skills/           one folder per skill, each with a SKILL.md
  runewright-shared/   references every skill uses: principles, truth order,
                       profile schema, feasibility, client compatibility, gotchas
docs/             roadmap and project docs
```

## Platforms

Windows first for local development (client and tooling). Linux for
deployment and VPS setup. English is the primary language, with a translation
path for users who need it.

## Not affiliated

Rune*Wright Skills is an independent community project. It is not affiliated
with Gravity Co., Ltd., Lee Myoungjin, or the rAthena development team.
"Ragnarok Online" is a trademark of its respective owners.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 Rune\*Wright Studio by ygreat.

rAthena is licensed under GPL-3.0. This repository references it and does not
redistribute its code or documentation.
