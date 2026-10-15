# M.A.R.S import and Codex compatibility

## What is installed

Fifteen byte-for-byte Claude role definitions live in `../../.claude/agents/` relative to the
repository root notation: use `.claude/agents/<role>.md` from the checkout root.
`orchestrator.md` is a byte-for-byte snapshot of the global Claude M.A.R.S instructions.
The project `CLAUDE.md` remains untouched. Root `AGENTS.md` is the Codex routing entry point.
`import-manifest.json` records source paths, SHA-256 checksums, role dependencies and preserved files.
These are project-local role documents used through explicit delegation, not a claim that Codex
natively parses Claude agent frontmatter or that Claude session memory/processes were cloned.

## Runtime adaptation

- `model: opus` / `model: sonnet`, `effort`, and `color` remain unchanged in the originals.
  They do not select a Codex model. Inherit the active session model and runtime settings.
- Claude `Read`, `Grep`, `Glob`: use available file-reading/search tools; prefer `rg`.
- Claude `Write`, `Edit`: use available patch/file tools, only within the assigned role scope.
- Claude `Bash`: use the available command execution tool with an explicit checkout directory.
- Claude `WebFetch`, `WebSearch`: use available web tools and respect access restrictions.
- Claude `Skill`: read the actual resolved `SKILL.md`; it is not a callable tool in this runtime.
  Announce first use as required. No skills are auto-preloaded merely by copying frontmatter.
- If a role disallows shell or web tools, retain that behavioral limit. Read-only file access
  may use a narrowly scoped command through the host file interface when no dedicated read tool
  exists; this is not permission to execute arbitrary commands or mutate files.
- Tool restrictions remain instructions rather than a technical isolation boundary.
- Run roles in waves within the runtime limit. No paid service, Claude model installation,
  recurring automation or external communication is implied by this import.

## Standards and client context

Resolve imported `~/.claude/standards/<name>` to this directory's `standards/<name>`.
Resolve imported `standards/anti-slop.md`, `standards/output-contract.md` and
`standards/reporting-format.md` to this directory's corresponding files.
These five files are preserved source snapshots, not newly authored policy.

For this project, `clients/<slug>/` means:
`/Users/qognitionagency/qognition-ops/clients/qognition-agency/`.
Read `context.md`, `guardrails.md`, `brand-voice.md` and relevant existing deliverables as required.
Do not import `access.md`, credentials, unrelated clients or entire chat histories.
Read current project positioning first; external context and older `.agents/product-marketing.md`
may be stale. Explicit user instructions outrank imported requirements. Do not repeatedly ask for
approval already granted in the current task. Missing task-critical facts must be surfaced, not invented.

## Skill resolution

The manifest inventories every reference in each role's Skills section. Namespaced
`marketing-skills:<name>` references resolve to the locally available skill of that name.
Engineering plugin references resolve to their matching local Claude plugin skill files when
not available in the Codex skill roots. These files can be read explicitly; their presence does
not imply that the plugin's tools are connected in Codex. Re-check availability before use.
A checksum verifies which source was inspected; it does not mean all skills were applied.

If a path moves, rediscover the exact skill by name in the available skill roots before use.
If a required skill cannot be found, report the missing dependency and a concrete alternative;
never silently claim it was loaded. Optional dependencies are loaded only for relevant work.

## Validation and next work

Verify the 15 exact filenames and their checksums against the source manifest. Verify the
orchestrator and five standards, local skill paths and required external context paths.
Ensure `CLAUDE.md`, the locked positioning files and the existing copy draft retain their hashes.
Owen reviews the import independently. Website copy changes are a subsequent work item and
must start from the current project positioning and a page inventory.
