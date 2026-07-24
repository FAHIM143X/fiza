// ═══════════════════════════════════════════════
// 🎀 FIZA — Sudo Manager Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isOwner, command }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'
    const DIVIDER = '💗━━━━━━⊱💖⊰━━━━━━💗'

    if (!isOwner) {
        return m.reply(`${BORDER_TOP}\n👑 *Only the supreme owner can manage sudo!*\n${BORDER_BOTTOM}`)
    }

    let db = global.db.data
    if (!db.fizaDB.sudoUsers) db.fizaDB.sudoUsers = []

    let sub = args[0]?.toLowerCase()

    // Show sudo list
    if (!sub) {
        if (db.fizaDB.sudoUsers.length === 0) {
            return m.reply(`${BORDER_TOP}
╭── 👑 *SUDO LIST* ──╮
│ ✨ No sudo users yet~
│ 💗 Add with .sudo add
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`)
        }

        let list = db.fizaDB.sudoUsers.map(([num, name], i) => `│ ${i + 1}. @${num} ~ ${name || 'Sudo'}`).join('\n')
        return m.reply(`${BORDER_TOP}
╭── 👑 *SUDO LIST* ──╮
${list}
│ 💗 Total: ${db.fizaDB.sudoUsers.length} sudo users
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`, null, { mentions: db.fizaDB.sudoUsers.map(v => v[0] + '@s.whatsapp.net') })
    }

    // Add sudo
    if (sub === 'add') {
        let target = m.mentionedJid?.[0] || (args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
        if (!target) return m.reply(`${BORDER_TOP}\n💬 *Tag user or provide number!*\n📝 .sudo add @user\n${BORDER_BOTTOM}`)

        let num = target.split('@')[0]
        let name = target.split('@')[0]

        if (db.fizaDB.sudoUsers.some(([n]) => n === num)) {
            return m.reply(`${BORDER_TOP}\n✨ *Already a sudo user!*\n${BORDER_BOTTOM}`)
        }

        db.fizaDB.sudoUsers.push([num, name])
        await global.db.write()

        return m.reply(`${BORDER_TOP}
╭── 👑 *SUDO ADDED* ──╮
│ ✨ @${num} is now sudo!
│ 💗 They have owner powers~
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`, null, { mentions: [target] })
    }

    // Remove sudo
    if (sub === 'remove' || sub === 'rm') {
        let target = m.mentionedJid?.[0] || (args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
        if (!target) return m.reply(`${BORDER_TOP}\n💬 *Tag user or provide number!*\n📝 .sudo remove @user\n${BORDER_BOTTOM}`)

        let num = target.split('@')[0]
        let idx = db.fizaDB.sudoUsers.findIndex(([n]) => n === num)

        if (idx === -1) {
            return m.reply(`${BORDER_TOP}\n😿 *Not a sudo user!*\n${BORDER_BOTTOM}`)
        }

        db.fizaDB.sudoUsers.splice(idx, 1)
        await global.db.write()

        return m.reply(`${BORDER_TOP}
╭── 👑 *SUDO REMOVED* ──╮
│ 💔 @${num} lost sudo!
│ 😿 Powers revoked~
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`, null, { mentions: [target] })
    }

    return m.reply(`${BORDER_TOP}
👑 *SUDO COMMANDS*
${DIVIDER}

📝 .sudo — Show sudo list
📝 .sudo add @user — Add sudo
📝 .sudo remove @user — Remove sudo

💗 Only supreme owner can manage!
${BORDER_BOTTOM}`)
}

handler.help = ['sudo']
handler.tags = ['owner']
handler.command = ['sudo']
handler.owner = true

export default handler