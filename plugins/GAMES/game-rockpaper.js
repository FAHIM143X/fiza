// ═══════════════════════════════════════════════
// 🎀 FIZA — Rock Paper Scissors PVP Game
// ═══════════════════════════════════════════════

let handler = async (m, { conn, usedPrefix }) => {

    conn.suit = conn.suit || {}
    
    if (Object.values(conn.suit).find(room => 
        room.id?.startsWith('suit') && [room.p, room.p2].includes(m.sender)
    )) return m.reply('❌ You are already in a game!')

    let who = m.mentionedJid?.[0]
    if (!who) return m.reply(`📝 *.suit @user* to challenge!`)
    if (who === m.sender) return m.reply('❌ Cannot play with yourself!')
    if (who === conn.user.id) return m.reply('🤖 Bot cannot play!')

    if (Object.values(conn.suit).find(room => 
        room.id?.startsWith('suit') && [room.p, room.p2].includes(who)
    )) return m.reply('❌ That player is already in a game!')

    let id = 'suit_' + Date.now()
    let name1 = m.sender.split('@')[0]
    let name2 = who.split('@')[0]

    conn.suit[id] = {
        id: id,
        p: m.sender,
        p2: who,
        status: 'wait',
        timeout: setTimeout(() => {
            if (conn.suit[id]) {
                conn.reply(m.chat, '⏰ Game expired!', m)
                delete conn.suit[id]
            }
        }, 60000)
    }

    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎮 *SUIT PVP* ──╮
│ 👤 @${name1} challenges
│ 👤 @${name2} to a duel!
│
│ 🪨 Rock | 📄 Paper | ✂️ Scissors
│
│ 📝 Reply with your choice!
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [m.sender, who] })
}

// Handle moves
handler.before = async (m, { conn }) => {
    conn.suit = conn.suit || {}
    
    let room = Object.values(conn.suit).find(r => 
        r.status === 'wait' && [r.p, r.p2].includes(m.sender)
    )
    if (!room) return

    let choice = m.text?.toLowerCase().trim()
    if (!['rock', 'paper', 'scissors', '🪨', '📄', '✂️'].includes(choice)) return

    // Convert emoji to text
    if (choice === '🪨') choice = 'rock'
    if (choice === '📄') choice = 'paper'
    if (choice === '✂️') choice = 'scissors'

    let player = m.sender === room.p ? 'p1' : 'p2'
    
    if (player === 'p1') room.p1Choice = choice
    else room.p2Choice = choice

    if (room.p1Choice && room.p2Choice) {
        clearTimeout(room.timeout)
        
        let p1 = room.p1Choice
        let p2 = room.p2Choice
        let name1 = room.p.split('@')[0]
        let name2 = room.p2.split('@')[0]
        let result = ''

        if (p1 === p2) result = '🤝 *DRAW!*'
        else if ((p1 === 'rock' && p2 === 'scissors') || (p1 === 'paper' && p2 === 'rock') || (p1 === 'scissors' && p2 === 'paper'))
            result = `🏆 @${name1} *WINS!*`
        else 
            result = `🏆 @${name2} *WINS!*`

        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎮 *SUIT RESULT* ──╮
│ 👤 @${name1}: ${p1 === 'rock' ? '🪨' : p1 === 'paper' ? '📄' : '✂️'}
│ 👤 @${name2}: ${p2 === 'rock' ? '🪨' : p2 === 'paper' ? '📄' : '✂️'}
│
│ ${result}
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        m.reply(txt, null, { mentions: [room.p, room.p2] })
        delete conn.suit[room.id]
    }
}

handler.help = ['suit', 'pvp']
handler.tags = ['game']
handler.command = /^(suit|pvp)$/i
handler.group = true

export default handler