---
name: ro-deployplan
description: Plan and execute deploying an rAthena server to a Linux VPS or dedicated host - sizing, OS hardening, database, build, services, firewall, domains, client config, launch checklist and rollback. Use when the user says "deploy to a VPS", "go live", "host my server", "production setup", "open beta", "move from local to server", or "launch checklist".
---

# ro-deployplan

Turn a working local server into a safe public one. Follow
[principles](../runewright-shared/principles.md). Produce a written plan the
user approves before any remote command is run, and never run commands on a
remote host without explicit confirmation.

## 1. Requirements

Read the profile and ask: expected players, budget, region/latency, provider,
domain name, who administers it, backup expectations, and the launch date.
Pick a size that fits (a small server runs on a modest VPS; the database and
map server are the main consumers).

## 2. Host baseline (Linux)

- Current LTS distribution, system updates, a non-root service user, SSH keys
  only, no root login, and a firewall that allows only the needed ports.
- Time sync and a swap policy appropriate to the VPS.
- Default game ports are set in the server config (verify in the checkout:
  login, char and map ports, plus web if used). Open only those to the world;
  keep the database port closed to the internet and bound to localhost.

## 3. Build and run

1. Install the toolchain and dependencies listed in the checkout's docs.
2. Clone the project, build with the profile's packetver and renewal setting.
3. Database: install MariaDB/MySQL (or a container), create a dedicated user
   with a strong password, import the schema, restrict network access.
4. Configure the public IP/domain in the server configs via import files;
   point the client's connection file to the public address.
5. Run each server as a managed service (systemd units with restart on failure
   and the right start order), logging to files that rotate.

## 4. Web and client delivery

If a web control panel or patcher is used, host it behind a reverse proxy with
HTTPS. Client files reach players through the project's patch method; test a
clean download on a fresh machine.

## 5. Protection

Rate-limit or protect login endpoints, enable the server's anti-abuse options
that suit the project, plan DDoS protection with the provider, and keep admin
tools off public ports.

## 6. Launch checklist

- [ ] Fresh-machine client connects and plays.
- [ ] Backups run, and a restore was tested.
- [ ] Monitoring and alerts work.
- [ ] Credentials are not in git.
- [ ] Rollback plan written (previous build, DB snapshot).
- [ ] Rates, caps and rules match the profile.
- [ ] Support/contact route for players.

## 7. Output

A step-by-step runbook with exact commands for the chosen distribution, a
verification step after each phase, and a rollback for each risky step.
Hand day-two operations to `ro-serverops`.
