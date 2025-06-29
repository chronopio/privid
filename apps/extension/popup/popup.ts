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
    const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
    const loginModal = document.getElementById('loginModal') as HTMLDivElement;
    const modalLoginBtn = document.getElementById(
        'modalLoginBtn'
    ) as HTMLButtonElement;
    const closeModalBtn = document.getElementById(
        'closeModalBtn'
    ) as HTMLButtonElement;
    const identifierInput = document.getElementById(
        'identifierInput'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
        'passwordInput'
    ) as HTMLInputElement;
    const loginError = document.getElementById('loginError') as HTMLDivElement;
    const loginSuccess = document.getElementById(
        'loginSuccess'
    ) as HTMLDivElement;
    const postToBskyBtn = document.getElementById(
        'postToBskyBtn'
    ) as HTMLButtonElement;
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

    // Helper to show/hide login button based on mock toggle and update text for login/logout
    async function updateLoginBtnState(mockMode: boolean) {
        if (!loginBtn) return;
        if (mockMode) {
            loginBtn.style.display = 'none';
            if (postToBskyBtn) postToBskyBtn.style.display = 'none';
            return;
        }
        // Check for Bluesky session
        const { bskySession } = await browser.storage.local.get([
            'bskySession'
        ]);
        const hasJwt =
            bskySession &&
            typeof bskySession === 'object' &&
            'accessJwt' in bskySession &&
            typeof bskySession.accessJwt === 'string' &&
            bskySession.accessJwt.length > 0;
        if (hasJwt) {
            loginBtn.textContent = 'Log out';
            loginBtn.dataset.loggedIn = 'true';
            if (postToBskyBtn) postToBskyBtn.style.display = 'block';
        } else {
            loginBtn.textContent = 'Login to Bluesky';
            loginBtn.dataset.loggedIn = 'false';
            if (postToBskyBtn) postToBskyBtn.style.display = 'none';
        }
        loginBtn.style.display = 'block';
    }

    // Load toggle state from storage
    browser.storage.local
        .get(['mockMode'])
        .then((result: { mockMode?: boolean }) => {
            mockToggle.checked = !!result.mockMode;
            updateLoginBtnState(!!result.mockMode);
            console.log('[PrivID] Mock verification mode:', mockToggle.checked);
        });

    // Listen for toggle changes
    mockToggle.addEventListener('change', () => {
        browser.storage.local.set({ mockMode: mockToggle.checked }).then(() => {
            updateLoginBtnState(mockToggle.checked);
            // Hide modal if switching to mock mode
            if (mockToggle.checked && loginModal)
                loginModal.style.display = 'none';
            console.log(
                '[PrivID] Mock verification mode set to:',
                mockToggle.checked
            );
        });
    });

    // Login/Logout button logic
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const loggedIn = loginBtn.dataset.loggedIn === 'true';
            if (loggedIn) {
                // Log out
                await browser.storage.local.remove('bskySession');
                loginBtn.textContent = 'Login to Bluesky';
                loginBtn.dataset.loggedIn = 'false';
                if (postToBskyBtn) postToBskyBtn.style.display = 'none';
            } else {
                // Open login modal
                if (loginModal) {
                    loginModal.style.display = 'flex';
                    identifierInput.value = '';
                    passwordInput.value = '';
                    loginError.style.display = 'none';
                    if (loginSuccess) loginSuccess.style.display = 'none';
                }
            }
        });
    }

    // Modal close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (loginModal) loginModal.style.display = 'none';
        });
    }

    // Modal login button (Bluesky authentication)
    if (modalLoginBtn) {
        modalLoginBtn.addEventListener('click', async () => {
            const identifier = identifierInput.value.trim();
            const password = passwordInput.value;
            loginError.style.display = 'none';
            modalLoginBtn.disabled = true;
            modalLoginBtn.textContent = 'Logging in...';

            try {
                const response = await fetch(
                    'https://bsky.social/xrpc/com.atproto.server.createSession',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ identifier, password })
                    }
                );
                const data = await response.json();
                if (!response.ok || !data.accessJwt) {
                    throw new Error(data.message || 'Login failed');
                }
                // Store accessJwt and handle for future use
                await browser.storage.local.set({
                    bskySession: {
                        accessJwt: data.accessJwt,
                        handle: data.handle
                    }
                });
                loginError.style.display = 'none';
                if (loginSuccess) {
                    loginSuccess.style.display = 'block';
                }
                updateLoginBtnState(false);
                // Auto-close modal after 1 second
                setTimeout(() => {
                    if (loginModal) loginModal.style.display = 'none';
                    if (loginSuccess) loginSuccess.style.display = 'none';
                }, 1000);
            } catch (err: any) {
                if (loginSuccess) loginSuccess.style.display = 'none';
                loginError.textContent = err.message || 'Login failed';
                loginError.style.display = 'block';
            } finally {
                modalLoginBtn.disabled = false;
                modalLoginBtn.textContent = 'Login';
            }
        });
    }

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
