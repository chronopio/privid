# PrivID 🔐  
**Decentralized Identity Verification Without Compromising Privacy**

PrivID is a lightweight browser extension that provides a privacy-first approach to identity verification. By integrating with the Holonym API and the AT Protocol, PrivID enables users to prove attributes—like age or residency—without exposing personal documents or biometric data.

---

## 🧭 Why PrivID?

Traditional identity verification often requires users to upload sensitive data to centralized services. This creates serious privacy concerns:

- **Third-Party Surveillance Tech**: Platforms like LinkedIn now use vendors such as [Persona](https://withpersona.com) to verify identity, requiring users to upload selfies and government-issued IDs. This data may be stored indefinitely. ([See critique](https://medium.com/@chrisbii/do-not-verify-your-identity-on-linkedin-4e0743854767))

- **Data Honeypots**: Centralized storage of identity documents and biometrics is a major security risk. Breaches can lead to identity theft and reputational harm.

- **Data Brokers and Loss of Control**: Tech giants like Google and Facebook monetize personal data at scale. Once uploaded, your ID may be shared, sold, or misused—without your consent.

PrivID offers a fundamentally different approach:
- Users stay in control of their data
- No centralized storage of identity documents
- Verifiable identity claims via **zero-knowledge proofs (ZKPs)**

---

## 🔐 How PrivID Works

PrivID uses zero-knowledge proofs to allow users to verify identity-linked claims—without revealing sensitive details.

**Workflow:**

1. **Credential Issuance**: Holonym provides users with cryptographic credentials (e.g. proof of age or residency).
2. **Proof Generation**: PrivID generates a zero-knowledge proof of a specific claim (like “I’m over 18”).
3. **Verification**: This proof can be verified by websites, applications, or optionally posted to a user’s Bluesky feed—without disclosing the original data.

> 🔏 *You prove only what you want—nothing more.*

---

## 🧰 Tech Stack

- **TypeScript** – Strong typing for reliable development
- **Node.js** – Runtime environment
- [`@atproto/api`](https://www.npmjs.com/package/@atproto/api) – AT Protocol SDK for Bluesky integration
- **Holonym API/SDK** – Credential issuance and ZK proof generation (planned)
- **dotenv** – Secure environment configuration

---

## 🔗 Related Projects & Dependencies

- **[Holonym Foundation](https://github.com/Holonym-Foundation)**  
- [Holonym Relayer](https://github.com/Holonym-Foundation/relayer) – Relays ZKPs to blockchain  
- [ID Hub Contracts](https://github.com/Holonym-Foundation/id-hub-contracts) – Smart contracts for identity verification  
- [ID Server](https://github.com/Holonym-Foundation/id-server) – Backend credential verification  
- [Client Portal](https://github.com/Holonym-Foundation/client-portal) – API key/session management  
- [AT Protocol](https://github.com/bluesky-social/atproto) – Decentralized protocol stack  
- [Bluesky Social App](https://github.com/bluesky-social/social-app) – Reference client

---

## 🛠️ Technical Implementation Plan

## 🗂️ Repository Structure

This monorepo now contains multiple components under the `apps/` directory:

- `apps/extension/` – Browser extension codebase (built with Vite, Tailwind, TypeScript)
- `apps/telegram-bot/` – Telegram bot for identity verification (Python-based, CLI-focused)

See individual READMEs inside each folder for usage and setup.

---

## 📍 Project Roadmap

For a full view of planned and completed features, visit:
[ROADMAP.md](./ROADMAP.md)

## 🗂️ Repository Structure

This monorepo now contains multiple components under the `apps/` directory:

- `apps/extension/` – Browser extension codebase (built with Vite, Tailwind, TypeScript)
- `apps/telegram-bot/` – Telegram bot for identity verification (Python-based, CLI-focused)

See individual READMEs inside each folder for usage and setup.

---

## 📍 Project Roadmap

For a full view of planned and completed features, visit:
[ROADMAP.md](./ROADMAP.md)

### Holonym Integration (Planned)

PrivID will use the [Holonym API and SDK](https://docs.holonym.id/for-developers/start-here) to support selective disclosure of identity attributes using zero-knowledge proofs.

Two integration paths are under consideration:

1. **Redirect-based Issuance Flow**  
   Redirect users to Holonym to issue a Soul-Bound Token (SBT) representing verified credentials:  
   `https://silksecure.net/holonym/<wallet_option>/<credential_type>/issuance/prereqs`

2. **Embedded SDK Option**  
   Use `silk.requestSBT(credentialType)` via the Human Wallet SDK to initiate in-app issuance.

> Holonym's SBTs allow users to prove facts (e.g. “I am over 18”) without exposing documents or identity details.

---

### AT Protocol Integration

PrivID uses `@atproto/api` to authenticate users with their Bluesky handle and optionally post proof metadata to their feed.

**Long-term possibilities:**
- **Schema Proposal**: Define `app.privid.verification` to store public proofs (e.g., `zk_type`, `proof_hash`, `verified_at`)
- **Portable Identity Binding**: Link verified claims to a user’s DID for use across the AT Protocol ecosystem

> *These are exploratory and dependent on community adoption and ATProto dev feedback.*

---

### Browser Extension MVP

PrivID’s MVP is a lightweight browser extension that:

- Logs into Bluesky using `@atproto/api`
- Fetches or verifies Holonym credential claims (e.g. “Over 18”)
- Displays visual badges on Bluesky profiles (client-side rendering only)
- Optionally publishes claim metadata to the user’s feed
- Never stores or uploads personal documents or biometric data

---

### Human.Tech Collaboration

PrivID will explore collaboration with [Human.Tech](https://github.com/humantech) to:

- Improve credential UX and flow
- Ensure compliance with emerging privacy standards
- Build trust through human-centered, transparent design

---

## 📜 License

MIT License. Open to collaboration and fork-friendly. Contributions welcome.

