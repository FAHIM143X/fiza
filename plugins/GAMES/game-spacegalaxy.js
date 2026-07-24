// ═══════════════════════════════════════════════
// 🎀 FIZA — Space Galaxy Game (GLX)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let user = global.db?.data?.users?.[m.sender]
    if (!user) user = global.db.data.users[m.sender] = {}

    if (!user.gameglx) {
        user.gameglx = {
            perfil: {
                nome: m.pushName || m.sender.split('@')[0],
                level: 1,
                xp: 0,
                carteira: { currency: 1000 },
                planeta: 'Terra',
                colonia: 'Base Alpha'
            },
            inventario: [],
            ataques: 0,
            defesas: 0,
            viagens: 0
        }
    }

    let data = user.gameglx
    let pref = usedPrefix || '.'

    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🪐 *FIZA GALAXY* 🪐 ──╮
│
│ 👨‍🚀 *${data.perfil.nome}*
│ 🪐 Planet: ${data.perfil.planeta}
│ 🏠 Colony: ${data.perfil.colonia}
│ ⭐ Level: ${data.perfil.level}
│ 💰 Coins: ${data.perfil.carteira.currency}
│ ⚔️ Attacks: ${data.ataques}
│ 🛡️ Defenses: ${data.defesas}
│ 🚀 Travels: ${data.viagens}
│
│ 📝 *Commands:*
│ ${pref}glx register
│ ${pref}glx profile
│ ${pref}glx mine
│ ${pref}glx travel
│ ${pref}glx shop
│ ${pref}glx inventory
│ ${pref}glx attack
│ ${pref}glx planet
│ ${pref}glx wallet
│ ${pref}glx about
╰── 🧁 FIZA Galaxy ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            footer: '🪐 Space Adventure',
            buttons: [
                { buttonId: 'glx_profile', buttonText: { displayText: '👤 Profile' }, type: 1 },
                { buttonId: 'glx_mine', buttonText: { displayText: '⛏️ Mine' }, type: 1 },
                { buttonId: 'glx_travel', buttonText: { displayText: '🚀 Travel' }, type: 1 },
            ],
            headerType: 1
        }, { quoted: m })
    }

    let cmd = text.toLowerCase()

    // Register
    if (cmd === 'register' || cmd === 'cadastrar') {
        data.perfil.nome = m.pushName || m.sender.split('@')[0]
        return m.reply(`✅ *Registered!*\n👨‍🚀 ${data.perfil.nome}\n🪐 ${data.perfil.planeta}\n💰 ${data.perfil.carteira.currency} coins`)
    }

    // Profile
    if (cmd === 'profile' || cmd === 'perfil') {
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 👨‍🚀 *PROFILE* ──╮
│ 👤 ${data.perfil.nome}
│ ⭐ Level: ${data.perfil.level}
│ 💰 Coins: ${data.perfil.carteira.currency}
│ 🪐 Planet: ${data.perfil.planeta}
│ 🏠 Colony: ${data.perfil.colonia}
│ ⚔️ Attacks: ${data.ataques}
│ 🛡️ Defenses: ${data.defesas}
│ 🚀 Travels: ${data.viagens}
╰── 🧁 FIZA Galaxy ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }

    // Mine
    if (cmd === 'mine' || cmd === 'miner') {
        let earned = Math.floor(Math.random() * 500) + 100
        data.perfil.carteira.currency += earned
        data.perfil.xp += 10
        if (data.perfil.xp >= data.perfil.level * 100) {
            data.perfil.level++
            data.perfil.xp = 0
            return m.reply(`⛏️ *Mined!* +${earned} coins\n🎉 *LEVEL UP!* Now level ${data.perfil.level}!`)
        }
        return m.reply(`⛏️ *Mining...*\n💎 Found ${earned} coins!\n💰 Balance: ${data.perfil.carteira.currency}`)
    }

    // Travel
    if (cmd === 'travel' || cmd === 'viajar') {
        let planets = ['Mars', 'Jupiter', 'Venus', 'Saturn', 'Moon', 'Neptune', 'Mercury', 'Uranus']
        let newPlanet = planets[Math.floor(Math.random() * planets.length)]
        let cost = 200
        if (data.perfil.carteira.currency < cost) return m.reply(`❌ Need ${cost} coins to travel!`)
        data.perfil.carteira.currency -= cost
        data.perfil.planeta = newPlanet
        data.viagens++
        return m.reply(`🚀 *Traveling...*\n🪐 Arrived at ${newPlanet}!\n💰 -${cost} coins`)
    }

    // Shop
    if (cmd === 'shop' || cmd === 'loja') {
        return m.reply(`🛍️ *SPACE SHOP*\n\n1. 🛡️ Shield - 500 coins\n2. ⚔️ Laser - 800 coins\n3. 🚀 Rocket - 2000 coins\n4. 💎 Diamond - 5000 coins\n\n📝 ${pref}glx buy <item>`)
    }

    // Inventory
    if (cmd === 'inventory' || cmd === 'bau') {
        if (data.inventario.length === 0) return m.reply('🎒 *Empty inventory!*')
        return m.reply(`🎒 *INVENTORY*\n${data.inventario.map((item, i) => `${i+1}. ${item}`).join('\n')}`)
    }

    // Attack
    if (cmd === 'attack' || cmd === 'atacar') {
        let enemies = ['Alien', 'Space Pirate', 'Robot', 'Dark Lord', 'Cosmic Beast']
        let enemy = enemies[Math.floor(Math.random() * enemies.length)]
        let win = Math.random() > 0.4
        if (win) {
            let reward = Math.floor(Math.random() * 300) + 100
            data.perfil.carteira.currency += reward
            data.ataques++
            return m.reply(`⚔️ *Battle!*\n👾 Enemy: ${enemy}\n🏆 *VICTORY!* +${reward} coins`)
        } else {
            let loss = Math.floor(Math.random() * 100) + 50
            data.perfil.carteira.currency = Math.max(0, data.perfil.carteira.currency - loss)
            return m.reply(`⚔️ *Battle!*\n👾 Enemy: ${enemy}\n💔 *DEFEAT!* -${loss} coins`)
        }
    }

    // Wallet
    if (cmd === 'wallet' || cmd === 'carteira') {
        return m.reply(`💰 *WALLET*\n💵 ${data.perfil.carteira.currency} coins`)
    }

    // Planet info
    if (cmd === 'planet' || cmd === 'planeta') {
        return m.reply(`🪐 *PLANET INFO*\n🌍 Current: ${data.perfil.planeta}\n🏠 Colony: ${data.perfil.colonia}\n🚀 Travels: ${data.viagens}`)
    }

    // About
    if (cmd === 'about' || cmd === 'sobre') {
        return m.reply(`🪐 *FIZA GALAXY*\n\n🚀 Space adventure game\n👨‍🚀 Explore planets\n⛏️ Mine asteroids\n⚔️ Battle aliens\n\n👑 Created by FAHIM\n🎀 FIZA Bot`)
    }
}

handler.help = ['glx', 'galaxy', 'space']
handler.tags = ['game', 'rpg']
handler.command = ['glx', 'galaxy', 'space']

export default handler