// ═══════════════════════════════════════════════
// 🎀 FIZA — AI Plugin (GPT + Gemini)
// ═══════════════════════════════════════════════

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, command }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    let prompt = text?.trim()

    if (!prompt) {
        return m.reply(`${BORDER_TOP}
💬 *Please ask something!*

📌 Examples:
.gpt what is Elden Ring?
.gemini tell me a dark joke
${BORDER_BOTTOM}`)
    }

    // Send reaction
    try {
        await conn.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })
    } catch {}

    try {
        // ═══════════════════════════════════════════
        // GPT MODE
        // ═══════════════════════════════════════════
        if (command === 'gpt') {
            let res = await axios.get(`https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(prompt)}`)
            let answer = res.data?.result?.prompt

            if (answer) {
                return m.reply(`💬 ${answer}`)
            }
            throw new Error('GPT response invalid.')
        }

        // ═══════════════════════════════════════════
        // GEMINI MODE (Multiple API fallbacks)
        // ═══════════════════════════════════════════
        if (command === 'gemini') {
            let apis = [
                `https://api.dreaded.site/api/gemini2?text=${encodeURIComponent(prompt)}`,
                `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(prompt)}`,
                `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(prompt)}`,
                `https://vapis.my.id/api/gemini?q=${encodeURIComponent(prompt)}`,
                `https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${encodeURIComponent(prompt)}`,
                `https://api.giftedtech.my.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(prompt)}`
            ]

            for (let api of apis) {
                try {
                    let res = await fetch(api)
                    let json = await res.json()
                    let answer = json.message || json.answer || json.result || json.data || null

                    if (answer) {
                        return m.reply(`${BORDER_TOP}\n🧠 ${answer}\n${BORDER_BOTTOM}`)
                    }
                } catch {
                    continue
                }
            }
            throw new Error('All Gemini APIs failed.')
        }

    } catch (e) {
        console.error('AI Plugin Error:', e.message)
        return m.reply(`${BORDER_TOP}
❌ *AI failed to respond.*
Try again or use a simpler prompt.
${BORDER_BOTTOM}`)
    }
}

handler.help = ['gpt', 'gemini']
handler.tags = ['ai']
handler.command = ['gpt', 'gemini']

export default handler