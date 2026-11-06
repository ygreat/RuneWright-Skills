# Prerequisites

Check each tool, report one line each (found / missing / too old), and offer to
guide the install. Always read the checkout's own build documentation first
(`README.md`, `doc/`, and the wiki); it overrides this list.

| Tool | Why | Check | Notes |
| --- | --- | --- | --- |
| Git | Clone rAthena, track changes | `git --version` | Required |
| C++ toolchain | Compile the servers | Windows: Visual Studio or Build Tools with the "Desktop development with C++" workload. Linux: `g++`, `make` | Match the compiler requirement stated in the checkout |
| Docker (recommended for the DB) | Disposable, reproducible MariaDB | `docker --version`, `docker info` | Docker Desktop on Windows needs virtualization enabled. Alternative: install MariaDB/MySQL natively |
| Node.js (optional) | Only if using this collection's CLI | `node --version` | 18 or newer |

## Windows tips

- Run commands from PowerShell. Warn before anything needs an administrator
  prompt.
- If Docker reports the engine is not running, start Docker Desktop and wait
  for it to say it is running.
- Long paths: keep the project folder short (for example `D:\MyRO`) and without
  spaces to avoid tooling surprises.

## Linux tips

- Package names differ by distro. Look up the exact dependency list in the
  checkout's docs instead of guessing.
