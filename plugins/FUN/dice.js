// ═══════════════════════════════════════════════
// 🎀 FIZA — Dice Plugin
// ═══════════════════════════════════════════════

let handler = async (m) => {
    let dice = Math.floor(Math.random() * 6) + 1
    let faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🎲 *DICE ROLL*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${faces[dice]} You rolled a *${dice}*!\n\n🧁 Lucky number~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['dice']; handler.tags = ['fun']; handler.command = ['dice', 'roll']
export default handler