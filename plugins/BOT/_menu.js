// ═══════════════════════════════════════════════
// 🎀 FIZA — Per-Category Command List
// ═══════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { conn, args, usedPrefix }) => {

    let pluginsDir = path.join(__dirname, '..', '..', 'plugins')
    let categories = scanCategories(pluginsDir)
    let catEmojis = {
        'main': '🏠', 'owner': '👑', 'group': '👥', 'admin': '🛡️',
        'fun': '🎮', 'games': '🎯', 'downloader': '📥', 'search': '🔍',
        'ai': '🤖', 'tools': '🔧', 'media': '🎨', 'sticker': '💫',
        'rpg': '⚔️', 'nsfw': '🔞', 'info': 'ℹ️', 'misc': '📌',
        'maker': '🎨', 'logo': '✨', 'anime': '🌸', 'reaction': '💖'
    }

    let cmd = args[0]?.toLowerCase()

    // Show all categories
    if (!cmd) {
        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📂 *CATEGORIES* ──╮
│
${Object.entries(categories).map(([cat, cmds]) => `│ ${catEmojis[cat] || '📌'} *${cat.toUpperCase()}* — ${cmds.length} commands`).join('\n')}
│
│ 📝 ${usedPrefix}cmdlist <category>
│ 📝 ${usedPrefix}cmdlist all
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        return m.reply(txt)
    }

    // Show all commands
    if (cmd === 'all') {
        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡\n╭── 📋 *ALL COMMANDS* ──╮\n│\n`
        let total = 0
        for (let [cat, cmds] of Object.entries(categories)) {
            txt += `│ ${catEmojis[cat] || '📌'} *${cat.toUpperCase()}*\n`
            cmds.forEach(c => { txt += `│   .${c}\n`; total++ })
            txt += `│\n`
        }
        txt += `│ 📦 *Total: ${total} commands*\n╰── 🧁 FIZA ──╯\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        return m.reply(txt)
    }

    // Show specific category
    let cat = Object.keys(categories).find(c => c.toLowerCase() === cmd)
    if (!cat) return m.reply(`❌ Category not found!\n\nAvailable: ${Object.keys(categories).join(', ')}`)

    let cmds = categories[cat]
    let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ${catEmojis[cat] || '📌'} *${cat.toUpperCase()}* ──╮
│
${cmds.map((c, i) => `│ ${i+1}. ${usedPrefix}${c}`).join('\n')}
│
│ 📦 *Total: ${cmds.length} commands*
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
    return m.reply(txt)
}

handler.help = ['cmdlist', 'commands']
handler.tags = ['main']
handler.command = ['cmdlist', 'commands']

export default handler

function scanCategories(pluginsDir) {
    let categories = {}
    if (!fs.existsSync(pluginsDir)) return categories

    function scanDir(dir, cat = 'root') {
        if (!fs.existsSync(dir)) return
        let items = fs.readdirSync(dir)
        for (let item of items) {
            let fp = path.join(dir, item)
            let st = fs.statSync(fp)
            if (st.isDirectory()) {
                scanDir(fp, item)
            } else if (st.isFile() && item.endsWith('.js')) {
                try {
                    let content = fs.readFileSync(fp, 'utf8')
                    if (content.includes("handler.help = ['menu'")) continue
                    let c = cat === 'root' ? 'misc' : cat
                    if (!categories[c]) categories[c] = []

                    // Get first command from handler.help
                    let m = content.match(/handler\.help\s*=\s*\[(['"])(.+?)\1\]/)
                    if (m && m[2]) {
                        let cmd = m[2].split(',')[0].trim().replace(/['"]/g, '')
                        if (cmd && !categories[c].includes(cmd)) categories[c].push(cmd)
                    }

                    // Or from handler.command
                    if (!categories[c]?.length) {
                        let m2 = content.match(/handler\.command\s*=\s*\[([^\]]+)\]/)
                        if (m2) {
                            let cmd = m2[1].split(',')[0].trim().replace(/['"]/g, '')
                            if (cmd && !categories[c].includes(cmd)) categories[c].push(cmd)
                        }
                    }

                    // Or from command: 'xxx'
                    if (!categories[c]?.length) {
                        let m3 = content.match(/command\s*:\s*['"]([^'"]+)['"]/)
                        if (m3 && m3[1]) {
                            if (!categories[c].includes(m3[1])) categories[c].push(m3[1])
                        }
                    }
                } catch {}
            }
        }
    }
    scanDir(pluginsDir)
    // Remove empty categories
    for (let key of Object.keys(categories)) {
        if (categories[key].length === 0) delete categories[key]
    }
    return categories
}