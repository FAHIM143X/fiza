// ═══════════════════════════════════════════════
// 🎀 FIZA — Hack Plugin (Prank)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    if (!text) return m.reply('📝 .hack @user')
    
    let steps = [
        `🔍 *Starting hack on @${name}...*`,
        `📡 Connecting to server... █▒▒▒▒▒▒▒▒▒ 10%`,
        `🔑 Cracking password... ███▒▒▒▒▒▒▒ 30%`,
        `📱 Accessing WhatsApp... █████▒▒▒▒▒ 50%`,
        `📸 Downloading photos... ███████▒▒▒ 70%`,
        `💰 Stealing money... █████████▒ 90%`,
        `✅ *Hack complete!*\n\n👤 @${name} hacked!\n📱 Phone: Samsung\n💰 Balance: $0.00\n📸 Photos: 420\n🔑 Password: ********`,
    ]
    
    for (let step of steps) {
        await conn.sendMessage(m.chat, { text: step, mentions: [who] })
        await new Promise(r => setTimeout(r, 1000))
    }
}

handler.help = ['hack']; handler.tags = ['fun']; handler.command = ['hack']
export default handler