// ═══════════════════════════════════════════════
// 🎀 FIZA — Welcome Plugin (Owner Only - Fixed)
// ═══════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = path.join(__dirname, '../../database/welcome.json')
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
    } catch { return getFizaThumb() }
}

let handler = async (m, { conn, args, isOwner, isROwner, groupMetadata, participants }) => {

    // 🔥 Fixed group check
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')

    let db = loadDB()
    let sub = args[0]?.toLowerCase()

    if (!sub) {
        let status = db[m.chat] ? '✅ ON' : '❌ OFF'
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🌸 *WELCOME*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📊 Status: ${status}\n\n📝 .welcome on\n📝 .welcome off\n📝 .welcome @user\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }

    if (sub === 'on') { db[m.chat] = true; saveDB(db); return m.reply('✅ Welcome ON!') }
    if (sub === 'off') { delete db[m.chat]; saveDB(db); return m.reply('❌ Welcome OFF!') }

    let target = m.mentionedJid?.[0] || m.quoted?.sender
    if (target) {
        let thumb = await getProfilePic(conn, target)
        let name = target.split('@')[0]
        let botName = global.botname || 'FIZA'

        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎀 *WELCOME* 🎀 ──╮
│ 👋 Hey @${name}!
│ 💖 Welcome to ${groupMetadata?.subject || 'Group'}
│ 👥 Members: ${participants?.length || '?'}
│ 🌸 Enjoy your stay~
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        await conn.sendMessage(m.chat, {
            text: txt, mentions: [target],
            contextInfo: thumb ? { externalAdReply: { title: `🌸 Welcome ${name}`, thumbnail: thumb, mediaType: 1 } } : {}
        })
        return
    }

    return m.reply('📝 .welcome on | .welcome off | .welcome @user')
}

handler.help = ['welcome']
handler.tags = ['owner']
handler.command = ['welcome']
handler.owner = true

export default handler