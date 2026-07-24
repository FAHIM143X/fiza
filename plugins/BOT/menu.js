// ═══════════════════════════════════════════════
// 🎀 FIZA - Smart Button Menu (All Commands)
// ═══════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'
import axios from 'axios'
import '../../settings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FIZA_PIC = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.png')
const FIZA_JPG = path.join(__dirname, '..', '..', 'fizamedia', 'pictures', 'fiza.jpg')

const CAT_EMOJIS = {
    'main': '🏠', 'owner': '👑', 'group': '👥', 'admin': '🛡️',
    'fun': '🎮', 'games': '🎯', 'downloader': '📥', 'search': '🔍',
    'ai': '🤖', 'tools': '🔧', 'media': '🎨', 'sticker': '💫',
    'rpg': '⚔️', 'nsfw': '🔞', 'info': 'ℹ️', 'misc': '📌', 'images': '🖼️'
}

const COMMAND_PROMPTS = {
    'play': { prompt: '🎵 What song should I play?', example: 'faded alan walker' },
    'song': { prompt: '🎵 Which song?', example: 'believer' },
    'music': { prompt: '🎶 Song name?', example: 'shape of you' },
    'video': { prompt: '🎬 What video?', example: 'cat videos' },
    'tiktok': { prompt: '📱 TikTok URL?', example: 'paste link' },
    'instagram': { prompt: '📸 Instagram URL?', example: 'paste link' },
    'ytmp3': { prompt: '🎵 YouTube URL?', example: 'paste link' },
    'ytmp4': { prompt: '🎬 YouTube URL?', example: 'paste link' },
    'sticker': { prompt: '🖼️ Send image or reply to image', example: 'reply to pic' },
    'translate': { prompt: '🌐 What to translate?', example: 'hello world' },
    'google': { prompt: '🔍 What to search?', example: 'cute cats' },
    'wiki': { prompt: '📚 What to search?', example: 'JavaScript' },
    'weather': { prompt: '🌤️ Which city?', example: 'Mumbai' },
    'calc': { prompt: '🔢 What to calculate?', example: '2+2' },
    'tts': { prompt: '🗣️ What should I say?', example: 'hello world' },
    'afk': { prompt: '💤 AFK reason?', example: 'sleeping' },
    'kick': { prompt: '👢 Who to kick?', example: '@user' },
    'add': { prompt: '👤 Who to add?', example: 'number' },
    'bc': { prompt: '📢 Broadcast message?', example: 'hello everyone' },
    'join': { prompt: '🔗 Group link?', example: 'paste link' },
    'setpp': { prompt: '🖼️ Send profile picture', example: 'send image' },
    'setname': { prompt: '📝 New bot name?', example: 'FIZA' },
    'setbio': { prompt: '📝 New bio?', example: 'cute bot' },
    'ship': { prompt: '💕 Ship who?', example: '@user1 @user2' },
    'love': { prompt: '💖 Check love with?', example: '@user' },
    'pinterest': { prompt: '📌 What to search?', example: 'aesthetic' },
    'spotify': { prompt: '🎧 Song name or URL?', example: 'believer' },
    'joke': { prompt: '🤣 Type of joke?', example: 'programming' },
    'fact': { prompt: '📖 Topic?', example: 'space' },
    'truth': { prompt: '😇 For who?', example: '@user' },
    'dare': { prompt: '😈 For who?', example: '@user' },
}

function getPrompt(cmd) {
    return COMMAND_PROMPTS[cmd] || { prompt: `✨ Use .${cmd}`, example: '' }
}

async function getFizaImage() {
    if (fs.existsSync(FIZA_PIC)) return fs.readFileSync(FIZA_PIC)
    if (fs.existsSync(FIZA_JPG)) return fs.readFileSync(FIZA_JPG)
    try {
        const res = await axios.get('https://i.ibb.co/0jKzL8X/fiza.jpg', { responseType: 'arraybuffer' })
        return Buffer.from(res.data)
    } catch {}
    return null
}

