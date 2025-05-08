# 🔍 PrivID Security Prep Plan

This document outlines how we will approach security from day one.

---

## ✅ What We’ve Done

- Wrote minimal, auditable smart contract (PrivIDDeployer.sol)
- No external dependencies, no tokens, no upgrades = less risk
- Slither/Mythril to be used for static analysis
- Added `SECURITY.md` and contact protocol

---

## 🛠 Audit Plan

| Task | Tool | Status |
|------|------|--------|
| Static analysis | Slither, Mythril | ⬜ Pending funding |
| Contract verification | BaseScan | ⬜ After first deploy |
| Peer review | Manual | ⬜ After v0.1 release |
| Linting + CI | GitHub Actions | ✅ CI stub exists

---

## Goals

- ✅ Stay simple and readable
- ✅ No proxy, no upgradable logic
- ✅ Prefer client-side ZK proof handling

---

We believe security starts with **clarity, simplicity, and public scrutiny**.
