# PrivID

**Verified identity without surveillance. Open, secure, and user-owned.**

PrivID is an open-source identity verification protocol that utilizes zero-knowledge cryptographic proofs to verify real-world identity attributes (e.g., age, citizenship, humanity) without exposing personal data. Our goal is to build a portable, privacy-preserving trust layer, initially integrating with the [AT Protocol](https://github.com/bluesky-social/atproto) and [Bluesky](https://github.com/bluesky-social/social-app).

---

## ✨ Key Features

- **Zero-Knowledge Identity Verification via Holonym**: Leverages Holonym's decentralized identity protocol based on zero-knowledge proofs for privacy-preserving KYC and Sybil resistance. [Holonym GitHub Repository]([https://github.com/holonym-foundation](https://github.com/holonym-foundation))

- **Browser Extension for Bluesky**: Displays verified identity badges on Bluesky user profiles, enhancing trust within the decentralized social network.

- **CLI Tooling**: Provides developers, researchers, and moderators with command-line tools to manage and verify identity credentials.

- **Streamlit Onboarding UI**: Offers an intuitive interface for users to link Holonym credentials to their AT Protocol DIDs.

- **Integration-Ready Schema (`app.privid.verification`)**: Defines a standard for publishing verifiable identity credentials within the AT Protocol ecosystem.

- **Cross-Platform Interoperability**: Designed to integrate with platforms like Bluesky, AT Protocol, and potentially extend to Twitter and Instagram.

---

## 🔗 Related Repositories & Dependencies

- **Holonym Foundation**: [Github](https://github.com/holonym-foundation)
  
  - *Holonym Relayer*: Facilitates the relay of zero-knowledge proofs between clients and the blockchain. [Repository](https://github.com/holonym-foundation/holonym-relayer)

  - *ID Hub Contracts*: Contains smart contracts for identity management and verification. [Repository](https://github.com/holonym-foundation/id-hub-contracts)

  - *ID Server*: Backend service for identity verification processes. [Repository](https://github.com/holonym-foundation/id-server)

  - *Client Portal*: Allows Holonym clients to manage their API keys and sessions. [Repository](https://github.com/holonym-foundation/client-portal)

- **AT Protocol (atproto)**: [https://github.com/bluesky-social/atproto](https://github.com/bluesky-social/atproto)

- **Bluesky Social App**: [https://github.com/bluesky-social/social-app](https://github.com/bluesky-social/social-app)


---

## 🛠️ Technical Implementation

### Holonym Integration

1. **User Credential Issuance**: Users are directed to Holonym to obtain a Soul-Bound Token (SBT), representing their verified identity attributes. This can be achieved via:

   - **Direct Link or Redirect**: Sending users to `https://silksecure.net/holonym/<wallet_option>/<credential_type>/issuance/prereqs`, where `wallet_option` is either `silk` (for using Holonym within the Human Wallet) or `diff-wallet` (for using another wallet), and `credential_type` is either `gov-id` (for government ID credentials) or `phone` (for phone number credentials). [Holonym Integration Guide](https://docs.holonym.id/for-developers/start-here)

   - **Human Wallet SDK**: Embedding Human ID/Human Wallet directly into the application by importing the SDK and invoking `silk.requestSBT(credentialType)`, with `credentialType` set to `'kyc'` or `'phone'`.

2. **Credential Verification**: PrivID reads the user's SBT from Holonym's API or directly from the blockchain to verify identity attributes without exposing personal data.

### AT Protocol Integration

- **Schema Extension**: Propose and implement the `app.privid.verification` schema within the AT Protocol to standardize the inclusion of verifiable identity credentials. This schema will define fields such as `proof_hash`, `zk_type`, and `verified_at` to store proof metadata.

- **Decentralized Identifier (DID) Linking**: Associate users' DIDs with their verified credentials, enabling seamless identity verification across decentralized applications built on the AT Protocol.

### Bluesky Integration

- **Browser Extension Development**: Create a browser extension that interfaces with the Bluesky social app to display verification badges on user profiles. The extension will:

  - Detect Bluesky handles and fetch corresponding verification statuses from the AT Protocol.

  - Render visual indicators (e.g., badges) on profiles to signify verified identity attributes.

- **API Interaction**: Utilize Bluesky's APIs to access user data and update verification statuses in real-time, ensuring a dynamic and responsive user experience.

### Human.Tech Collaboration

- **Knowledge Management**: Leverage Human.Tech's expertise in evaluating, identifying, generating, and managing intellectual assets to enhance the identity verification processes within PrivID. [Human.Tech GitHub Repository](https://github.com/humantech)

- **Tool Integration**: Incorporate tools and frameworks developed by Human.Tech to ensure compliance with privacy standards and improve user trust in the identity verification process.

---

## 📌 Milestones – April 2025

| Week  | Deliverable                                                                 |
|-------|------------------------------------------------------------------------------|
| Week 1 | Deploy & publish `PrivIDDeployer.sol` smart contract on Base Sepolia        |
| Week 2 | Complete onboarding UI (Streamlit) & Holonym ZK credential integration      |
| Week 3 | Prototype Bluesky browser extension with badge rendering                    |
| Week 4 | Publish schema proposal for `app.privid.verification` on AT Protocol        |

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

