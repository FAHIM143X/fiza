// ═══════════════════════════════════════════════
// 🎀 FIZA — Wallpaper Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}wallpaper Minecraft*`)

    m.reply(`🔍 *Searching wallpapers for:* ${text}`)

    try {
        // API 1: Wallhaven
        let res = await fetch(`https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(text)}`)
        let data = await res.json()
        
        if (data.data && data.data.length > 0) {
            let img = data.data[Math.floor(Math.random() * data.data.length)]
            await conn.sendMessage(m.chat, {
                image: { url: img.path },
                caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🖼️ *WALLPAPER* ──╮
│ 🔍 ${text}
│ 📐 ${img.resolution}
│ 👁️ ${img.views} views
│ ❤️ ${img.favorites} likes
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
            }, { quoted: m })
            return
        }
    } catch {}

    try {
        // API 2: Picsum (fallback)
        let url = `https://picsum.photos/1280/720?random=${Math.floor(Math.random() * 100)}`
        await conn.sendMessage(m.chat, {
            image: { url },
            caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n🖼️ *WALLPAPER*\n🔍 ${text}\n🧁 FIZA\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed to fetch wallpaper!')
    }
}

handler.help = ['wallpaper', 'wp']
handler.tags = ['downloader', 'search']
handler.command = /^(wallpaper|wp)$/i

export default handler