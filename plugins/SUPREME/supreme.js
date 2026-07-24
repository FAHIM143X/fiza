import authority, { isSupreme } from '../../lib/supreme.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const AUTH_FILE = path.join(__dirname, '../../lib/supreme.js')

let handler = async (m, { conn, args }) => {
    
    if (!isSupreme(m.sender)) return m.reply('👑 *Supreme only!*')
    
    let sub = args[0]?.toLowerCase()
    let level = args[1]?.toLowerCase()
    let who = m.mentionedJid?.[0] || m.quoted?.sender
    let name = who ? who.split('@')[0] : 'Unknown'

    if (!sub) {
        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 👑 *AUTHORITY* ──╮
│
│ 👑 Supreme: ${authority.supreme.length}
│ 👤 Owners: ${authority.owners.length}
│ 💎 Premium: ${authority.premium.length}
│
│ 📝 .auth add supreme @user
│ 📝 .auth add owner @user
│ 📝 .auth add premium @user
│ 📝 .auth remove @user
│ 📝 .auth list
╰── 🎀 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        return m.reply(txt)
    }

    // Add user to level
    if (sub === 'add') {
        if (!who) return m.reply('📝 Reply or mention user!')
        if (!['supreme', 'owner', 'premium'].includes(level)) return m.reply('📝 .auth add supreme/owner/premium @user')
        
        let content = fs.readFileSync(AUTH_FILE, 'utf8')
        content = content.replace(
            `${level}: [`,
            `${level}: [\n        '${who}',`
        )
        fs.writeFileSync(AUTH_FILE, content)
        return m.reply(`✅ *${level.toUpperCase()} Added!*\n@${name}`, null, { mentions: [who] })
    }

    // Remove user
    if (sub === 'remove') {
        if (!who) return m.reply('📝 Reply or mention user!')
        let content = fs.readFileSync(AUTH_FILE, 'utf8')
        content = content.replace(`'${who}',`, '').replace(`'${who}'`, '')
        fs.writeFileSync(AUTH_FILE, content)
        return m.reply(`⬇️ *Removed!*\n@${name}`, null, { mentions: [who] })
    }

    // List all
    if (sub === 'list') {
        let txt = `👑 *AUTHORITY LIST:*\n\n`
        txt += `🌟 Supreme:\n${authority.supreme.map(u => '• @' + u.split('@')[0]).join('\n') || 'None'}\n\n`
        txt += `👤 Owners:\n${authority.owners.map(u => '• @' + u.split('@')[0]).join('\n') || 'None'}\n\n`
        txt += `💎 Premium:\n${authority.premium.map(u => '• @' + u.split('@')[0]).join('\n') || 'None'}`
        let mentions = [...authority.supreme, ...authority.owners, ...authority.premium]
        return m.reply(txt, null, { mentions })
    }

    return m.reply('📝 .auth add|remove|list')
}

handler.help = ['auth', 'authority']
handler.tags = ['supreme']
handler.command = ['auth', 'authority']

export default handler
