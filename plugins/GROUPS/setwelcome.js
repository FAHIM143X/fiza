// ═══════════════════════════════════════════════
// 🎀 FIZA — Set Welcome Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isAdmin, isOwner, isGroup, groupMetadata }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!isGroup) return m.reply(`${BORDER_TOP}\n👥 *Group only!*\n${BORDER_BOTTOM}`)
    if (!isAdmin && !isOwner) return m.reply(`${BORDER_TOP}\n🛡️ *Admin or Owner only!*\n${BORDER_BOTTOM}`)

    let db = global.db.data
    if (!db.chats[m.chat]) db.chats[m.chat] = {}
    let chat = db.chats[m.chat]

    let sub = args[0]?.toLowerCase()
    let text = args.slice(1).join(' ')

    // Show status
    if (!sub) {
        let status = chat.welcome ? '✅ ON' : '❌ OFF'
        let msg = chat.sWelcome || `🎉 Welcome @user!\n💗 Glad you joined @subject`
        return m.reply(`${BORDER_TOP}
╭── 🎉 *WELCOME* ──╮
│ 📊 Status: ${status}
│ 💬 Message:
│ ${msg}
│
│ 📝 .setwelcome on
│ 📝 .setwelcome off
│ 📝 .setwelcome msg <text>
│ 📝 .setwelcome test
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`)
    }

    // Toggle ON
    if (sub === 'on') {
        chat.welcome = true
        await global.db.write()
        return m.reply(`${BORDER_TOP}\n✅ *Welcome ON!*\n${BORDER_BOTTOM}`)
    }

    // Toggle OFF
    if (sub === 'off') {
        chat.welcome = false
        await global.db.write()
        return m.reply(`${BORDER_TOP}\n❌ *Welcome OFF!*\n${BORDER_BOTTOM}`)
    }

    // Set custom message
    if (sub === 'msg') {
        if (!text) return m.reply(`${BORDER_TOP}\n💬 *Provide a message!*\n📝 .setwelcome msg <text>\n\n📌 @user @subject @count\n${BORDER_BOTTOM}`)
        chat.sWelcome = text
        await global.db.write()
        return m.reply(`${BORDER_TOP}\n✨ *Welcome message set!*\n${BORDER_BOTTOM}`)
    }

    // Test preview
    if (sub === 'test') {
        let preview = (chat.sWelcome || `🎉 Welcome @user!\n💗 Glad you joined @subject`)
            .replace('@user', '@' + m.sender.split('@')[0])
            .replace('@subject', groupMetadata.subject)
            .replace('@count', groupMetadata.participants.length)
        return m.reply(preview, null, { mentions: [m.sender] })
    }

    return m.reply(`${BORDER_TOP}\n📝 .setwelcome on/off/msg/test\n${BORDER_BOTTOM}`)
}

handler.help = ['setwelcome', 'setwel']
handler.tags = ['group', 'admin']
handler.command = ['setwelcome', 'setwel']
handler.admin = true
handler.group = true

export default handler