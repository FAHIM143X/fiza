// ═══════════════════════════════════════════════
// 🎀 FIZA — Per Group ON/OFF Plugin (Fixed)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isOwner, isROwner }) => {

    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')

    let db = global.db
    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    let gc = db.data.chats[m.chat]
    let botName = global.botname || 'FIZA'

    let currentMode = gc.muted ? '🔴 OFF' : gc.adminMode ? '🛡️ Admin Only' : gc.selfMode ? '🔒 Owner Only' : '🟢 ON'

    let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 👥 *GROUP MODE* ──╮
│ 🤖 Bot: ${botName}
│ 📊 Current: ${currentMode}
│
│ 💡 Change group mode:
│ 🟢 ON → Everyone
│ 🛡️ Admin → Admins only
│ 🔒 Owner → Only you
│ 🔴 OFF → Disabled
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '💗 Change group mode~',
        buttons: [{
            buttonId: 'gcmode_select',
            buttonText: { displayText: '⚡ Change Mode' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '👥 Group Mode',
                    sections: [{
                        title: '📋 Select Mode',
                        rows: [
                            { title: '🟢 ON', description: 'Everyone can use bot', id: 'gcmode_on' },
                            { title: '🛡️ Admin Only', description: 'Only admins can use', id: 'gcmode_admin' },
                            { title: '🔒 Owner Only', description: 'Only you can use', id: 'gcmode_owner' },
                            { title: '🔴 OFF', description: 'Bot disabled here', id: 'gcmode_off' },
                        ]
                    }]
                })
            }
        }],
        headerType: 1,
        viewOnce: true
    }, { quoted: m })
}

// 🔘 Handle button taps - Single response
handler.before = async (m, { conn }) => {
    let flow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
    if (!flow) return

    // 🔥 Silent check - only process if owner, otherwise IGNORE
    let sender = m.sender || m.key?.participant || m.key?.remoteJid
    let ownerNumbers = global.ownerNumber || []
    let isOwner = ownerNumbers.some(num => sender.includes(num))
    
    if (!isOwner) return // Silently ignore non-owners

    if (!m.chat?.endsWith('@g.us')) return

    let db = global.db
    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    let gc = db.data.chats[m.chat]

    try {
        let params = JSON.parse(flow.paramsJson || '{}')
        let id = params.id || ''

        if (id === 'gcmode_on') {
            gc.muted = false; gc.adminMode = false; gc.selfMode = false
            await db.write()
            return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🟢 *Group ON!*\n✨ Everyone can use bot here!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
        }
        if (id === 'gcmode_admin') {
            gc.muted = false; gc.adminMode = true; gc.selfMode = false
            await db.write()
            return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🛡️ *Admin Only!*\n👥 Only admins can use bot!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
        }
        if (id === 'gcmode_owner') {
            gc.muted = false; gc.adminMode = false; gc.selfMode = true
            await db.write()
            return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔒 *Owner Only!*\n👑 Only you can use bot!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
        }
        if (id === 'gcmode_off') {
            gc.muted = true; gc.adminMode = false; gc.selfMode = false
            await db.write()
            return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔴 *Group OFF!*\n🔇 Bot disabled here!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
        }
    } catch (e) {}
}

handler.help = ['groupmode', 'gcmode']
handler.tags = ['owner']
handler.command = ['groupmode', 'gcmode']
handler.owner = true

export default handler