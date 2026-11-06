# Project profile schema

`/runewright-setup` and `/ro-create` write `.runewright/profile.md` in the
user's workspace root. Every skill reads it first. It is plain Markdown with a
YAML front matter block so humans can edit it.

```markdown
---
schema: 1
project_name: "My Server"
purpose: pvp | pve | community | economy | roleplay | mixed
mechanics: prerenewal | renewal | classic | custom   # pick one, describe custom below
packetver: 20220406          # client date the server is built for (YYYYMMDD)
client:
  type: main | ragexe | zero | custom
  path: "<client folder>"
  encoding: "<legacy codepage, if relevant>"
rates:
  base_exp: 100              # in percent, 100 = 1x
  job_exp: 100
  item_drop: 100
  mvp_drop: 100
caps:
  base_level: 99
  job_level: 50
  stat: 99
paths:
  server: "<rathena checkout>"
  db: "<database data/containers>"
  workspace: "<project root>"
conventions:
  dialogue_style: "^0000ff[Name]^000000"   # example; set by user
  npc_id_range: "<optional>"
  custom_id_ranges:
    items: "<start-end>"
    mobs: "<start-end>"
    quests: "<start-end>"
git:
  commit_policy: ask | after-each-change
  repos: ["<paths of repos the agent may commit to>"]
locale: en                    # language for replies and in-game text
---

# Notes
Free-form design notes, lore pillars, balance targets, anything skills should
know. Skills may append dated decisions here when the user agrees to them.
```

## Rules for skills

- Missing field: ask once, then write the answer back. Do not guess.
- Never store secrets (DB passwords, keys) in the profile. Point to where the
  user keeps them.
- `.runewright/` is git-ignored by default. The user may choose to commit it.
- If the profile contradicts the checkout (for example `packetver`), report the
  mismatch and ask which is right.
