// ═══════════════════════════════════════════════
// 🎀 FIZA — Add/Remove Owner Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isOwner, isROwner }) => {

    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')

    let db = global.db
    if (!db.data.fizaDB) db.data.fizaDB = { realOwners: [], botOwners: [] }

    let cmd = args[0]?.toLowerCase()

    // Show owners
    if (!cmd) {
        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 👑 *OWNERS* ──╮
│
│ 🌟 *Real Owners:*
${db.data.fizaDB.realOwners.map(([num, name], i) => `│ ${i+1}. ${name || 'Owner'} (${num})`).join('\n') || '│ None'}
│
│ 👤 *Bot Owners:*
${db.data.fizaDB.botOwners.map(([num, name], i) => `│ ${i+1}. ${name || 'Owner'} (${num})`).join('\n') || '│ None'}
│
│ 📝 .addowner add 91xxx|Name
│ 📝 .addowner remove 91xxx
│ 📝 .addowner @user
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        return m.reply(txt)
    }

    // Add owner by mention
    if (cmd === 'add') {
        let who = m.mentionedJid?.[0]
        let input = args.slice(1).join(' ')
        let [number, name] = input.split('|')
        
        // If user is mentioned
        if (who) {
            number = who.split('@')[0].replace(/[^0-9]/g, '')
            name = conn.getName(who) || 'Owner'
        }
        
        if (!number) return m.reply('📝 .addowner add 91xxxxxxxxxx|Name\n📝 .addowner @user')

        number = number.replace(/[^0-9]/g, '')
        name = name?.trim() || 'Owner'

        if (!db.data.fizaDB.botOwners.some(([num]) => num === number)) {
            db.data.fizaDB.botOwners.push([number, name, true])
            await db.write()
            return m.reply(`✅ *Owner Added!*\n👤 ${name}\n📱 ${number}\n\n🔄 Restart bot to take effect.`)
        }
        return m.reply('❌ Already an owner!')
    }

    // Remove owner
    if (cmd === 'remove' || cmd === 'del') {
        let who = m.mentionedJid?.[0]
        let number = who ? who.split('@')[0].replace(/[^0-9]/g, '') : args[1]?.replace(/[^0-9]/g, '')
        
        if (!number) return m.reply('📝 .addowner remove 91xxxxxxxxxx\n📝 .addowner @user')
        if (number === '917289881303') return m.reply('❌ Cannot remove main owner!')

        let before = db.data.fizaDB.botOwners.length
        db.data.fizaDB.botOwners = db.data.fizaDB.botOwners.filter(([num]) => num !== number)
        
        if (db.data.fizaDB.botOwners.length < before) {
            await db.write()
            return m.reply(`✅ *Owner Removed!*\n📱 ${number}\n\n🔄 Restart bot to take effect.`)
        }
        return m.reply('❌ Not an owner!')
    }

    return m.reply('📝 .addowner add/remove')
}

handler.help = ['addowner']
handler.tags = ['owner']
handler.command = ['addowner']
handler.owner = true

export default handler