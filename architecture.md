# 🧠 PrivID Technical Architecture

## Overview

PrivID consists of modular components:

- **Smart Contract**: Logs verifiers and project metadata
- **Onboarding UI (Streamlit)**: Guides users to Holonym and links credentials
- **Browser Extension**: Adds verification badge to Bluesky handles
- **CLI Tool**: Power-user access to proof publishing and DID lookups

## Flow Diagram

1. User initiates onboarding
2. Holonym issues ZK credential (SBT)
3. Credential proof is hashed & optionally published to AT Protocol schema
4. Browser extension reads DID + schema and renders badge

## Integration Points

- [Holonym Relayer + Client SDK](https://github.com/holonym-foundation)
- [AT Protocol Identity + Records](https://github.com/bluesky-social/atproto)
- Bluesky UI layer for display
