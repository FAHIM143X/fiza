// ═══════════════════════════════════════════════
// 🎀 FIZA — Akinator Game (Complete)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    let user = global.db.data.users[m.sender]
    if (!user.aki) {
        user.aki = { sesi: false, soal: null, server: '', frontaddr: '', session: '', signature: '', step: 0, progression: 0 }
    }
    let aki = user.aki

    // End game
    if (text === 'end') {
        if (!aki.sesi) return m.reply('❌ No active game!')
        aki.sesi = false
        aki.soal = null
        return m.reply('✅ Game ended!')
    }

    // Already playing
    if (aki.sesi && text !== '0' && text !== '1' && text !== '2' && text !== '3' && text !== '4' && text !== '5') {
        return conn.reply(m.chat, '🎮 You are already playing! Answer: 0-5', aki.soal)
    }

    // Start game
    if (!aki.sesi || text === 'start') {
        try {
            let res = await fetch('https://api.lolhuman.xyz/api/akinator/start?apikey=GataDios')
            let data = await res.json()
            if (data.status !== 200) return m.reply('❌ Failed to start!')

            let { server, frontaddr, session, signature, question, progression, step } = data.result
            
            aki.sesi = true
            aki.server = server
            aki.frontaddr = frontaddr
            aki.session = session
            aki.signature = signature
            aki.question = question
            aki.progression = progression
            aki.step = step

            let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎮 *AKINATOR* ──╮
│
│ 🤔 Think of a character!
│ I'll try to guess it...
│
│ ❓ *${question}*
│
│ 📊 Step: ${step} (${progression.toFixed(2)}%)
│
│ 🎯 *Answer with:*
│ 0 = ❌ No
│ 1 = ✅ Yes
│ 2 = 🤷 Don't Know
│ 3 = 🟢 Probably
│ 4 = 🔴 Probably Not
│ 5 = ⬅️ Back
│
│ 📝 ${usedPrefix}aki end
│
╰── 🧁 FIZA Akinator ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

            let soal = await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m })
            aki.soal = soal
            return
        } catch {
            return m.reply('❌ Error starting game!')
        }
    }

    // Handle answer
    if (!['0', '1', '2', '3', '4', '5'].includes(text)) {
        return conn.reply(m.chat, '🎯 Reply with: 0 1 2 3 4 5\n0=No 1=Yes 2=Don\'t know 3=Probably 4=Probably not 5=Back', aki.soal)
    }

    if (aki.step === 0 && text === '5') return m.reply('❌ Cannot go back!')

    try {
        let url
        if (text === '5') {
            url = `https://api.lolhuman.xyz/api/akinator/back?apikey=GataDios&server=${aki.server}&session=${aki.session}&signature=${aki.signature}&step=${aki.step}`
        } else {
            url = `https://api.lolhuman.xyz/api/akinator/answer?apikey=GataDios&server=${aki.server}&frontaddr=${aki.frontaddr}&session=${aki.session}&signature=${aki.signature}&step=${aki.step}&answer=${text}`
        }

        let res = await fetch(url)
        let data = await res.json()
        
        if (data.status !== 200) {
            aki.sesi = false
            aki.soal = null
            return m.reply('❌ Session ended! Start again.')
        }

        let result = data.result

        // Guessed correctly!
        if (result.name) {
            await conn.sendMessage(m.chat, {
                image: { url: result.image },
                caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎮 *I GUESSED!* ──╮
│
│ 🌟 *${result.name}*
│ 📝 ${result.description}
│
│ 🧁 Was I right?
╰── FIZA Akinator ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
                mentions: [m.sender]
            }, { quoted: m })
            aki.sesi = false
            aki.soal = null
            return
        }

        // Continue questions
        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎮 *AKINATOR* ──╮
│
│ ❓ *${result.question}*
│
│ 📊 Step: ${result.step} (${result.progression.toFixed(2)}%)
│
│ 🎯 *Answer:*
│ 0=❌No 1=✅Yes 2=🤷Don't Know
│ 3=🟢Probably 4=🔴Probably Not
│ 5=⬅️Back
│
│ 📝 ${usedPrefix}aki end
│
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        let soal = await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m })
        aki.soal = soal
        aki.step = result.step
        aki.progression = result.progression

    } catch {
        aki.sesi = false
        aki.soal = null
        m.reply('❌ Error! Game ended.')
    }
}

handler.help = ['aki', 'akinator']
handler.tags = ['game']
handler.command = /^(aki|akinator)$/i

export default handler