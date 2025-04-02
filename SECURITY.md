# 🔐 Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within PrivID or its components, please disclose it responsibly:

📧 Email us: security@privid.org  
🔒 Use PGP (key posted on our website)

We will respond within 72 hours and take appropriate actions.

## Key Practices

- Zero-knowledge proofs reduce the risk of data leaks
- Least privilege access enforced in all admin tooling
- Dependencies are monitored with `npm audit` and `pip-audit`
- CI runs include static code analysis for CLI and extension

## Supported Versions

| Version | Supported | Security Fixes |
|---------|-----------|----------------|
| v0.1.x  | ✅         | ✅              |
| pre-v0.1| ❌         | ❌              |
