# ✅ PrivID MVP Issues

These issues represent the scoped-down tasks for the v0.1 milestone of PrivID — focused on delivering a working, privacy-first browser extension before the next Gitcoin round.

---

## 1. Set up base browser extension environment
**Labels**: `setup`, `extension`, `v0.1`

Create the foundational scaffolding for the PrivID extension.

- [ ] `manifest.json` file for Chrome
- [ ] Basic popup UI scaffold
- [ ] Permissions and tab access setup

📁 Path: `extension/`

---

## 2. Integrate Holonym credential verification
**Labels**: `verification`, `Holonym`, `v0.1`

Enable connection to Holonym to fetch proof-of-personhood (ZK or mock for testing).

- [ ] Add `Verify with Holonym` button
- [ ] Store local hash for testing purposes

🔗 https://github.com/holonym-foundation

---

## 3. Create AT Protocol record for verification status
**Labels**: `ATProto`, `backend`, `v0.1`

Write and register the custom ATProto record `app.privid.verification` to store identity proof.

- [ ] Add schema
- [ ] Register record with DID
- [ ] Test publishing via API

📁 Path: `atproto/`

---

## 4. Add check mark badge to verified Bluesky users
**Labels**: `frontend`, `badge`, `v0.1`

Display a visible check mark on users who have a verification record attached to their profile.

- [ ] Read ATProto verification record
- [ ] Modify DOM to inject badge
- [ ] Ensure non-intrusive style

📁 Path: `extension/content/`

---

## 5. Build test mode with mock verification
**Labels**: `testing`, `mock`, `v0.1`

Add mock verification option for local testing without Holonym.

- [ ] Simulate verified user state
- [ ] Add debug logs in console

---

## 6. Update README with MVP scope and setup
**Labels**: `documentation`, `readme`, `v0.1`

Update the project README to reflect current roadmap, MVP goals, and dev setup instructions.

- [ ] Add install/setup commands
- [ ] Link milestone and contributing notes

---

## 7. Package and publish extension for local install
**Labels**: `deployment`, `packaging`, `v0.1`

Package the browser extension for local installation and prepare optional publish instructions for Chrome Web Store.

- [ ] Zip up for devs
- [ ] Add metadata checklist

📁 Path: `dist/`
