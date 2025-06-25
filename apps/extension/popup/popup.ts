import browser from 'webextension-polyfill';
import { getMockVerificationResult } from '../mockHolonym';
import { icons } from './utils/icons';

document.addEventListener('DOMContentLoaded', () => {
    const statusTextEl = document.getElementById(
        'status-text'
    ) as HTMLSpanElement;
    const statusIconEl = document.getElementById(
        'status-icon'
    ) as HTMLSpanElement;
    const button = document.getElementById('verifyBtn') as HTMLButtonElement;

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

    button.addEventListener('click', () => {
        setStatus('verifying');

        // Simulate a Holonym verification delay
        setTimeout(() => {
            const mockResult = getMockVerificationResult();
            // Store the mock result in browser storage to persist state
            browser.storage.local.set({ verification: mockResult }).then(() => {
                console.log('Verification result stored:', mockResult);
                setStatus('verified');
            });
        }, 2000);
    });
});
