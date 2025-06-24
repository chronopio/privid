const badgeStrings = [
    'Identity Verified via Holonym',
    'Verified Person',
    'Authenticated by ZK Proof'
];

export const getMockVerificationResult = () => {
    const randomIndex = Math.floor(Math.random() * badgeStrings.length);
    const randomProofId = Math.random().toString(36).substring(2, 15);

    return {
        verified: true,
        timestamp: new Date().toISOString(),
        proof: `mock-zk-proof-${randomProofId}`,
        badge: badgeStrings[randomIndex]
    };
};
