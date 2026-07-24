// ═══════════════════════════════════════════════
// 🎀 FIZA — AFK Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, command, args, isOwner }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    let db = global.db.data
    if (!db.users) db.users = {}

    let user = db.users[m.sender]
    if (!user) {
        db.users[m.sender] = {}
        user = db.users[m.sender]
    }

    // ═══════════════════════════════════════════════
    // SET AFK
    // ═══════════════════════════════════════════════
    let reason = text.trim() || 'AFK 💤'

    user.afk = {
        time: Date.now(),
        reason: reason
    }
    await global.db.write()

    return m.reply(`${BORDER_TOP}
╭── 💤 *AFK ON* ──╮
│ 😴 @${m.sender.split('@')[0]} is now AFK
│ 📝 Reason: ${reason}
│ ⏰ ${new Date().toLocaleTimeString()}
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`, null, { mentions: [m.sender] })
}

// ═══════════════════════════════════════════════
// AFK DETECTION (runs on every message)
// ═══════════════════════════════════════════════
export async function before(m, { conn }) {
    if (!m.sender || m.fromMe || m.isBaileys) return

    let db = global.db.data
    if (!db.users) return

    // Skip if user is setting AFK themselves
    let userAFK = db.users[m.sender]
    if (!userAFK?.afk) return

    // ── Someone mentioned an AFK user ──────────
    if (m.mentionedJid?.length) {
        for (let jid of m.mentionedJid) {
            let mentionedUser = db.users[jid]
            if (mentionedUser?.afk) {
                let afkTime = mentionedUser.afk.time
                let duration = formatDuration(Date.now() - afkTime)
                return m.reply(`${BORDER_TOP}
╭── 💤 *AFK* ──╮
│ 😴 @${jid.split('@')[0]} is AFK
│ 📝 ${mentionedUser.afk.reason}
│ ⏰ Since: ${duration}
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`, null, { mentions: [jid] })
            }
        }
    }

    // ── Someone replied to AFK user ────────────
    if (m.quoted?.sender) {
        let quotedUser = db.users[m.quoted.sender]
        if (quotedUser?.afk) {
            let afkTime = quotedUser.afk.time
            let duration = formatDuration(Date.now() - afkTime)
            return m.reply(`${BORDER_TOP}
╭── 💤 *AFK* ──╮
│ 😴 @${m.quoted.sender.split('@')[0]} is AFK
│ 📝 ${quotedUser.afk.reason}
│ ⏰ Since: ${duration}
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`, null, { mentions: [m.quoted.sender] })
        }
    }
}

// ═══════════════════════════════════════════════
// AUTO REMOVE AFK on message
// ═══════════════════════════════════════════════
export async function all(m, { conn }) {
    if (!m.sender || m.fromMe || m.isBaileys) return

    let db = global.db.data
    if (!db.users) return

    let user = db.users[m.sender]
    if (!user?.afk) return

    let duration = formatDuration(Date.now() - user.afk.time)
    delete user.afk
    await global.db.write()

    return conn.sendMessage(m.chat, {
        text: `${BORDER_TOP}
╭── 👋 *WELCOME BACK* ──╮
│ 💗 @${m.sender.split('@')[0]} is back!
│ ⏰ AFK for: ${duration}
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`,
        mentions: [m.sender]
    })
}

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

function formatDuration(ms) {
    let sec = Math.floor(ms / 1000)
    let min = Math.floor(sec / 60)
    let hr = Math.floor(min / 60)
    let day = Math.floor(hr / 24)

    if (day > 0) return `${day}d ${hr % 24}h`
    if (hr > 0) return `${hr}h ${min % 60}m`
    if (min > 0) return `${min}m ${sec % 60}s`
    return `${sec}s`
}

handler.help = ['afk']
handler.tags = ['main']
handler.command = ['afk']

export default handler