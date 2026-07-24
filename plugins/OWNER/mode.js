// ═══════════════════════════════════════════════
// 🎀 FIZA — Mode Plugin with Buttons (Owner Protected)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isOwner, isROwner }) => {

    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')

    let botName = global.botname || 'FIZA'
    let currentMode = global.opts?.self ? '🔒 Private' : '🌍 Public'

    let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🌸 *BOT MODE* ──╮
│ 🤖 Bot: ${botName}
│ 📊 Current: ${currentMode}
│
│ 💡 Change how bot works:
│ 🌍 Public → Everyone
│ 🔒 Private → Only Owner
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '💗 Change bot mode~',
        buttons: [{
            buttonId: 'mode_select',
            buttonText: { displayText: '⚡ Change Mode' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '🌸 Select Mode',
                    sections: [{
                        title: '📋 Options',
                        rows: [
                            { title: '🌍 Public', description: 'Everyone can use FIZA', id: 'mode_public' },
                            { title: '🔒 Private', description: 'Only you can use FIZA', id: 'mode_private' },
                        ]
                    }]
                })
            }
        }],
        headerType: 1,
        viewOnce: true
    }, { quoted: m })
}

// 🔘 Handle button taps - OWNER CHECK ADDED
handler.before = async (m, { conn }) => {
    let flow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
    if (!flow) return

    // 🔥 CHECK IF SENDER IS OWNER
    let sender = m.sender || m.key?.participant || m.key?.remoteJid
    let ownerNumbers = global.ownerNumber || []
    let isOwner = ownerNumbers.some(num => sender.includes(num))
    
    if (!isOwner) {
        return m.reply('👑 *Only the owner can change mode!*\nThis button is not for you.')
    }

    try {
        let params = JSON.parse(flow.paramsJson || '{}')
        let id = params.id || ''

        if (id === 'mode_public') {
            global.opts.self = false
            return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🌍 *Public Mode!*\n✨ Everyone can use FIZA!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
        }
        if (id === 'mode_private') {
            global.opts.self = true
            return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔒 *Private Mode!*\n👑 Only you can use FIZA!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
        }
    } catch (e) {}
}

handler.help = ['mode']
handler.tags = ['owner']
handler.command = ['mode']
handler.owner = true

export default handler