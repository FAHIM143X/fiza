// ═══════════════════════════════════════════════
// 🎀 FIZA — Request Feature Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    let botName = global.botname || 'FIZA'
    let ownerNumber = global.ownerNumber?.[0] || '917289881303'
    
    if (!text) return m.reply('📝 .request Add a music downloader!')
    
    let request = `💡 *FEATURE REQUEST*\n\n👤 From: @${m.sender.split('@')[0]}\n💬 ${text}`
    let ownerJid = ownerNumber + '@s.whatsapp.net'
    
    await conn.sendMessage(ownerJid, { text: request, mentions: [m.sender] })
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Request sent!*\n💗 I'll consider it!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['request', 'feature']
handler.tags = ['main']
handler.command = ['request', 'feature', 'suggest']
export default handler