let handler = async (m, { conn, prefix, botname, isOwner }) => {
    const chatId = m.chat
    const pushName = m.pushName || 'User'
    const uptime = process.uptime()

    const formatUptime = (s) => {
        const h = Math.floor(s / 3600)
        const mn = Math.floor((s % 3600) / 60)
        const sc = Math.floor(s % 60)
        return `${h}h ${mn}m ${sc}s`
    }

    const botName = botname || global.botname || 'FIZA'
    const ownerName = 'FAHIM'
    const mode = global.self ? 'Self 🔒' : 'Public 🌍'
    const now = moment().tz('Asia/Kolkata')
    const stars = '\u200e'.repeat(4001)
    const pref = Array.isArray(prefix) ? prefix[0] : (prefix || global.botprefix || '.')

    const pluginsDir = path.join(__dirname, '..', '..', 'plugins')
    const { categories, totalCmds } = scanCategories(pluginsDir)
    const catNames = Object.keys(categories)
    const fizaImg = await getFizaImage()

    const header = `╭──🌷 *𝕄𝔼ℕ𝕌 𝕊𝕌𝕄𝕄𝔸ℝ𝕐* 🌷──╮
│ 🎐 𝙽𝚊𝚖𝚎: ${botName}
│ 🧷 𝙼𝚘𝚍𝚎: ${mode}
│ ⏳ 𝚄𝚙𝚝𝚒𝚖𝚎: ${formatUptime(uptime)}
│ 📆 𝙳𝚊𝚝𝚎: ${now.format('dddd, MMMM Do YYYY')}
│ 💖 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜: ${totalCmds}+
│ 💌 𝙿𝚛𝚎𝚏𝚒𝚡: ${pref}
│ 👑 𝙾𝚠𝚗𝚎𝚛: ${ownerName}
╰────❀──────🎀────╯`

    let txt = `${header}\n${stars}\n\n`
    txt += `🍓 *Welcome ${pushName}-chan!* ✨\n\n`
    txt += `📋 *TAP A CATEGORY BELOW* 👇\n\n`

    for (const [cat, cmds] of Object.entries(categories)) {
        const emoji = CAT_EMOJIS[cat] || '📌'
        txt += `${emoji} *${cat.toUpperCase()}* — ${cmds.length} cmd(s)\n`
    }

    txt += `\n✨━━━━⊱💫⊰━━━━✨\n`
    txt += `🧁 𝙈𝙖𝙙𝙚 𝙬𝙞𝙩𝙝 𝙡𝙤𝙫𝙚 𝙗𝙮 𝙁𝙄𝙕𝘼~`

    const rows = catNames.map((cat) => ({
        title: `${CAT_EMOJIS[cat] || '📌'} ${cat.toUpperCase()}`,
        description: `${categories[cat].length} commands`,
        id: `#menu_cat_${cat}`
    }))

    await conn.sendMessage(chatId, {
        image: fizaImg || undefined,
        caption: txt,
        footer: '💗 Tap a category to see commands~',
        buttons: [{
            buttonId: 'menu_select',
            buttonText: { displayText: '📋 Categories' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '🌸 FIZA MENU',
                    sections: [{
                        title: '📂 Select Category',
                        highlight_label: 'Tap to view',
                        rows: rows
                    }]
                })
            }
        }],
        headerType: 4,
        viewOnce: true
    }, { quoted: m })
}

handler.before = async (m, { conn, prefix }) => {
    const flow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
    if (!flow) return

    try {
        const params = JSON.parse(flow.paramsJson || '{}')
        const id = params.id || ''
        const pref = Array.isArray(prefix) ? prefix[0] : (prefix || global.botprefix || '.')

        if (id.startsWith('#menu_cat_')) {
            const category = id.replace('#menu_cat_', '')
            const pluginsDir = path.join(__dirname, '..', '..', 'plugins')
            const { categories } = scanCategories(pluginsDir)
            const commands = categories[category] || []

            if (commands.length === 0) return m.reply('📭 No commands!')

            const emoji = CAT_EMOJIS[category] || '📌'

            let d = `｡ﾟ•┈୨💖୧┈•ﾟ｡\n`
            d += `${emoji} *${category.toUpperCase()} COMMANDS* ${emoji}\n`
            d += `★・・・・・・💖・・・・・・★\n\n`

            // 🔥 SHOW ALL COMMANDS (no limit)
            const cmdRows = commands.map((cmd) => {
                const prompt = getPrompt(cmd)
                return {
                    title: `${emoji} ${pref}${cmd}`,
                    description: `${prompt.prompt} (e.g. ${prompt.example})`,
                    id: `#use_${cmd}`
                }
            })

            d += `📦 *Total:* ${commands.length} cmd(s)\n`
            d += `💗━━━━━━⊱💖⊰━━━━━━💗\n`
            d += `👇 *Tap a command below!*\n`
            d += `｡ﾟ•┈୨🌸୧┈•ﾟ｡`

            // Split into sections of 10 for WhatsApp limit
            const sections = []
            for (let i = 0; i < cmdRows.length; i += 10) {
                sections.push({
                    title: `📋 Commands ${i + 1}-${Math.min(i + 10, cmdRows.length)}`,
                    rows: cmdRows.slice(i, i + 10)
                })
            }

            await conn.sendMessage(m.chat, {
                text: d,
                footer: '💗 Select a command to use~',
                buttons: [{
                    buttonId: 'cmd_select',
                    buttonText: { displayText: '🎯 Use Command' },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: `🌸 ${category.toUpperCase()}`,
                            sections: sections
                        })
                    }
                }],
                headerType: 1,
                viewOnce: true
            }, { quoted: m })
        }

        if (id.startsWith('#use_')) {
            const cmd = id.replace('#use_', '')
            const prompt = getPrompt(cmd)

            const needsInput = ['play', 'song', 'music', 'video', 'tiktok', 'instagram', 
                'ytmp3', 'ytmp4', 'google', 'wiki', 'translate', 'weather', 'calc',
                'tts', 'pinterest', 'spotify', 'bc', 'join', 'setname', 'setbio',
                'afk', 'joke', 'fact', 'kick', 'add', 'ship', 'love']

            if (needsInput.includes(cmd)) {
                let promptText = `｡ﾟ•┈୨💖୧┈•ﾟ｡\n🎯 *${pref}${cmd}*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📝 *${prompt.prompt}*\n\n💡 *Example:* \`${pref}${cmd} ${prompt.example}\`\n\n👇 *Type your answer below!*\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`

                const exampleRows = [
                    { title: `📝 ${prompt.example}`, description: `Use this example`, id: `${pref}${cmd} ${prompt.example}` },
                    { title: `🔤 Type manually`, description: `Send .${cmd} yourtext`, id: `${pref}${cmd} ` },
                ]

                await conn.sendMessage(m.chat, {
                    text: promptText,
                    footer: '💗 Tap an option or type manually~',
                    buttons: [{
                        buttonId: 'prompt_select',
                        buttonText: { displayText: '📝 Quick Fill' },
                        type: 4,
                        nativeFlowInfo: {
                            name: 'single_select',
                            paramsJson: JSON.stringify({
                                title: `🎯 ${pref}${cmd}`,
                                sections: [{ title: '💡 Quick Options', highlight_label: 'Tap', rows: exampleRows }]
                            })
                        }
                    }],
                    headerType: 1,
                    viewOnce: true
                }, { quoted: m })
            } else {
                m.reply(`${pref}${cmd}`)
            }
        }

        if (id.startsWith('.')) {
            m.reply(id)
        }

    } catch (e) {
        console.error('[MENU] Error:', e)
    }
}

