// ═══════════════════════════════════════════════
// 🎀 FIZA - Alive Plugin (externalAdReply only)
// ═══════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import '../../settings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FIZA_PIC = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.png')
const FIZA_JPG = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.jpg')

async function getFizaThumb() {
    if (fs.existsSync(FIZA_PIC)) return fs.readFileSync(FIZA_PIC)
    if (fs.existsSync(FIZA_JPG)) return fs.readFileSync(FIZA_JPG)
    try {
        const res = await axios.get('https://files.catbox.moe/9laft3.jpg', { responseType: 'arraybuffer' })
        return Buffer.from(res.data)
    } catch {}
    return null
}

let handler = async (m, { conn, botname }) => {
    const chatId = m.chat
    const botName = botname || global.botname || 'FIZA'
    const ownerName = 'FAHIM'
    
    const thumb = await getFizaThumb()

    const aliveText = `｡ﾟ•┈୨💖୧┈•ﾟ｡
🍓 𝙃𝙚𝙮 𝘽𝙖𝙠𝙖~ 𝙄'𝙢 𝙖𝙡𝙞𝙫𝙚!
🤖 *${botName}* 𝙞𝙨 𝙧𝙪𝙣𝙣𝙞𝙣𝙜 24/7!
🧁 𝘾𝙪𝙩𝙚, 𝙘𝙧𝙖𝙯𝙮, 𝙖𝙣𝙙 𝙖𝙡𝙬𝙖𝙮𝙨 𝙝𝙚𝙧𝙚 𝙛𝙤𝙧 𝙮𝙤𝙪~
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    // 🔥 TEXT ONLY - Image in externalAdReply
    await conn.sendMessage(chatId, {
        text: aliveText,
        contextInfo: {
            externalAdReply: {
                title: `🌸 ${botName}`,
                body: `👑 Owner: ${ownerName}`,
                mediaType: 1,
                thumbnail: thumb || undefined,
                renderLargerThumbnail: false,
                showAdAttribution: false,
                sourceUrl: 'https://github.com/iblamefahim'
            }
        }
    }, { quoted: m })
}

handler.help = ['alive', 'on', 'status']
handler.tags = ['main']
handler.command = /^(alive|on|status)$/i
handler.limit = false
handler.register = false

export default handler