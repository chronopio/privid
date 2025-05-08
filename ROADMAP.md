# 🗺️ PrivID MVP Roadmap (Q2 2025)

This roadmap reflects a fast-moving timeline (~2 months), with a focus on launching a minimal but functional prototype of PrivID in time for the next Gitcoin round.

---

## ✅ MVP Priorities

**What the MVP will do:**
- Let users click a button to verify using Holonym (mock or real)
- Save a basic local hash or proof value for testing
- Show a check mark badge on Bluesky profiles if verified
- Package and run the browser extension locally

**What the MVP will not do yet:**
- Publish to custom ATProto schemas
- Integrate real ZK proofs end-to-end
- Launch on Chrome Web Store

---

## 🚧 Work to Be Done

### 1. Set up base browser extension
- Scaffold `manifest.json`, popup UI, permissions
- Base folder structure: `extension/`
- Enable extension install and basic UI interaction

### 2. Add Holonym mock integration
- Add "Verify with Holonym" button
- Simulate fetching a claim (e.g. Over 18)
- Store local state/hash for mock testing

### 3. Display badge on Bluesky profiles
- Use DOM manipulation to detect profile pages
- Show a check mark if mock state is "verified"
- Style to be subtle and non-intrusive

### 4. Package and test extension
- Zip files for local testing
- Provide install instructions

### 5. Add mock/test mode toggle *(DIY / maintainer task)*
- Let devs toggle verification mode on/off
- Add console logs to simulate proof verification

### 6. Update README + Dev Docs *(DIY / maintainer task)*
- Setup guide
- MVP scope and known limitations

---

## 🧠 Stretch Goals (Post-MVP)

These are outside the immediate build but reflect long-term project goals:

- Real Holonym credential flow using embedded SDK
- Publishing ZK proof metadata to Bluesky via AT Protocol
- DID binding or ATProto schema registration (`app.privid.verification`)
- Firefox support and extension store submission
- End-to-end proof UX leveraging Human.Tech tooling

---

This roadmap will evolve based on contributor availability, community feedback, and results from the next Gitcoin round.
