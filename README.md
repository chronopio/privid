# PrivID

**Verified identity without surveillance. Open, secure, and user-owned.**

PrivID is an open-source identity verification protocol that uses zero-knowledge cryptographic proofs to verify real-world identity attributes (e.g. age, citizenship, humanity) without exposing any personal data.

We aim to build a portable, privacy-preserving trust layer starting with the [AT Protocol](https://github.com/bluesky-social/atproto) and [Bluesky](https://github.com/bluesky-social/social-app).

---

## ✨ Key Features

- 🛡 Zero-knowledge identity verification via [Holonym](https://github.com/HolonymFoundation)
- 🧩 Browser extension to display verified identity badges on Bluesky handles
- 🧪 CLI tooling for developers, researchers, and moderators
- 🌐 Streamlit onboarding UI to help users link Holonym credentials to ATProtocol DIDs
- 🧠 Integration-ready schema: `app.privid.verification`
- 🔄 Interoperable with Bluesky, ATProtocol, and optionally Twitter/Instagram

---

## 🔗 Related Repositories & Dependencies

- [Holonym Foundation GitHub](https://github.com/HolonymFoundation)
- [Human.Tech – Holonym Zero-Knowledge Identity](https://github.com/human-tech-org)
- [Bluesky AT Protocol (atproto)](https://github.com/bluesky-social/atproto)
- [Bluesky Social App](https://github.com/bluesky-social/social-app)
- [OpenZKP tools (zk-kit)](https://github.com/privacy-scaling-explorations/zk-kit)

---

## 📌 Milestones – April 2025

| Week | Deliverable |
|------|-------------|
| Week 1 | Deploy & publish `PrivIDDeployer.sol` smart contract on Base Sepolia |
| Week 2 | Complete onboarding UI (Streamlit) & Holonym ZK credential integration |
| Week 3 | Prototype Bluesky browser extension w/ badge rendering |
| Week 4 | Publish schema proposal for `app.privid.verification` on ATProto |

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
