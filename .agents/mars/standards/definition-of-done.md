# Definition of done

A change is done when every line below is true. Not when it works on the author's machine.

## Every change

- [ ] It does what was asked, and nothing that was not asked.
- [ ] Existing code was read before new code was added. Conventions match the surrounding file, not habits imported from elsewhere.
- [ ] No invented APIs. Every function, column, env var and library method was verified to exist — by grep, not by memory. Anything unconfirmed is marked `[UNVERIFIED: <thing>]` inline rather than guessed.
- [ ] Error paths handled. Not just the happy path.
- [ ] No secrets, tokens, or personal data in code, logs, fixtures, error messages, or commit messages.
- [ ] Tests exist for what would be expensive to get wrong.
- [ ] The reviewer has seen it. **Nothing merges without code-reviewer** — including work the architect produced.

## Any change touching data access

- [ ] **Tenant scope is stated.** Every new query, endpoint, cache key and background job says how tenancy is enforced there — in a comment, in the PR description, or both. If it cannot be determined, the change stops and says so. It is never assumed.
- [ ] Authorization checked on every new route, not just authentication.
- [ ] A cross-tenant test case exists for any new endpoint.

## Any change touching schema or a public contract

- [ ] An ADR exists, numbered, naming the options considered and what would make the decision wrong later.
- [ ] The rollback is written down in the same document as the change.
- [ ] Migration runs forward **and back**, and both directions are tested.

## Any UI change

- [ ] Tokens used, no arbitrary values.
- [ ] All five states implemented: empty, loading, error, populated, overflowing.
- [ ] Dark mode checked on every surface.
- [ ] Keyboard navigable. Focus visible. Focus order sane.
- [ ] Screen reader labels present and meaningful.
- [ ] Checked against `no-slop.md`.

## Any change to auth, tenancy, the data model, or a third-party integration

- [ ] security-auditor has reviewed it. This is not optional and not deferrable.
