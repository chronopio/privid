const badgeStrings = [
    'Identity Verified via Holonym',
    'Verified Person',
    'Authenticated by ZK Proof'
];

export interface MockVerificationResult {
    verified: boolean;
    timestamp: string;
    proof: string;
    badge: string;
}

export const getMockVerificationResult = (): MockVerificationResult => {
    const randomIndex = Math.floor(Math.random() * badgeStrings.length);
    const randomProofId = Math.random().toString(36).substring(2, 15);

    return {
        verified: true,
        timestamp: new Date().toISOString(),
        proof: `mock-zk-proof-${randomProofId}`,
        badge: badgeStrings[randomIndex]
    };
};
