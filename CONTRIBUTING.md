# Contributing

Thanks for helping make RO server development easier.

## Writing a skill

1. Create `skills/<name>/SKILL.md`. Use the `ro-` prefix (`runewright-` only for
   skills about the collection itself).
2. Front matter:
   ```yaml
   ---
   name: ro-example
   description: One or two sentences on what it does and when to trigger it.
   ---
   ```
   Make the description trigger-rich: list the phrases a user would say.
3. Reference shared files as `../runewright-shared/<file>.md` (valid in this repo and after install). Keep `SKILL.md` short. Put long material in `skills/<name>/references/` and
   link it so the agent loads it on demand.
4. Start by reading `.runewright/profile.md`, and follow
   [principles](skills/runewright-shared/principles.md) and the files in [`skills/runewright-shared/`](skills/runewright-shared/).
5. Classify the request with [`runewright-shared/feasibility.md`](skills/runewright-shared/feasibility.md)
   and cite the files you read ([`runewright-shared/truth-order.md`](skills/runewright-shared/truth-order.md)).
6. Add repeatable traps to [`runewright-shared/gotchas.md`](skills/runewright-shared/gotchas.md).

## Ground rules

- **Project agnostic.** No references to specific private servers, clients or
  assets. Server-specific preferences belong in the user's profile.
- **No copied rAthena content.** rAthena is GPL-3.0; link and briefly quote only.
- **Verified facts only.** Unverified claims must be labeled as such.
- **One job per skill.** If it does two things, split it.

## Commits and PRs

- Small, focused commits with messages describing the resulting behavior.
- Do not rewrite shared history.
- Describe what you verified in the PR.

## Releasing (maintainers)

Pushing to `main` updates GitHub only. npm (including the README shown on its
page) changes only when a new version is published, and a version number can
never be reused. Publishing is automated by
[`.github/workflows/publish.yml`](.github/workflows/publish.yml):

1. Make sure `main` is green and the README is current.
2. Bump the version: `npm version 0.1.0 --no-git-tag-version`, commit it.
3. Tag and push: `git tag v0.1.0 && git push origin main --tags`.
4. The workflow checks the tag matches `package.json`, smoke-tests the CLI,
   and publishes with provenance. Tags containing a dash (`v0.2.0-beta.1`)
   publish under the `next` dist-tag instead of `latest`.

One-time setup: add an npm automation token as the repository secret
`NPM_TOKEN` (GitHub repo -> Settings -> Secrets and variables -> Actions).
