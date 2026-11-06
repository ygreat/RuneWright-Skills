# Client compatibility and packetver

The server and the client must agree on a **packet version**. Many "feature does
not work" and "unknown packet" problems are packetver mismatches.

## Facts to rely on

- `PACKETVER` is a client date in `YYYYMMDD` form, set when the server is built.
- The client's connection config (for example `clientinfo.xml`) must match the
  login server's expected client version settings.
- Packet layouts, and some features, only exist from a given date. rAthena's
  packet docs and source gate these with `PACKETVER >= <date>` conditions.
- Packet obfuscation keys depend on the packet version. A wrong version often
  shows as "unknown packet" disconnects.
- Where `PACKETVER` is defined and which headers refine it can differ between
  rAthena versions. Search the user's checkout (`src/config/`, `src/custom/`,
  `src/common/`) instead of assuming a path.

## What to do

1. Read `packetver` from the profile and confirm it against the checkout.
2. Before proposing a feature, search the source and `doc/` for the packet or
   field involved and check its `PACKETVER` gate.
3. For client-side work (L4), confirm the client build matches the packetver
   and that the file format and encoding expected by that build are preserved.
4. When the feature needs a newer packetver, explain the trade-off: raising
   `PACKETVER` changes which clients can connect.
5. If the answer is not in the local docs or source, say it is unverified and
   point to where to verify it.

## Out of scope

Modifying the client executable or inventing new packets (L5). The skills may
identify that such work is required, but they do not perform it.
