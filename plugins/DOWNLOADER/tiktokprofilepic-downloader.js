// ═══════════════════════════════════════════════
// 🎀 FIZA — TikTok Profile Picture Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}pptiktok <username>*\n\nExample: ${usedPrefix}pptiktok khaby.lame`)

    // Remove @ if user adds it
    let username = text.replace('@', '').trim()

    m.reply('📸 *Fetching TikTok profile picture...*')

    try {
        // API 1: LolHuman
        let res = await fetch(`https://api.lolhuman.xyz/api/pptiktok/${username}?apikey=GataDios`)
        let buffer = await res.buffer()

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📸 *TIKTOK PP* ──╮
│ 👤 @${username}
│ 🖼️ Profile Picture
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        }, { quoted: m })

    } catch {
        // API 2: Fallback
        try {
            let res2 = await fetch(`https://api.siputzx.my.id/api/dl/tiktokprofile?username=${username}`)
            let data2 = await res2.json()

            if (data2.status && data2.data?.avatar) {
                await conn.sendMessage(m.chat, {
                    image: { url: data2.data.avatar },
                    caption: `📸 *TikTok PP*\n👤 ${username}\n🧁 FIZA`
                }, { quoted: m })
                return
            }
        } catch {}

        m.reply('❌ Failed to fetch profile picture! User may not exist.')
    }
}

handler.help = ['pptiktok', 'tiktokpp', 'ttpp', 'tiktokfoto']
handler.tags = ['downloader']
handler.command = /^(pptiktok|tiktokpp|ttpp|tiktokfoto)$/i

export default handler