---
name: ro-writing
description: Write original lore, world history, factions, character voices and NPC dialogue for a custom RO server, consistent with the project's tone. Use when the user says "write a story", "lore for my server", "NPC dialogue", "character backstory", "world building", "quest text", or "make this sound like our world".
---

# ro-writing

Creative writing that fits the game and ships as files. Follow
[principles](../runewright-shared/principles.md).

## 1. Anchor on the world

Read the profile notes and any lore document in the workspace. If none exists,
build a short **lore bible** with the user before writing anything long:

- Pillars (3 to 5 themes the world is about) and tone (grim, whimsical, ...).
- Setting facts that must never be contradicted.
- Factions, key places, and the central conflict.
- Naming rules and vocabulary to use or avoid.

Save it in the workspace (for example `docs/lore/`) and record its path in the
profile notes so every later skill reuses it.

## 2. Write for the medium

- **NPC dialogue:** short pages that fit the dialogue window; one idea per
  page; use the profile's name-header style; voice differs per character
  (vocabulary, sentence length, habits). Keep colors minimal and reset them.
- **Quest text:** the client quest window has little room; summaries are
  one line. Put the story in dialogue, the instructions in the quest text.
- **Item and card flavor text:** one or two lines that hint at the world.
- **Announcements/events:** brief, in-world, readable at a glance.

## 3. Respect canon

Original RO lore is owned by others. Prefer original material for a custom
server; reference official lore only lightly and never copy official text.
Flag anything that might conflict with the user's own canon.

## 4. Process

1. Offer 2 or 3 short options (premise or voice) before the full draft.
2. Draft, then check consistency against the lore bible.
3. Deliver in the form it will ship in (script-ready dialogue, a table of
   quest text, a lore page), with the localization plan from the profile's
   `locale` if more than one language is needed.

## 5. Handoff

Dialogue goes to `ro-create-npc`, quest text to `ro-create-quest`, item text
to `ro-create-item` and `ro-client-files`.
