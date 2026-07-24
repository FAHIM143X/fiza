// ═══════════════════════════════════════════════
// 🎀 FIZA — Prefix Changer Plugin (Fixed)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isOwner, isROwner, usedPrefix }) => {

    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')

    // 🔥 Fix: Get clean prefix display
    let getCurrentPrefix = () => {
        let p = global.prefix
        if (p instanceof RegExp) return String(p).replace(/\//g, '')
        if (Array.isArray(p)) return p.join(' ')
        return String(p || global.botprefix || '.')
    }

    let cmd = args[0]?.toLowerCase()

    // Show current prefix
    if (!cmd) {
        let current = getCurrentPrefix()
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📌 *PREFIX SETTINGS* ──╮
│
│ 💌 *Current:* ${current}
│ 📝 *Default:* ${global.botprefix || '.'}
│
│ 📋 *Commands:*
│ ${usedPrefix}prefix set <char>
│ ${usedPrefix}prefix add <char>
│ ${usedPrefix}prefix del <char>
│ ${usedPrefix}prefix reset
│
│ 💡 *Examples:*
│ ${usedPrefix}prefix set !
│ ${usedPrefix}prefix add #
│ ${usedPrefix}prefix del /
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }

    // Set single prefix (always use array)
    if (cmd === 'set') {
        let newPrefix = args[1]
        if (!newPrefix) return m.reply(`📝 ${usedPrefix}prefix set !`)
        global.prefix = [newPrefix]
        global.botprefix = newPrefix
        return m.reply(`✅ *Prefix set to:* ${newPrefix}`)
    }

    // Add prefix
    if (cmd === 'add') {
        let newPrefix = args[1]
        if (!newPrefix) return m.reply(`📝 ${usedPrefix}prefix add #`)
        if (!Array.isArray(global.prefix) || global.prefix instanceof RegExp) {
            global.prefix = [global.botprefix || '.']
        }
        if (global.prefix.includes(newPrefix)) return m.reply(`❌ Prefix "${newPrefix}" already exists!`)
        global.prefix.push(newPrefix)
        return m.reply(`✅ *Added:* ${newPrefix}\n📌 *All:* ${global.prefix.join(' ')}`)
    }

    // Remove prefix
    if (cmd === 'del' || cmd === 'delete' || cmd === 'remove') {
        let delPrefix = args[1]
        if (!delPrefix) return m.reply(`📝 ${usedPrefix}prefix del #`)
        if (!Array.isArray(global.prefix) || global.prefix instanceof RegExp) {
            global.prefix = [global.botprefix || '.']
        }
        if (delPrefix === '.' && global.prefix.length === 1) return m.reply('❌ Cannot remove the last prefix!')
        global.prefix = global.prefix.filter(p => p !== delPrefix)
        if (global.botprefix === delPrefix) global.botprefix = global.prefix[0]
        return m.reply(`✅ *Removed:* ${delPrefix}\n📌 *Remaining:* ${global.prefix.join(' ')}`)
    }

    // Reset to default
    if (cmd === 'reset') {
        global.prefix = ['.']
        global.botprefix = '.'
        return m.reply('✅ *Prefix reset to default:* .')
    }

    return m.reply('📝 .prefix set/add/del/reset')
}

handler.help = ['prefix']
handler.tags = ['owner']
handler.command = ['prefix']
handler.owner = true

export default handler