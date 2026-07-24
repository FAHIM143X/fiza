import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FIZA_PNG = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.png')
const FIZA_JPG = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.jpg')

function getThumb() {
    if (fs.existsSync(FIZA_PNG)) return fs.readFileSync(FIZA_PNG)
    if (fs.existsSync(FIZA_JPG)) return fs.readFileSync(FIZA_JPG)
    return null
}

let handler = async (m, { conn, args, isOwner, isROwner }) => {

    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')

    // 🔥 Get db from global
    let db = global.db
    if (!db) return m.reply('❌ Database not ready!')

    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    let gc = db.data.chats[m.chat]
    let thumb = getThumb()

    if (!args[0]) {
        let mode = gc.muted ? '🔴 OFF' : gc.adminMode ? '🛡️ Admin' : gc.selfMode ? '🔒 Owner' : '🟢 ON'
        return conn.sendMessage(m.chat, {
            text: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n👥 *GROUP MODE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📊 *Current:* ${mode}\n\n📝 .groupmode on\n📝 .groupmode off\n📝 .groupmode admin\n📝 .groupmode owner\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            contextInfo: {
                externalAdReply: {
                    title: '🌸 FIZA Group Mode',
                    body: '👑 Owner: FAHIM',
                    mediaType: 1,
                    thumbnail: thumb || undefined,
                    renderLargerThumbnail: true,
                    showAdAttribution: false,
                    sourceUrl: 'https://github.com/iblamefahim'
                }
            }
        }, { quoted: m })
    }

    let cmd = args[0].toLowerCase()

    if (cmd === 'on') {
        gc.muted = false; gc.adminMode = false; gc.selfMode = false
        await db.write()
        return conn.sendMessage(m.chat, {
            text: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n🟢 *Group: ON*\n\n✨ FIZA is active!\n💗 Everyone can use~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            contextInfo: {
                externalAdReply: {
                    title: '🌸 FIZA - Group ON',
                    body: '👑 Owner: FAHIM',
                    mediaType: 1,
                    thumbnail: thumb || undefined,
                    renderLargerThumbnail: true,
                    sourceUrl: 'https://github.com/iblamefahim'
                }
            }
        }, { quoted: m })
    }

    if (cmd === 'off') {
        gc.muted = true; gc.adminMode = false; gc.selfMode = false
        await db.write()
        return conn.sendMessage(m.chat, {
            text: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔴 *Group: OFF*\n\n🔇 FIZA is sleeping!\n💤 No commands work~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            contextInfo: {
                externalAdReply: {
                    title: '🌸 FIZA - Group OFF',
                    body: '👑 Owner: FAHIM',
                    mediaType: 1,
                    thumbnail: thumb || undefined,
                    renderLargerThumbnail: true,
                    sourceUrl: 'https://github.com/iblamefahim'
                }
            }
        }, { quoted: m })
    }

    if (cmd === 'admin') {
        gc.muted = false; gc.adminMode = true; gc.selfMode = false
        await db.write()
        return conn.sendMessage(m.chat, {
            text: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n🛡️ *Group: ADMIN ONLY*\n\n👥 Only admins can use!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            contextInfo: {
                externalAdReply: {
                    title: '🌸 FIZA - Admin Only',
                    body: '👑 Owner: FAHIM',
                    mediaType: 1,
                    thumbnail: thumb || undefined,
                    renderLargerThumbnail: true,
                    sourceUrl: 'https://github.com/iblamefahim'
                }
            }
        }, { quoted: m })
    }

    if (cmd === 'owner') {
        gc.muted = false; gc.adminMode = false; gc.selfMode = true
        await db.write()
        return conn.sendMessage(m.chat, {
            text: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔒 *Group: OWNER ONLY*\n\n👑 Only you can use!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            contextInfo: {
                externalAdReply: {
                    title: '🌸 FIZA - Owner Only',
                    body: '👑 Owner: FAHIM',
                    mediaType: 1,
                    thumbnail: thumb || undefined,
                    renderLargerThumbnail: true,
                    sourceUrl: 'https://github.com/iblamefahim'
                }
            }
        }, { quoted: m })
    }

    return m.reply('❓ on | off | admin | owner')
}

handler.command = ['groupmode', 'gcmode']
handler.tags = ['owner']
handler.help = ['groupmode']
handler.owner = true

export default handler