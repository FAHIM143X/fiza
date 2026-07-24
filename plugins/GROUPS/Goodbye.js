// ═══════════════════════════════════════════════
// 🎀 FIZA — Goodbye Plugin
// ═══════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = path.join(__dirname, '../../database/goodbye.json')
const FIZA_PNG = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.png')
const FIZA_JPG = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.jpg')

function loadDB() {
    if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '{}')
    try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) } catch { return {} }
}
function saveDB(data) { fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2)) }

function getFizaThumb() {
    if (fs.existsSync(FIZA_PNG)) return fs.readFileSync(FIZA_PNG)
    if (fs.existsSync(FIZA_JPG)) return fs.readFileSync(FIZA_JPG)
    return null
}

async function getProfilePic(sock, jid) {
    try {
        let url = await sock.profilePictureUrl(jid, 'image')
        let res = await fetch(url)
        return Buffer.from(await res.arrayBuffer())
    } catch {
        return getFizaThumb()
    }
}

let handler = async (m, { conn, args, isAdmin, isOwner, isGroup, groupMetadata, participants }) => {

    if (!isGroup) return m.reply('｡ﾟ•┈୨💖୧┈•ﾟ｡\n👥 *Group only!*\n｡ﾟ•┈୨🌸୧┈•ﾟ｡')
    if (!isAdmin && !isOwner) return m.reply('｡ﾟ•┈୨💖୧┈•ﾟ｡\n🛡️ *Admin or Owner only!*\n｡ﾟ•┈୨🌸୧┈•ﾟ｡')

    let db = loadDB()
    let sub = args[0]?.toLowerCase()

    // Show status
    if (!sub) {
        let status = db[m.chat] ? '✅ ON' : '❌ OFF'
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n👋 *GOODBYE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📊 Status: ${status}\n\n📝 .goodbye on\n📝 .goodbye off\n📝 .goodbye @user\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }

    // Toggle ON
    if (sub === 'on') {
        db[m.chat] = true; saveDB(db)
        return m.reply('｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ Goodbye ON!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡')
    }

    // Toggle OFF
    if (sub === 'off') {
        delete db[m.chat]; saveDB(db)
        return m.reply('｡ﾟ•┈୨💖୧┈•ﾟ｡\n❌ Goodbye OFF!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡')
    }

    // Manual goodbye @user
    let target = m.mentionedJid?.[0] || m.quoted?.sender
    if (target) {
        let thumb = await getProfilePic(conn, target)
        let name = target.split('@')[0]
        let botName = global.botname || 'FIZA'

        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 👋 *GOODBYE* ──╮
│ 💔 @${name} left!
│ 👥 ${groupMetadata.subject}
│ 📊 ${participants.length} members
│ 🧁 Bye bye~
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        await conn.sendMessage(m.chat, {
            text: txt,
            mentions: [target],
            contextInfo: thumb ? {
                externalAdReply: {
                    title: `👋 Goodbye ${name}`,
                    body: `👥 ${participants.length} members`,
                    thumbnail: thumb,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: false
                }
            } : {}
        })
        return
    }

    return m.reply('📝 .goodbye on | .goodbye off | .goodbye @user')
}

handler.help = ['goodbye', 'bye']
handler.tags = ['group', 'admin']
handler.command = ['goodbye', 'bye']
handler.admin = true
handler.group = true

export default handler