// ═══════════════ SCANNER (Only First Command) ═══════════════
function scanCategories(pluginsDir) {
    const categories = {}
    let totalCmds = 0
    if (!fs.existsSync(pluginsDir)) return { categories, totalCmds: 0 }

    function scanDir(dir, cat = 'root') {
        if (!fs.existsSync(dir)) return
        const items = fs.readdirSync(dir)
        for (const item of items) {
            const fp = path.join(dir, item)
            const st = fs.statSync(fp)
            if (st.isDirectory()) {
                scanDir(fp, item)
            } else if (st.isFile() && item.endsWith('.js')) {
                try {
                    const content = fs.readFileSync(fp, 'utf8')
                    if (content.includes("handler.help = ['menu'")) continue
                    const c = cat === 'root' ? 'misc' : cat
                    if (!categories[c]) categories[c] = []
                    
                    let cmdName = ''
                    let m

                    // handler.help = ['cmd1', 'cmd2'] → take FIRST only
                    m = content.match(/handler\.help\s*=\s*\[(['"])([^'"]+)\1/)
                    if (m && m[2]) {
                        cmdName = m[2].split(',')[0].trim().replace(/['"]/g, '')
                    }

                    // handler.command = /^(cmd1|cmd2)$/i → take FIRST only
                    if (!cmdName) {
                        m = content.match(/handler\.command\s*=\s*\/\^\(([^)]+)\)/)
                        if (m) {
                            cmdName = m[1].split('|')[0].trim().replace(/[\\$.?*+^$]/g, '')
                        }
                    }

                    // command: ['cmd1', 'cmd2'] → take FIRST only
                    if (!cmdName) {
                        m = content.match(/command\s*:\s*\[(['"])([^'"]+)\1/)
                        if (m && m[2]) {
                            cmdName = m[2].split(',')[0].trim().replace(/['"]/g, '')
                        }
                    }

                    // command: 'singlecmd'
                    if (!cmdName) {
                        m = content.match(/command\s*:\s*['"]([^'"]+)['"]/)
                        if (m && m[1]) cmdName = m[1].trim()
                    }

                    // Add only first command
                    if (cmdName && cmdName !== 'undefined' && !cmdName.includes('undefined') && cmdName !== 'menu' && cmdName !== 'help' && cmdName !== 'cmd') {
                        if (!categories[c].includes(cmdName)) { 
                            categories[c].push(cmdName)
                            totalCmds++ 
                        }
                    }

                } catch (e) {}
            }
        }
    }
    scanDir(pluginsDir)
    for (const key of Object.keys(categories)) {
        if (categories[key].length === 0) delete categories[key]
    }
    return { categories, totalCmds }
}

handler.help = ['menu', 'help', 'cmd']
handler.tags = ['main']
handler.command = /^(menu|help|cmd)$/i
handler.limit = false
handler.register = false

export default handler