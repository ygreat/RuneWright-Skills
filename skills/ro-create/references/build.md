# Building the servers

Read the checkout's own build documentation first; it is authoritative for the
exact version. Typical outcomes: `login-server`, `char-server`, `map-server`
(and `web-server` in recent versions).

## Windows

- Open the solution (`rAthena.sln`) in Visual Studio, or build with MSBuild
  from a Developer PowerShell.
- Choose the **Release** configuration for normal use, and the platform the
  checkout documents.
- Renewal / packetver are compile-time: set them as the checkout documents
  *before* building, and rebuild after any change.

## Linux

```sh
./configure          # see ./configure --help for options (packetver, renewal, ...)
make server
```

## Verify

- The build finishes with no errors; list the produced executables.
- Run each server once with `--help` or briefly to confirm it starts.
- Record the compiler version and the rAthena commit in the profile notes.

## When the build fails

1. Capture the first error (not the last).
2. Typical causes: missing workload/toolchain, wrong platform, stale build
   folder, mismatched packetver, a bad edit in a custom source change.
3. Explain the cause in one plain sentence, propose one fix, retry.
