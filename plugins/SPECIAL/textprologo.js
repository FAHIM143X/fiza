// ═══════════════════════════════════════════════
// 🎀 FIZA — PhotoOxy Logo Maker (Working)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, command }) => {

    let logos = {
        neon: { name: '💜 Neon', url: 'https://api.lolhuman.xyz/api/ephoto1/neonlight?apikey=GataDios&text=' },
        hacker: { name: '👾 Hacker', url: 'https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=GataDios&text=' },
        freefire: { name: '🎮 Free Fire', url: 'https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=GataDios&text=' },
        glowing: { name: '✨ Glowing', url: 'https://api.lolhuman.xyz/api/ephoto1/glowing?apikey=GataDios&text=' },
        gradient: { name: '🌈 Gradient', url: 'https://api.lolhuman.xyz/api/ephoto1/3dgradient?apikey=GataDios&text=' },
        shadow: { name: '🖤 Shadow', url: 'https://api.lolhuman.xyz/api/ephoto1/shadow?apikey=GataDios&text=' },
        smoke: { name: '💨 Smoke', url: 'https://api.lolhuman.xyz/api/ephoto1/smoke?apikey=GataDios&text=' },
        wolfmetal: { name: '🐺 Wolf Metal', url: 'https://api.lolhuman.xyz/api/ephoto1/wolfmetal?apikey=GataDios&text=' },
        blackpink: { name: '🖤💗 Blackpink', url: 'https://api.lolhuman.xyz/api/ephoto1/blackpink?apikey=GataDios&text=' },
        lightning: { name: '⚡ Lightning', url: 'https://api.lolhuman.xyz/api/ephoto1/lightning?apikey=GataDios&text=' },
        fire: { name: '🔥 Fire', url: 'https://api.lolhuman.xyz/api/ephoto1/fire?apikey=GataDios&text=' },
        ice: { name: '❄️ Ice', url: 'https://api.lolhuman.xyz/api/ephoto1/ice?apikey=GataDios&text=' },
        bear: { name: '🐻 Bear', url: 'https://api.lolhuman.xyz/api/ephoto1/bearlogo?apikey=GataDios&text=' },
        lion: { name: '🦁 Lion', url: 'https://api.lolhuman.xyz/api/ephoto1/lionlogo?apikey=GataDios&text=' },
        wolf: { name: '🐺 Wolf', url: 'https://api.lolhuman.xyz/api/ephoto1/wolflogo?apikey=GataDios&text=' },
        metal: { name: '🔩 Metal', url: 'https://api.lolhuman.xyz/api/ephoto1/metal?apikey=GataDios&text=' },
        galaxy: { name: '🌌 Galaxy', url: 'https://api.lolhuman.xyz/api/ephoto1/galaxy?apikey=GataDios&text=' },
        wood: { name: '🪵 Wood', url: 'https://api.lolhuman.xyz/api/ephoto1/wood?apikey=GataDios&text=' },
        gold: { name: '👑 Gold', url: 'https://api.lolhuman.xyz/api/ephoto1/gold?apikey=GataDios&text=' },
        silver: { name: '🥈 Silver', url: 'https://api.lolhuman.xyz/api/ephoto1/silver?apikey=GataDios&text=' },
    }

    if (!text) {
        let list = Object.keys(logos).map((k, i) => `${i+1}. ${logos[k].name}`).join('\n')
        return m.reply(`🎨 *LOGO STYLES*\n\n${list}\n\n📝 .logo neon FIZA`)
    }

    let args = text.split(' ')
    let style = args[0]?.toLowerCase()
    let txt = args.slice(1).join(' ')

    if (!txt) return m.reply(`📝 .logo ${style} YourText`)
    if (!logos[style]) return m.reply('❌ Style not found! Type .logo for list')

    let logo = logos[style]

    try {
        await conn.sendMessage(m.chat, {
            image: { url: logo.url + encodeURIComponent(txt) },
            caption: `🎨 *${logo.name}*\n📝 ${txt}\n🧁 FIZA Logo Maker`
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed! Try another style.')
    }
}

handler.help = ['logo', 'logos', 'maker']
handler.tags = ['maker']
handler.command = ['logo', 'logos', 'maker']

export default handler