// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner VCard Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    let ownerName = global.author || 'FAHIM'
    let ownerNumber = global.ownerNumber?.[0] || '917289881303'
    
    let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;waid=${ownerNumber}:+${ownerNumber}
END:VCARD`

    await conn.sendMessage(m.chat, {
        contacts: { 
            displayName: `👑 ${ownerName}`, 
            contacts: [{ vcard }] 
        }
    }, { quoted: m })
}

handler.help = ['owner', 'creator', 'dev']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'dev', 'fahim']

export default handler