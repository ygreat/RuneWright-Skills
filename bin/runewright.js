#!/usr/bin/env node
'use strict';

/**
 * Rune*Wright Skills installer.
 * Zero dependencies. Node >= 18.
 *
 *   npx @runewright/skills install [--agent claude,codex] [--global] [--yes] [--force] [--dry-run]
 *   npx @runewright/skills list
 *   npx @runewright/skills update
 *   npx @runewright/skills uninstall [--agent ...] [--global]
 *   npx @runewright/skills doctor
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

const PKG_ROOT = path.resolve(__dirname, '..');
const SKILLS_SRC = path.join(PKG_ROOT, 'skills');
const PKG = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, 'package.json'), 'utf8'));
const MARKER = '.runewright-install.json';

// Skill folder locations per agent. Adapters are best effort: agent vendors
// change these conventions, so keep them in one table and verify with `doctor`.
const AGENTS = {
  claude:  { label: 'Claude Code',  project: '.claude/skills',  global: '.claude/skills' },
  codex:   { label: 'Codex',        project: '.agents/skills',  global: '.agents/skills' },
  cursor:  { label: 'Cursor',       project: '.cursor/skills',  global: '.cursor/skills' },
  gemini:  { label: 'Gemini CLI',   project: '.gemini/skills',  global: '.gemini/skills' },
  copilot: { label: 'GitHub Copilot', project: '.github/skills', global: '.copilot/skills' },
};

function parseArgs(argv) {
  const out = { cmd: null, agents: null, global: false, yes: false, force: false, dry: false, help: false };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--global' || a === '-g') out.global = true;
    else if (a === '--yes' || a === '-y') out.yes = true;
    else if (a === '--force' || a === '-f') out.force = true;
    else if (a === '--dry-run') out.dry = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else if (a === '--agent' || a === '--agents' || a === '-a') out.agents = (argv[++i] || '').split(',').filter(Boolean);
    else if (a.startsWith('--agent=')) out.agents = a.slice(8).split(',').filter(Boolean);
    else rest.push(a);
  }
  out.cmd = rest[0] || 'help';
  return out;
}

function baseDir(opts) {
  return opts.global ? os.homedir() : process.cwd();
}

function targetDir(agentKey, opts) {
  const a = AGENTS[agentKey];
  return path.join(baseDir(opts), opts.global ? a.global : a.project);
}

function listSkills() {
  return fs.readdirSync(SKILLS_SRC, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function readSkillMeta(name) {
  const file = path.join(SKILLS_SRC, name, 'SKILL.md');
  if (!fs.existsSync(file)) return { name, description: '(shared references, not a skill)', shared: true };
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  let description = '';
  if (m) {
    const d = m[1].match(/^description:\s*(.*)$/m);
    if (d) description = d[1].trim();
  }
  return { name, description, shared: false };
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function readMarker(dir) {
  try { return JSON.parse(fs.readFileSync(path.join(dir, MARKER), 'utf8')); } catch { return null; }
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans.trim()); }));
}

function detectAgents(opts) {
  const base = baseDir(opts);
  // An agent counts as present when its config root exists, e.g. ".claude".
  return Object.keys(AGENTS).filter((k) => {
    const root = (opts.global ? AGENTS[k].global : AGENTS[k].project).split('/')[0];
    return fs.existsSync(path.join(base, root));
  });
}

async function chooseAgents(opts) {
  if (opts.agents) {
    const bad = opts.agents.filter((a) => !AGENTS[a]);
    if (bad.length) fail(`Unknown agent(s): ${bad.join(', ')}. Known: ${Object.keys(AGENTS).join(', ')}`);
    return opts.agents;
  }
  const found = detectAgents(opts);
  if (opts.yes) {
    if (found.length) return found;
    fail('No agent folders detected. Pass --agent claude,codex,cursor,gemini,copilot.');
  }
  const keys = Object.keys(AGENTS);
  console.log('Install for which agents?');
  keys.forEach((k, i) => console.log(`  ${i + 1}) ${AGENTS[k].label}${found.includes(k) ? '  (detected)' : ''}`));
  const def = found.length ? found.map((k) => keys.indexOf(k) + 1).join(',') : '';
  const ans = (await ask(`Numbers, comma separated${def ? ` [${def}]` : ''}, or "all": `)) || def;
  if (ans === 'all') return keys;
  const picked = ans.split(',').map((n) => keys[parseInt(n, 10) - 1]).filter(Boolean);
  if (!picked.length) fail('No agents selected.');
  return picked;
}

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

async function cmdInstall(opts, isUpdate) {
  const agents = isUpdate ? detectInstalled(opts) : await chooseAgents(opts);
  if (!agents.length) fail('Nothing installed yet. Run "install" first.');
  const names = listSkills();
  for (const agent of agents) {
    const dest = targetDir(agent, opts);
    console.log(`\n${AGENTS[agent].label} -> ${dest}`);
    for (const name of names) {
      const to = path.join(dest, name);
      const existing = readMarker(to);
      if (fs.existsSync(to) && !existing && !opts.force) {
        console.log(`  skip   ${name} (exists and was not installed by Rune*Wright; use --force to overwrite)`);
        continue;
      }
      if (opts.dry) { console.log(`  would install ${name}`); continue; }
      fs.rmSync(to, { recursive: true, force: true });
      copyDir(path.join(SKILLS_SRC, name), to);
      fs.writeFileSync(path.join(to, MARKER), JSON.stringify({ package: PKG.name, version: PKG.version }, null, 2));
      console.log(`  ${existing ? 'update ' : 'install'} ${name}`);
    }
  }
  console.log(opts.dry ? '\nDry run: nothing written.' : '\nDone. Restart your agent if skills do not appear. Next: run /runewright-setup.');
}

function detectInstalled(opts) {
  return Object.keys(AGENTS).filter((k) => {
    const dir = targetDir(k, opts);
    return fs.existsSync(dir) && listSkills().some((n) => readMarker(path.join(dir, n)));
  });
}

function cmdList() {
  console.log(`${PKG.name} v${PKG.version}\n`);
  const skills = listSkills().map(readSkillMeta);
  if (!skills.length) { console.log('No skills bundled in this build.'); return; }
  const width = Math.max(...skills.map((s) => s.name.length));
  for (const s of skills) console.log(`  ${s.name.padEnd(width)}  ${s.description}`);
}

function cmdUninstall(opts) {
  const agents = opts.agents || detectInstalled(opts);
  if (!agents.length) { console.log('Nothing to uninstall.'); return; }
  for (const agent of agents) {
    const dest = targetDir(agent, opts);
    for (const name of listSkills()) {
      const to = path.join(dest, name);
      if (!readMarker(to)) continue; // only remove what we installed
      if (opts.dry) console.log(`would remove ${to}`);
      else { fs.rmSync(to, { recursive: true, force: true }); console.log(`removed ${to}`); }
    }
  }
}

function cmdDoctor(opts) {
  let problems = 0;
  const major = parseInt(process.versions.node.split('.')[0], 10);
  console.log(`node ${process.versions.node} ${major >= 18 ? 'ok' : 'TOO OLD (need >= 18)'}`);
  if (major < 18) problems++;
  console.log(`bundled skills: ${listSkills().length}`);
  for (const scope of [{ global: false }, { global: true }]) {
    const o = { ...opts, ...scope };
    console.log(`\n${scope.global ? 'Global' : 'Project'} (${baseDir(o)})`);
    for (const k of Object.keys(AGENTS)) {
      const dir = targetDir(k, o);
      const installed = fs.existsSync(dir) ? listSkills().filter((n) => readMarker(path.join(dir, n))) : [];
      if (!installed.length) { console.log(`  ${AGENTS[k].label.padEnd(15)} not installed`); continue; }
      const versions = new Set(installed.map((n) => readMarker(path.join(dir, n)).version));
      const stale = [...versions].some((v) => v !== PKG.version);
      if (stale) problems++;
      console.log(`  ${AGENTS[k].label.padEnd(15)} ${installed.length} item(s), v${[...versions].join(',')}${stale ? '  (outdated: run update)' : ''}`);
    }
  }
  process.exitCode = problems ? 1 : 0;
}

function help() {
  console.log(`Rune*Wright Skills v${PKG.version}
Agent skills for rAthena Ragnarok Online server development.

Usage:
  npx ${PKG.name} <command> [options]

Commands:
  install      Install skills into your agent(s)
  update       Refresh skills previously installed by this tool
  uninstall    Remove skills installed by this tool
  list         Show bundled skills
  doctor       Check Node version and installed skills

Options:
  -a, --agent <list>   claude,codex,cursor,gemini,copilot (comma separated)
  -g, --global         Install to your home directory instead of this project
  -y, --yes            Do not prompt; use detected agents
  -f, --force          Overwrite folders not installed by this tool
      --dry-run        Show what would happen
  -h, --help           Show this help`);
}

(async () => {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || opts.cmd === 'help') return help();
  switch (opts.cmd) {
    case 'install': return cmdInstall(opts, false);
    case 'update': return cmdInstall(opts, true);
    case 'uninstall': return cmdUninstall(opts);
    case 'list': return cmdList();
    case 'doctor': return cmdDoctor(opts);
    default: fail(`Unknown command "${opts.cmd}". Try --help.`);
  }
})();
