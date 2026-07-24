// ═══════════════════════════════════════════════
// 🎀 FIZA — Ship Plugin (1280x720)
// ═══════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Jimp from 'jimp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.join(__dirname, '..', '..')
const TEMP_DIR = path.join(ROOT_DIR, 'temp')
const BG_PATH = path.join(ROOT_DIR, 'fizamedia', 'pictures', 'shipbackground.jpg')
const HEART_PATH = path.join(ROOT_DIR, 'fizamedia', 'pictures', 'heart.png')
const DEFAULT_PFP = path.join(ROOT_DIR, 'fizamedia', 'pictures', 'fiza.png') || path.join(ROOT_DIR, 'fizamedia', 'pictures', 'fiza.jpg')

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true })

// 🔥 1280x720 ratio
const CANVAS_W = 1280
const CANVAS_H = 720
const PFP_SIZE = 380
const HEART_SIZE = 380
const LEFT_X = 100
const RIGHT_X = 800
const Y_POS = 160

let cachedBg = null, heartMask = null, defaultAv = null

try {
    if (fs.existsSync(BG_PATH)) cachedBg = (await Jimp.read(BG_PATH)).resize(CANVAS_W, CANVAS_H)
    if (fs.existsSync(HEART_PATH)) heartMask = (await Jimp.read(HEART_PATH)).resize(HEART_SIZE, HEART_SIZE)
    if (fs.existsSync(DEFAULT_PFP)) {
        defaultAv = (await Jimp.read(DEFAULT_PFP)).resize(PFP_SIZE, PFP_SIZE)
        if (heartMask) defaultAv = defaultAv.mask(heartMask.clone(), 0, 0)
    }
} catch (e) {}

async function getPfp(jid, conn) {
    try {
        let url = await conn.profilePictureUrl(jid, 'image').catch(() => null)
        if (!url) return null
        let res = await fetch(url)
        return Buffer.from(await res.arrayBuffer())
    } catch { return null }
}

let handler = async (m, { conn, participants }) => {

    if (!m.chat?.endsWith('@g.us')) {
        return m.reply('｡ﾟ•┈୨💖୧┈•ﾟ｡\n👥 *Group only!*\n｡ﾟ•┈୨🌸୧┈•ﾟ｡')
    }

    if (!cachedBg) return m.reply('❌ Background not found! Put shipbackground.jpg in fizamedia/pictures/')

    // ⚡ Start timer
    const startTime = Date.now()

    let botJid = conn.user?.id
    let mentioned = m.mentionedJid?.filter(j => j !== botJid) || []

    let user1, user2, shipMode = ''

    if (mentioned.length >= 2) {
        [user1, user2] = mentioned.slice(0, 2)
        shipMode = 'tagged'
    } else if (mentioned.length === 1) {
        user1 = m.sender
        user2 = mentioned[0]
        shipMode = 'half'
    } else {
        let pool = participants.filter(p => p.id !== botJid).map(p => p.id).sort(() => Math.random() - 0.5)
        if (pool.length < 2) return m.reply('🍓 Need at least 2 members!')
        user1 = pool[0]
        user2 = pool[1]
        shipMode = 'random'
    }

    let getName = (jid) => {
        let p = participants.find(p => p.id === jid)
        let name = p?.notify || p?.name || jid.split('@')[0]
        return name.length > 15 ? name.slice(0, 15) : name
    }

    let name1 = getName(user1), name2 = getName(user2)
    let tag1 = '@' + user1.split('@')[0], tag2 = '@' + user2.split('@')[0]

    let percent = 60 + Math.floor(Math.random() * 36)
    if (name1[0]?.toLowerCase() === name2[0]?.toLowerCase()) percent += 5
    percent = Math.min(percent, 99)

    let result, emoji, love
    if (percent >= 95) { result = '💘 SOULMATES'; emoji = '💘'; love = 'Made for each other!' }
    else if (percent >= 85) { result = '💖 PERFECT MATCH'; emoji = '💖'; love = 'A match made in heaven!' }
    else if (percent >= 75) { result = '💕 SWEET COUPLE'; emoji = '💕'; love = 'Such a sweet connection!' }
    else if (percent >= 65) { result = '🥰 CUTE COUPLE'; emoji = '🥰'; love = 'Adorable together!' }
    else { result = '🌸 GOOD FRIENDS'; emoji = '🌸'; love = 'Friendship is precious!' }

    try {
        let [pfp1, pfp2] = await Promise.all([getPfp(user1, conn), getPfp(user2, conn)])
        let bg = cachedBg.clone()

        let av1 = null, av2 = null
        if (pfp1) { let img = (await Jimp.read(pfp1)).resize(PFP_SIZE, PFP_SIZE); av1 = heartMask ? img.mask(heartMask.clone(), 0, 0) : img.circle() }
        else if (defaultAv) av1 = defaultAv.clone()

        if (pfp2) { let img = (await Jimp.read(pfp2)).resize(PFP_SIZE, PFP_SIZE); av2 = heartMask ? img.mask(heartMask.clone(), 0, 0) : img.circle() }
        else if (defaultAv) av2 = defaultAv.clone()

        if (av1) bg.composite(av1, LEFT_X, Y_POS)
        if (av2) bg.composite(av2, RIGHT_X, Y_POS)

        let imageBuffer = await bg.getBufferAsync(Jimp.MIME_PNG)

        let bar = Math.floor(percent / 10)
        let barText = '┃' + '█'.repeat(bar) + '░'.repeat(10 - bar) + '┃'

        let rand = shipMode === 'random' ? '\n🎲 *Random Ship!*' : ''

        let caption = `｡ﾟ•┈୨💖୧┈•ﾟ｡
${emoji} *${tag1}*  ✖  *${tag2}* ${emoji}

${barText}  💘 *${percent}%*
🌟 ${result}
💌 ${love}${rand}
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        await conn.sendMessage(m.chat, {
            image: imageBuffer,
            caption: caption,
            mentions: [user1, user2]
        }, { quoted: m })

        // ⚡ Speed log
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
        console.log(`[ship] ${shipMode} | ${name1} ✖ ${name2} | ${percent}% | ⚡ ${elapsed}s`)

    } catch (e) {
        console.log('[SHIP ERROR]', e)
        m.reply('❌ Failed!')
    }
}

handler.help = ['ship', 'couple', 'love']
handler.tags = ['fun']
handler.command = ['ship', 'couple', 'love']
handler.group = true

export default handler