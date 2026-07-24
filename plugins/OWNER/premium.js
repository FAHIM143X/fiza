import authority, { isSupreme, isOwner } from '../../lib/supreme.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const AUTH_FILE = path.join(__dirname, '../../lib/supreme.js')

let handler = async (m, { conn, args }) => {
    
    if (!isSupreme(m.sender) && !isOwner(m.sender)) return m.reply('👑 *Owner or Supreme only!*')
    
    let sub = args[0]?.toLowerCase()
    let who = m.mentionedJid?.[0] || m.quoted?.sender
    let name = who ? who.split('@')[0] : 'Unknown'

    if (!sub) {
        return m.reply(`💎 *PREMIUM*\n\n${authority.premium.map((u, i) => `${i+1}. @${u.split('@')[0]}`).join('\n') || 'No premium users'}\n\n📝 .prem add @user\n📝 .prem remove @user`, null, { mentions: authority.premium })
    }

    if (sub === 'add' && who) {
        let content = fs.readFileSync(AUTH_FILE, 'utf8')
        content = content.replace("premium: [", `premium: [\n        '${who}',`)
        fs.writeFileSync(AUTH_FILE, content)
        return m.reply(`💎 *Premium Added!*\n@${name}`, null, { mentions: [who] })
    }

    if (sub === 'remove' && who) {
        let content = fs.readFileSync(AUTH_FILE, 'utf8')
        content = content.replace(`'${who}',`, '').replace(`'${who}'`, '')
        fs.writeFileSync(AUTH_FILE, content)
        return m.reply(`⬇️ *Premium Removed!*\n@${name}`, null, { mentions: [who] })
    }

    return m.reply('📝 .prem add @user | .prem remove @user')
}

handler.help = ['prem', 'premium']
handler.tags = ['owner']
handler.command = ['prem', 'premium']

export default handler
