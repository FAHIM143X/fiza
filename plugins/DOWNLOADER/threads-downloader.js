// ═══════════════════════════════════════════════
// 🎀 FIZA — Threads Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}threads <url>*\n\nExample: ${usedPrefix}threads https://www.threads.net/@user/post/xxx`)

    if (!text.includes('threads.net')) return m.reply('❌ Please provide a valid Threads URL!')

    m.reply('🧵 *Downloading from Threads...*')

    try {
        let res = await fetch(`https://delirius-apiofc.vercel.app/download/threads?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data) {
            let d = data.data
            
            // Send info
            await m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🧵 *THREADS* ──╮
│ 👤 ${d.username || 'Unknown'}
│ 💬 ${(d.description || '').slice(0, 100)}
│ ❤️ ${d.likes || 0} likes
│ ✅ ${d.is_verified ? 'Verified' : 'Not verified'}
│ 📁 ${d.media?.length || 0} files
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)

            // Send media
            if (d.media && d.media.length > 0) {
                for (let item of d.media) {
                    if (item.type === 'image') {
                        await conn.sendMessage(m.chat, {
                            image: { url: item.url },
                            caption: '🧵 Threads Image'
                        }, { quoted: m })
                    } else if (item.type === 'video') {
                        await conn.sendMessage(m.chat, {
                            video: { url: item.url },
                            caption: '🧵 Threads Video'
                        }, { quoted: m })
                    }
                }
            } else {
                m.reply('❌ No media found!')
            }
        } else {
            m.reply('❌ Failed to fetch!')
        }

    } catch {
        // Fallback API
        try {
            let res2 = await fetch(`https://api.siputzx.my.id/api/dl/threads?url=${encodeURIComponent(text)}`)
            let data2 = await res2.json()
            
            if (data2.status && data2.data) {
                for (let media of data2.data.media || []) {
                    if (media.url) {
                        await conn.sendMessage(m.chat, {
                            [media.type === 'video' ? 'video' : 'image']: { url: media.url },
                            caption: `🧵 *Threads*\n👤 ${data2.data.username || 'User'}\n🧁 FIZA`
                        }, { quoted: m })
                    }
                }
                return
            }
            m.reply('❌ Failed!')
        } catch {
            m.reply('❌ Failed to download!')
        }
    }
}

handler.help = ['threads', 'thread', 'threaddl']
handler.tags = ['downloader']
handler.command = /^(threads|thread|threaddl|threadsd)$/i

export default handler