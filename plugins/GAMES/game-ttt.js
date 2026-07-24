// ═══════════════════════════════════════════════
// 🎀 FIZA — Tic Tac Toe Game
// ═══════════════════════════════════════════════

class TicTacToe {
    constructor(playerX, playerO) {
        this.playerX = playerX
        this.playerO = playerO
        this.currentTurn = playerX
        this.board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.winner = null
    }

    move(player, position) {
        if (this.winner) return 'Game over!'
        if (player !== this.currentTurn) return 'Not your turn!'
        if (position < 1 || position > 9) return 'Invalid position!'
        if (typeof this.board[position - 1] === 'string') return 'Position taken!'

        this.board[position - 1] = player === this.playerX ? 'X' : 'O'
        
        // Check win
        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        for (let w of wins) {
            if (this.board[w[0]] === this.board[w[1]] && this.board[w[1]] === this.board[w[2]]) {
                this.winner = player
                return `${player === this.playerX ? 'X' : 'O'} wins!`
            }
        }
        
        if (this.board.every(v => typeof v === 'string')) {
            this.winner = 'draw'
            return 'Draw!'
        }
        
        this.currentTurn = this.currentTurn === this.playerX ? this.playerO : this.playerX
        return 'OK'
    }

    render() {
        return this.board
    }
}

let handler = async (m, { conn, text, command, usedPrefix }) => {
    conn.game = conn.game || {}
    
    // Check if already in a game
    let existing = Object.values(conn.game).find(room => 
        room.id?.startsWith('ttt') && 
        [room.game?.playerX, room.game?.playerO].includes(m.sender)
    )
    if (existing) return m.reply('❌ You are already in a game!')

    if (!text) return m.reply(`📝 *.ttt @user* to challenge!`)

    let who = m.mentionedJid?.[0]
    if (!who) return m.reply('📝 Mention a player!')
    if (who === m.sender) return m.reply('❌ Cannot play with yourself!')
    if (who === conn.user.id) return m.reply('🤖 Bot cannot play!')

    // Find waiting room
    let room = Object.values(conn.game).find(r => r.state === 'WAITING')
    
    if (room) {
        room.o = m.chat
        room.game.playerO = m.sender
        room.state = 'PLAYING'
        
        let board = room.game.render().map(v => {
            return { 'X': '❌', 'O': '⭕', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣' }[v]
        })
        
        let txt = `🎮 *TIC TAC TOE*\n\n❌ @${room.game.playerX.split('@')[0]}\n⭕ @${room.game.playerO.split('@')[0]}\n\n${board.slice(0,3).join('')}\n${board.slice(3,6).join('')}\n${board.slice(6).join('')}\n\n🎯 Turn: @${room.game.currentTurn.split('@')[0]}\n\n📝 Reply with number 1-9`
        
        let mentions = [room.game.playerX, room.game.playerO, room.game.currentTurn]
        if (room.x !== room.o) await conn.sendMessage(room.x, { text: txt, mentions }, { quoted: m })
        await conn.sendMessage(room.o, { text: txt, mentions }, { quoted: m })
    } else {
        room = {
            id: 'ttt-' + Date.now(),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, who),
            state: 'WAITING'
        }
        conn.game[room.id] = room
        
        m.reply(`🎮 *TIC TAC TOE*\n\n⏳ Waiting for opponent...\n\n📝 *.ttt ${who.split('@')[0]}*\n📝 *.delttt* to cancel`)
    }
}

// Handle moves
handler.before = async (m, { conn }) => {
    conn.game = conn.game || {}
    let room = Object.values(conn.game).find(r => 
        r.state === 'PLAYING' && 
        [r.x, r.o].includes(m.chat) &&
        [r.game.playerX, r.game.playerO].includes(m.sender)
    )
    if (!room) return
    
    let move = parseInt(m.text)
    if (!move || move < 1 || move > 9) return
    
    let result = room.game.move(m.sender, move)
    if (result !== 'OK') {
        if (result.includes('wins') || result === 'Draw!') {
            let board = room.game.render().map(v => typeof v === 'number' ? '⬜' : v === 'X' ? '❌' : '⭕')
            let txt = `🎮 *TIC TAC TOE*\n\n${result}\n\n${board.slice(0,3).join('')}\n${board.slice(3,6).join('')}\n${board.slice(6).join('')}\n\n🧁 Game Over!`
            await conn.sendMessage(room.x, { text: txt }, { quoted: m })
            if (room.x !== room.o) await conn.sendMessage(room.o, { text: txt }, { quoted: m })
            delete conn.game[room.id]
        }
        return
    }
    
    let board = room.game.render().map(v => {
        return { 'X': '❌', 'O': '⭕', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣' }[v]
    })
    
    let txt = `🎮 *TIC TAC TOE*\n\n❌ @${room.game.playerX.split('@')[0]}\n⭕ @${room.game.playerO.split('@')[0]}\n\n${board.slice(0,3).join('')}\n${board.slice(3,6).join('')}\n${board.slice(6).join('')}\n\n🎯 Turn: @${room.game.currentTurn.split('@')[0]}`
    
    let mentions = [room.game.playerX, room.game.playerO, room.game.currentTurn]
    let otherChat = m.chat === room.x ? room.o : room.x
    await conn.sendMessage(otherChat, { text: txt, mentions }, { quoted: m })
}

// Delete game
let handler2 = async (m, { conn }) => {
    conn.game = conn.game || {}
    let room = Object.values(conn.game).find(r => 
        r.id?.startsWith('ttt') && 
        [r.game?.playerX, r.game?.playerO].includes(m.sender)
    )
    if (room) {
        delete conn.game[room.id]
        return m.reply('✅ Game cancelled!')
    }
    return m.reply('❌ No active game!')
}

handler.help = ['ttt', 'tictactoe']
handler.tags = ['game']
handler.command = /^(ttt|tictactoe|xo)$/i

let delHandler = async (m, { conn }) => {
    conn.game = conn.game || {}
    let room = Object.values(conn.game).find(r => 
        r.id?.startsWith('ttt') && 
        [r.game?.playerX, r.game?.playerO].includes(m.sender)
    )
    if (room) {
        delete conn.game[room.id]
        return m.reply('✅ Game cancelled!')
    }
    return m.reply('❌ No active game!')
}

export { handler as default, delHandler as delttt }