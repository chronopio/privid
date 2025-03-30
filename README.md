# privid

PrivID: A Privacy-Preserving Identity Verification Layer for AT Protocol
Tagline:
 Verified identity without surveillance. Open, secure, and user-owned.

TL;DR
PrivID is an open-source protocol for cryptographically verified identity, starting with integration into the AT Protocol and Bluesky. Built with privacy at its core, PrivID allows users to confirm that an account is backed by a real human identity without exposing personal data, using zero-knowledge proofs via Holonym.
PrivID focuses on cryptographic trust, ensuring identity confidence without centralized data collection or invasive tracking systems.

Problem
There is no standardized, privacy-preserving way to prove a real-world identity on decentralized social networks. While the AT Protocol supports decentralized handles and DIDs, it lacks mechanisms to:
Show whether an account is operated by a real person
Prove attributes like age, citizenship, or humanity without revealing PII
Offer verification without relying on platform-controlled systems

Solution
PrivID is a lightweight identity verification protocol that enables:
Zero-knowledge verified credentials displayed on Bluesky profiles
No centralized databases or trackers
Optional, user-controlled disclosure of identity attributes (e.g., age, nationality)
It starts as a browser extension and CLI tool, but is designed for future integration directly into the AT Protocol as a native extension to its data schema.

Core Features
Browser Extension
Detect Bluesky handles and display verified identity badges

Integrate with Holonym ZK identity proofs
CLI Tool for Developers & Researchers
Issue, verify, and audit identity proofs tied to DIDs
Streamlit or Web-based Onboarding
Simple UI for linking a Holonym credential to a Bluesky identity
Protocol Hooks for ATProto Integration
Introduce app.privid.verification schema
Publish proofs as signed attestations linked to user DID
Cross-platform Expandability
Twitter, Instagram, and other networks can optionally link via cryptographic attestations

Technical Architecture
graph TD
    A[User installs PrivID Extension] --> B[Bluesky profile scanned]
    B --> C[Extension checks local ZK credential]
    C -->|If absent| D[Prompt user to verify via Holonym]
    D --> E[User gets ZK credential & links to DID]
    E --> F[Extension adds badge to UI]
    F --> G[Optional: Push verification to ATProto schema]
Stack:
Frontend: WebExtension API, JS/TS, Streamlit (for onboarding)

ZK Proofs: Holonym SDK/API

LI: Python + Holonym + ATProto SDKs


Schema: ATProto extension for app.privid.verification
Deployment: Docker-ready + optional FastAPI backend for integration

AT Protocol Identity Structure
AT Protocol identities are defined by:
DID (Decentralized Identifier): A stable, cryptographically unique identifier (e.g., did:plc:xyz123)
Handle: A DNS-linked, user-friendly name (e.g., @username.bsky.social)
PDS (Personal Data Server): Stores user profile, posts, and metadata
PrivID proposes extending this with a new schema:
app.privid.verification → stores public metadata about linked credentials
Credentials are signed by the user and optionally timestamped
Verified attributes (e.g. "age verified") use zero-knowledge proofs, never revealing raw data

Roadmap
Phase 1: MVP (2 months)
Build Chrome/Firefox extension with badge rendering
Onboarding UI with Streamlit + Holonym integration
CLI tool for developers

Initial schema proposal for AT Protocol
GitHub repo launch and community documentation
Phase 2: Protocol Integration (3 months)
Submit pull request or schema proposal to ATProto
Allow DID-linked ZK credential publication
Test integration across Bluesky clients

Phase 3: Expansion (3–6 months)
Add Twitter/Instagram account linking via signed messages
Develop privacy badges (age, citizenship, human/not-bot)
Optional timestamping on Orbit Chain (open standard, not a token)
Broader use in journalism, NGOs, education

Licensing and Values
PrivID is:
100% Open Source (MIT or Apache 2)
Non-commercial: No ads, no data monetization
Privacy-Respecting: Data stays local, or in ZK form only
Portable and Interoperable

Trust what you see. Keep what’s yours.

