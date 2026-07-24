// ═══════════════════════════════════════════════
// 🎀 FIZA — AI Image Generator Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    let prompt = text?.trim()

    if (!prompt) {
        return m.reply(`${BORDER_TOP}
🖌️ *AI ART PROMPT MISSING!*

📌 Usage:
.aigen A girl standing in neon rain with a sword

💡 Be descriptive for better results!
${BORDER_BOTTOM}`)
    }

    // Send reaction
    try {
        await conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } })
    } catch {}

    try {
        let apiUrl = `https://api.shizo.top/api/ai/imagine?apikey=shizo&prompt=${encodeURIComponent(prompt)}`
        let res = await fetch(apiUrl)
        let imageUrl = res.url

        if (!imageUrl) throw new Error('Image generation failed')

        let caption = `
╭━━━〔 🎨 𝗔𝗜 𝗔𝗥𝗧 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘𝗗 〕━━━╮
💡 *Prompt:* ${prompt}
🧠 *Model:* Imagine AI
📸 *Requested by:* ${m.pushName || 'User'}
🔗 *Status:* SUCCESS ✅
╰━━━〔 ⚡ FIZA 〕━━━╯
`.trim()

        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `${BORDER_TOP}\n${caption}\n${BORDER_BOTTOM}`
        }, { quoted: m })

    } catch (e) {
        console.error('AIGEN Plugin Error:', e)
        return m.reply(`${BORDER_TOP}
❌ *Failed to generate image.*
📴 Try again later or change prompt.
${BORDER_BOTTOM}`)
    }
}

handler.help = ['aigen', 'aiart', 'aimage']
handler.tags = ['ai']
handler.command = ['aigen', 'aiart', 'aimage']

export default handler