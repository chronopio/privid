import browser from 'webextension-polyfill';
import { verifyUniquenessProof } from '@holonym-foundation/off-chain-sdk';

async function main(): Promise<void> {
    const statusEl = document.getElementById('status');
    if (!statusEl) return;
    const urlParams = new URLSearchParams(window.location.search);
    const proof = urlParams.get('proof');
    if (!proof) {
        statusEl.innerHTML =
            '<span class="error">No proof found in URL.</span>';
        return;
    }
    try {
        const parsedProof = JSON.parse(proof);
        const isValid = await verifyUniquenessProof(parsedProof);
        if (isValid) {
            await browser.storage.local.set({
                verification: {
                    verified: true,
                    timestamp: new Date().toISOString(),
                    proof,
                    badge: 'Identity Verified via Holonym'
                }
            });
            statusEl.innerHTML =
                '<span class="success">✅ Verification successful! You may close this tab.</span>';
            setTimeout(() => window.close(), 2000);
        } else {
            statusEl.innerHTML =
                '<span class="error">❌ Proof is invalid.</span>';
        }
    } catch (err: any) {
        statusEl.innerHTML = `<span class="error">❌ Error verifying proof: ${err.message}</span>`;
    }
}

main();
