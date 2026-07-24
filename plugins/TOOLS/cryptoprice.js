// ═══════════════════════════════════════════════
// 🎀 FIZA — Crypto Price Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    let coin = text?.toLowerCase() || 'bitcoin'
    try {
        let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
        let data = await res.json()
        if (!data[coin]) return m.reply('❌ Coin not found!')
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n💰 *CRYPTO*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n🪙 ${coin.toUpperCase()}\n💵 $${data[coin].usd}\n\n🧁 To the moon!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch { m.reply('❌ Failed!') }
}

handler.help = ['crypto', 'coin']; handler.tags = ['tools']; handler.command = ['crypto', 'coin', 'price']
export default handler