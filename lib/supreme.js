// ═══════════════════════════════════════════════
// 👑 FIZA AUTHORITY LEVELS - Protected File
// ═══════════════════════════════════════════════
// ⚠️ IMMUTABLE — Baked into Docker image
// ⚠️ Changes require rebuilding the image
// ═══════════════════════════════════════════════

const authority = {
    // 👑 SUPREME - Highest Authority (Cannot be demoted)
    supreme: [
        '917289881303@s.whatsapp.net',  // FAHIM
    ],
    
    // 👤 OWNERS - Bot Owners
    owners: [
        '917289881303@s.whatsapp.net',  // FAHIM
    ],
    
    // 💎 PREMIUM - Premium Users
    premium: [
        '917289881303@s.whatsapp.net',  // FAHIM
    ]
}

// Freeze to prevent runtime modification
Object.freeze(authority)
Object.freeze(authority.supreme)
Object.freeze(authority.owners)
Object.freeze(authority.premium)

// Check levels
export function isSupreme(sender) {
    return authority.supreme.some(id => sender.includes(id))
}

export function isOwner(sender) {
    return authority.owners.some(id => sender.includes(id)) || isSupreme(sender)
}

export function isPremium(sender) {
    return authority.premium.some(id => sender.includes(id)) || isOwner(sender)
}

export default authority