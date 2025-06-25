# 🧠 PrivID Technical Architecture (MVP)

## Overview

PrivID is a browser extension that enables privacy-preserving identity verification on Bluesky. It integrates with Holonym to fetch zero-knowledge credentials (e.g. proof of age), and optionally publishes proof metadata to the AT Protocol.

### Core Components

- **Browser Extension**: Detects Bluesky handles and displays verification badges
- **Holonym Integration**: Fetches SBTs for ZK claims (e.g. "over 18", residency)
- **AT Protocol Publishing**: Optionally writes `app.privid.verification` record with proof metadata

## Data Flow

1. User clicks “Verify with Holonym” in the extension
2. Holonym issues a ZK credential (SBT)
3. PrivID creates a proof hash and optionally publishes it via ATProto schema
4. Extension reads verification record and renders badge on Bluesky

## Integration Points

- [Holonym SDK + Relayer](https://github.com/holonym-foundation)
- [AT Protocol](https://github.com/bluesky-social/atproto)
- [Bluesky Social App](https://github.com/bluesky-social/social-app)

---

## Future or Optional Components (not in MVP)

- **Smart Contract (PrivIDDeployer.sol)**: Was exploratory, now archived
- **Streamlit Onboarding UI**: May return as a visual credential assistant
- **CLI Tooling**: For devs to publish or verify proofs manually
