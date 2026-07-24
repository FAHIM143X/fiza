// ═══════════════════════════════════════════════
// 🎀 FIZA — Couple PFP Plugin (Split Version)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'
import sharp from 'sharp'

let handler = async (m, { conn, args }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    try {
        // Fetch couple images
        let male = await fetch('https://api.waifu.pics/sfw/couple-male')
        let maleJson = await male.json()

        let female = await fetch('https://api.waifu.pics/sfw/couple-female')
        let femaleJson = await female.json()

        if (!maleJson.url || !femaleJson.url) {
            return m.reply(`${BORDER_TOP}\n😿 *Failed to fetch!*\n${BORDER_BOTTOM}`)
        }

        // Send male PFP
        await conn.sendMessage(m.chat, {
            image: { url: maleJson.url },
            caption: `${BORDER_TOP}
╭── 👦 *HIS PFP* ──╮
│ 💗 Couple PFP #1
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`
        })

        // Send female PFP
        await conn.sendMessage(m.chat, {
            image: { url: femaleJson.url },
            caption: `${BORDER_TOP}
╭── 👧 *HER PFP* ──╮
│ 💗 Couple PFP #2
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`
        })

    } catch (e) {
        return m.reply(`${BORDER_TOP}\n❌ *Error! Try again~*\n${BORDER_BOTTOM}`)
    }
}

handler.help = ['couplepfp']
handler.tags = ['fun', 'anime']
handler.command = ['couplepfp', 'couple']

export default handler