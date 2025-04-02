# 🔗 PrivID Integration Guide

## What Is `app.privid.verification`?

This is a proposed AT Protocol schema that allows users to attach verifiable identity proofs (ZK credentials) to their DID metadata.

## Fields

- `zk_type`: e.g., `"age_verified"`, `"human"`, `"kyc"`
- `proof_hash`: keccak256 hash or IPFS CID of credential
- `verified_at`: timestamp (ISO8601)

## Example Record

```json
{
  "type": "app.privid.verification",
  "zk_type": "human",
  "proof_hash": "0xabcd1234...",
  "verified_at": "2025-04-01T12:00:00Z"
}
```

## How to Publish

Use ATProto record publishing tools, or CLI tool from this repo.
