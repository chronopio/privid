import browser from 'webextension-polyfill';
import {
    getMockVerificationResult,
    MockVerificationResult
} from './mocks/mockHolonym';
import { icons } from './utils/icons';
import { publishVerificationPost, getDummyProof } from './api/atproto';

document.addEventListener('DOMContentLoaded', () => {
    const statusTextEl = document.getElementById(
        'status-text'
    ) as HTMLSpanElement;
    const statusIconEl = document.getElementById(
        'status-icon'
    ) as HTMLSpanElement;
    const button = document.getElementById('verifyBtn') as HTMLButtonElement;
    const mockToggle = document.getElementById(
        'mockToggle'
    ) as HTMLInputElement;
    const atprotoBtn = document.getElementById('atprotoBtn');

    type VerificationState = 'unverified' | 'verifying' | 'verified';
    interface StatusConfig {
        icon: string;
        iconClass: string;
        text: string;
        btnText: string;
        btnDisabled: boolean;
    }

    /**
     * Updates the UI to reflect a specific state (unverified, verifying, verified).
     * @param {'unverified' | 'verifying' | 'verified'} state - The state to display.
     */
    const setStatus = (state: VerificationState) => {
        statusTextEl.classList.remove('verified', 'unverified', 'verifying');
        statusIconEl.classList.remove('verified', 'unverified', 'verifying');

        let statusConfig: StatusConfig = {
            icon: icons.unverified,
            iconClass: 'unverified',
            text: 'Not Verified',
            btnText: 'Verify with Holonym',
            btnDisabled: false
        };

        if (state === 'verified') {
            statusConfig = {
                icon: icons.verified,
                iconClass: 'verified',
                text: 'Verified',
                btnText: 'Verified',
                btnDisabled: true
            };
        } else if (state === 'verifying') {
            statusConfig = {
                icon: icons.verifying,
                iconClass: 'verifying',
                text: 'Verifying...',
                btnText: 'Verifying...',
                btnDisabled: true
            };
        }

        statusIconEl.innerHTML = statusConfig.icon;
        statusTextEl.textContent = statusConfig.text;
        statusIconEl.classList.add(statusConfig.iconClass);
        statusTextEl.classList.add(statusConfig.iconClass);
        button.textContent = statusConfig.btnText;
        button.disabled = statusConfig.btnDisabled;
    };

    // Load toggle state from storage
    browser.storage.local
        .get(['mockMode'])
        .then((result: { mockMode?: boolean }) => {
            mockToggle.checked = !!result.mockMode;
            console.log('[PrivID] Mock verification mode:', mockToggle.checked);
        });

    // Listen for toggle changes
    mockToggle.addEventListener('change', () => {
        browser.storage.local.set({ mockMode: mockToggle.checked }).then(() => {
            console.log(
                '[PrivID] Mock verification mode set to:',
                mockToggle.checked
            );
        });
    });

    // On popup load, check storage for persisted verification state
    browser.storage.local
        .get(['verification'])
        .then((result: { verification?: { verified: boolean } }) => {
            if (result.verification && result.verification.verified) {
                setStatus('verified');
            } else {
                setStatus('unverified');
            }
        });

    /**
     * Handles the verification process (mock or real).
     * @param verificationFn - Function to generate the verification result.
     */
    function handleVerification(verificationFn: () => MockVerificationResult) {
        setTimeout(() => {
            const verificationResult = verificationFn();
            browser.storage.local
                .set({ verification: verificationResult })
                .then(() => {
                    setStatus('verified');
                });
        }, 2000);
    }

    button.addEventListener('click', async () => {
        setStatus('verifying');
        const { mockMode } = await browser.storage.local.get(['mockMode']);

        if (mockMode) {
            handleVerification(getMockVerificationResult);
        } else {
            // TODO: Replace getMockVerificationResult with real verification function
            handleVerification(getMockVerificationResult);
        }
    });

    if (atprotoBtn) {
        atprotoBtn.addEventListener('click', handleAtprotoVerification);
    }
});

async function handleAtprotoVerification() {
    const atprotoStatusEl = document.getElementById(
        'atproto-status'
    ) as HTMLDivElement;
    const { mockMode } = await browser.storage.local.get(['mockMode']);
    if (!mockMode) {
        atprotoStatusEl.textContent =
            'ATProto simulation is only available in Mock Verification Mode.';
        return;
    }
    const userHandle = 'user.bsky.social'; // Placeholder
    const dummyProof = getDummyProof();
    const result = await publishVerificationPost(userHandle, dummyProof);

    console.log('[ATProto] Simulated post result:', result);

    atprotoStatusEl.innerHTML = `
      <div class="atproto-result-card">
        <div class="atproto-result-header">
          <span class="atproto-result-check">&#10003;</span>
          <span class="atproto-result-title">Simulated ATProto Post Created</span>
        </div>
        <div class="atproto-result-field"><strong>Badge:</strong> <span class="atproto-result-badge">${
            result.post.proof.badge
        }</span></div>
        <div class="atproto-result-field"><strong>Proof:</strong> <span class="atproto-result-proof">${
            result.post.proof.proof
        }</span></div>
        <div class="atproto-result-timestamp"><strong>Timestamp:</strong> ${new Date(
            result.post.proof.timestamp
        ).toLocaleString()}</div>
      </div>
    `;
}
