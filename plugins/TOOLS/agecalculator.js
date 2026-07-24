// ═══════════════════════════════════════════════
// 🎀 FIZA — Age Calculator Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .age 2000')
    let year = parseInt(text)
    if (!year || year < 1900 || year > 2030) return m.reply('📝 .age 2000')
    let age = new Date().getFullYear() - year
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🎂 *AGE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📅 Born: ${year}\n🎉 Age: ${age} years old\n\n🧁 Time flies!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['age', 'born']; handler.tags = ['tools']; handler.command = ['age', 'born']
export default handler