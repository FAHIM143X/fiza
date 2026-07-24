// ═══════════════════════════════════════════════
// 🎀 FIZA — Choose Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .choose Pizza, Burger, Sushi')
    let options = text.split(',').map(o => o.trim()).filter(o => o)
    if (options.length < 2) return m.reply('📝 .choose option1, option2, option3')
    let choice = options[Math.floor(Math.random() * options.length)]
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🎯 *CHOOSE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${options.join('  vs  ')}\n\n✅ *I choose: ${choice}*\n\n🧁 Good choice!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['choose']; handler.tags = ['fun']; handler.command = ['choose', 'pick']
export default handler