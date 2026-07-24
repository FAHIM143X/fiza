import * as os from 'os'
import chalk from 'chalk'
import db, { loadDatabase } from './lib/database.js'
import Connection from './lib/connection.js'
import fs, { unwatchFile, watchFile } from 'fs'
import Helper from './lib/helper.js'
import path, { join } from 'path'
import { terminalLogger as printMessage } from './lib/print.js'
import Queque from './lib/queque.js'
import { fileURLToPath } from 'url'
import { format } from 'util'
import { plugins, reload } from './lib/plugins.js'
import { smsg } from './lib/simple.js'
import { isSupreme, isOwner as isSupremeOwner, isPremium } from './lib/supreme.js'

// ═══════════════════════════════════════════════════════════════
//                    🛡️ ANTI-CRASH SYSTEM
// ═══════════════════════════════════════════════════════════════

// Catch ALL uncaught errors - NEVER CRASH
process.on('uncaughtException', (err) => {
    console.error('💔 [ANTI-CRASH] Uncaught:', err.message)
})

process.on('unhandledRejection', (reason) => {
    console.error('💔 [ANTI-CRASH] Rejection:', reason?.message || reason)
})

process.on('warning', (warning) => {
    if (warning.message?.includes('MaxListeners')) return
    console.warn('⚠️ [WARNING]', warning.message)
})

process.setMaxListeners(100)

// Memory cleanup every 30 minutes
setInterval(() => {
    if (global.gc) global.gc()
    console.log('🧹 [MEMORY] Cleanup done')
}, 1800000)

/** @type {import('fiza-baileys')} */
const { getContentType } = (await import('baileys-elite')).default

const isNumber = x => typeof x === 'number' && !isNaN(x)

// ═══════════════════════════════════════════════════════════════
//                    🗺️ LID RESOLVER
// ═══════════════════════════════════════════════════════════════

function resolveLid(jid) {
    try {
        if (!jid || !jid.endsWith('@lid')) return jid
        let lidNum = jid.split('@')[0]
        let contacts = global.db?.data?.contacts || {}
        for (let [realJid, contact] of Object.entries(contacts)) {
            if (contact.lid === jid || contact.lid === lidNum || contact.id === jid) return realJid
        }
    } catch {}
    return jid
}

function getName(conn, jid) {
    try {
        if (!jid) return 'Unknown'
        let realJid = resolveLid(jid)
        let contact = global.db?.data?.contacts?.[realJid] || global.db?.data?.contacts?.[jid]
        if (contact?.name) return contact.name
        if (contact?.notify) return contact.notify
        let name = conn.getName?.(jid) || conn.getName?.(realJid)
        if (name && typeof name === 'string' && !/^\d+$/.test(name) && !name.includes('@lid')) return name
        return String(realJid || jid).split('@')[0]
    } catch { return 'Unknown' }
}

// ═══════════════════════════════════════════════════════════════
//                        🛡️ SECURITY SYSTEM
// ═══════════════════════════════════════════════════════════════

const spamCache = new Map()
const deletedMessages = new Map()

function checkSpam(sender) {
    try {
        const now = Date.now()
        const data = spamCache.get(sender) || { count: 0, firstTime: now }
        if (now - data.firstTime > 5000) { data.count = 0; data.firstTime = now }
        data.count++
        spamCache.set(sender, data)
        return data.count > 10
    } catch { return false }
}

const LINK_PATTERNS = [
    /https?:\/\/(?:www\.)?(?:chat\.whatsapp\.com|wa\.me)\/[^\s]+/gi,
    /https?:\/\/(?:www\.)?(?:t\.me|telegram\.me)\/[^\s]+/gi,
    /https?:\/\/(?:www\.)?(?:discord\.gg|discord\.com\/invite)\/[^\s]+/gi,
    /https?:\/\/(?:www\.)?(?:facebook\.com|fb\.com|instagram\.com)\/[^\s]+/gi,
]

const TOXIC_WORDS = [
    'bitch', 'fuck', 'shit', 'asshole', 'bastard', 'dick', 'motherfucker',
    'mc', 'bc', 'madarchod', 'bhenchod', 'chutiya', 'harami', 'kutta',
    'idiot', 'stupid', 'dumb', 'gandu', 'lavda', 'lode',
]

const PRIVATE_MSG = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🔒 *PRIVATE MODE* ──╮
│ 🤖 ${global.botname || 'FIZA'} is private!
│ 👑 Only owner can use bot.
│ 💗 Try again later~
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

const GROUP_OFF_MSG = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🔇 *GROUP OFF* ──╮
│ 🤖 ${global.botname || 'FIZA'} is off here!
│ 👑 Ask admin to enable.
│ 💗 Try again later~
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

// ═══════════════════════════════════════════════════════════════
//                    🔥 DATABASE INITIALIZATION
// ═══════════════════════════════════════════════════════════════

function initializeDatabase() {
    try {
        if (!db.data) db.data = {}
        if (!db.data.users) db.data.users = {}
        if (!db.data.chats) db.data.chats = {}
        if (!db.data.contacts) db.data.contacts = {}
        if (!db.data.fizaDB) { db.data.fizaDB = { realOwners: [], botOwners: [] } }
        if (!db.data.settings) db.data.settings = {}
        if (!db.data.statistics) db.data.statistics = {}
    } catch {}
}

function cacheMessage(msg) {
    try {
        if (!msg?.key?.remoteJid) return
        const jid = msg.key.remoteJid
        const msgs = deletedMessages.get(jid) || []
        msgs.push({ key: msg.key, message: msg.message, sender: msg.key.participant || msg.key.remoteJid, timestamp: Date.now() })
        if (msgs.length > 100) msgs.shift()
        deletedMessages.set(jid, msgs)
    } catch {}
}

// ═══════════════════════════════════════════════════════════════
//                    💬 MAIN MESSAGE HANDLER
// ═══════════════════════════════════════════════════════════════

export async function handler(chatUpdate) {
    try {
        this.msgqueque = this.msgqueque || new Queque()
        if (!chatUpdate) return
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        if (db.data == null) await loadDatabase()
        initializeDatabase()

        try {
            m = smsg(this, m) || m
            if (!m) return
            m.exp = 0; m.limit = false
            cacheMessage(m)

            // ── RESOLVE LID ──────────────────────────────────
            if (m.sender?.endsWith('@lid')) {
                let realJid = resolveLid(m.sender)
                if (realJid !== m.sender) {
                    m.senderLid = m.sender
                    m.sender = realJid
                }
            }

            // ── SAVE CONTACTS ────────────────────────────────
            if (m.pushName && m.sender) {
                if (!db.data.contacts) db.data.contacts = {}
                if (!db.data.contacts[m.sender]) {
                    db.data.contacts[m.sender] = { name: m.pushName, notify: m.pushName }
                }
            }

            // ── USER & CHAT INIT ─────────────────────────────
            try {
                let user = db.data.users[m.sender]
                if (m.sender.endsWith('@s.whatsapp.net')) {
                    if (typeof user !== 'object') db.data.users[m.sender] = {}
                    if (user) {
                        if (!('name' in user)) user.name = getName(this, m.sender)
                        if (!isNumber(user.age)) user.age = -1
                        if (!isNumber(user.exp)) user.exp = 0
                        if (!isNumber(user.limit)) user.limit = 100
                        if (!isNumber(user.level)) user.level = 0
                        if (!isNumber(user.spamcount)) user.spamcount = 0
                        if (!('banned' in user)) user.banned = false
                        if (!('warnings' in user)) user.warnings = 0
                    } else {
                        db.data.users[m.sender] = { name: getName(this, m.sender), age: -1, exp: 0, limit: 100, level: 0, spamcount: 0, banned: false, warnings: 0 }
                    }
                }
                let chat = db.data.chats[m.chat]
                if (typeof chat !== 'object') db.data.chats[m.chat] = {}
                if (!chat.antiLink) chat.antiLink = false
                if (!chat.antiToxic) chat.antiToxic = false
                if (!chat.antiDelete) chat.antiDelete = false
                if (!chat.muted) chat.muted = false
                if (!chat.welcome) chat.welcome = false
            } catch (e) {}

            if (!db.data.fizaDB) { db.data.fizaDB = { realOwners: [], botOwners: [] } }

            // ══════════════════════════════════════════════════
            //               👑 SUDO SYSTEM
            // ══════════════════════════════════════════════════

            // Add sudo users array to database if not exists
            if (!db.data.fizaDB.sudoUsers) {
                db.data.fizaDB.sudoUsers = []
            }

            // Sudo check — sudo users get owner-level access
            const isSudo = (db.data.fizaDB.sudoUsers || []).some(([number]) => {
                let clean = String(number).replace(/[^0-9]/g, '')
                return m.sender.includes(clean)
            })

            // ── PERMISSION CHECKS ────────────────────────────
            const isSupremeUser = isSupreme(m.sender)
            const isROwner = [this.decodeJid(this.user.id), ...(db.data.fizaDB.realOwners || []).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            const isOwner = isSupremeUser || isSupremeOwner(m.sender) || isROwner || m.fromMe || isSudo || 
                (db.data.fizaDB.botOwners || []).some(([number]) => {
                    let clean = String(number).replace(/[^0-9]/g, '')
                    return m.sender.includes(clean)
                })
            const isPremiumUser = isPremium(m.sender) || isOwner

            // ── GROUP INFO ───────────────────────────────────
            let isAdmin = false, isBotAdmin = false
            if (m.isGroup) {
                try {
                    let meta = await Connection.store.fetchGroupMetadata(m.chat, this.groupMetadata).catch(() => null)
                    let parts = meta?.participants || []
                    let u = parts.find(p => this.decodeJid(p.id) === m.sender) || {}
                    let b = parts.find(p => this.decodeJid(p.id) == this.user.jid) || {}
                    isAdmin = u?.admin == 'admin' || u?.admin == 'superadmin'
                    isBotAdmin = b?.admin == 'admin' || b?.admin == 'superadmin'
                } catch {}
            }

            // ══════════════════════════════════════════════════
            //               🛡️ SECURITY CHECKS
            // ══════════════════════════════════════════════════

            if (!isOwner && checkSpam(m.sender)) return

            // AntiLink
            if (m.isGroup && db.data.chats[m.chat]?.antiLink && !isOwner && !isAdmin) {
                const text = m.text || ''
                if (LINK_PATTERNS.some(p => p.test(text))) {
                    try {
                        await this.sendMessage(m.chat, { delete: m.key })
                        let user = db.data.users[m.sender] || {}
                        user.warnings = (user.warnings || 0) + 1
                        let warns = user.warnings
                        if (warns >= 3 && isBotAdmin) {
                            await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                            user.warnings = 0
                        }
                        await this.sendMessage(m.chat, { text: `⚠️ *Anti-Link*\nWarning: ${warns}/3`, mentions: [m.sender] })
                        await db.write()
                    } catch {}
                    return
                }
            }

            // AntiToxic
            if (m.isGroup && db.data.chats[m.chat]?.antiToxic && !isOwner) {
                if (TOXIC_WORDS.some(w => (m.text || '').toLowerCase().includes(w))) {
                    try {
                        await this.sendMessage(m.chat, { delete: m.key })
                        await this.sendMessage(m.chat, { text: `⚠️ *Anti-Toxic*\nWatch your language!`, mentions: [m.sender] })
                    } catch {}
                    return
                }
            }

            if (m.chat in db.data.chats && db.data.chats[m.chat]?.isBanned && !isOwner) return
            if (m.sender in db.data.users && db.data.users[m.sender]?.banned && !isOwner) return

            if (m.isGroup && db.data.chats[m.chat]?.muted && !isOwner) {
                if (m.text?.startsWith('.')) return m.reply(GROUP_OFF_MSG)
            }

            if (opts['self'] && !isROwner && !isOwner) {
                if (m.text?.startsWith('.')) return m.reply(PRIVATE_MSG)
            }

            if (opts['nyimak']) return
            if (typeof m.text !== 'string') m.text = ''

            if (m.fromMe && m.isBaileys) return
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = db.data?.users?.[m.sender]

            // ══════════════════════════════════════════════════
            //            🧩 PLUGIN PROCESSING LOOP
            // ══════════════════════════════════════════════════

            const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
            for (let name in plugins) {
                let plugin = plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue

                try {
                    if (typeof plugin.all === 'function') {
                        await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename: join(___dirname, name) })
                    }
                } catch {}

                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix || this.prefix || global.prefix
                let match = (_prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]] : Array.isArray(_prefix) ? _prefix.map(p => { let re = p instanceof RegExp ? p : new RegExp(str2Regex(p)); return [re.exec(m.text), re] }) : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] : [[[], new RegExp]]).find(p => p[1])

                try {
                    if (typeof plugin.before === 'function') {
                        await plugin.before.call(this, m, { match, conn: this, isROwner, isOwner, isAdmin, isBotAdmin, chatUpdate, __dirname: ___dirname, __filename: join(___dirname, name) })
                    }
                } catch {}

                if (typeof plugin !== 'function') continue

                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    command = (command || '').toLowerCase()

                    let cmdPattern = plugin.command || plugin.handler?.command
                    let isAccept = false
                    if (cmdPattern instanceof RegExp) isAccept = cmdPattern.test(command)
                    else if (Array.isArray(cmdPattern)) isAccept = cmdPattern.some(c => c instanceof RegExp ? c.test(command) : c === command)
                    else if (typeof cmdPattern === 'string') isAccept = cmdPattern === command
                    if (!isAccept) continue

                    m.plugin = name

                    if (plugin.owner && !isOwner) { global.dfail('owner', m); continue }
                    if (plugin.admin && !isAdmin) { global.dfail('admin', m); continue }
                    if (plugin.group && !m.isGroup) { global.dfail('group', m); continue }
                    if (plugin.premium && !isPremiumUser) { global.dfail('premium', m); continue }

                    if (!_user) {
                        db.data.users[m.sender] = { name: getName(this, m.sender), age: -1, exp: 0, limit: 100, level: 0, spamcount: 0, banned: false, warnings: 0 }
                        _user = db.data.users[m.sender]
                    }

                    m.isCommand = true
                    _user.spamcount = (_user.spamcount || 0) + 1
                    m.exp += plugin.exp ? parseInt(plugin.exp) : 17

                    let extra = { match, usedPrefix, noPrefix, args, command, text: args.join(' '), conn: this, isROwner, isOwner, isAdmin, isBotAdmin, chatUpdate, __dirname: ___dirname, __filename: join(___dirname, name) }
                    try {
                        await plugin.call(this, m, extra)
                        if (!isOwner) m.limit = plugin.limit || false
                    } catch (e) {
                        console.error(`[PLUGIN ERROR] ${name}:`, e.message)
                        try { m.reply('❌ Error!') } catch {}
                    }
                    break
                }
            }
        } catch (e) {
            console.error('[HANDLER ERROR]', e.message)
        }
        finally {
            try {
                if (m.isGroup && db.data.chats[m.chat]?.presence) await this.sendPresenceUpdate(['composing', 'recording'].getRandom(), m.chat)
                if (opts['autoread']) await this.readMessages([m.key]).catch(() => {})
            } catch {}
        }
    } catch (e) {
        console.error('[FATAL ERROR]', e.message)
    }
}

// ═══════════════════════════════════════════════════════════════
//                    👥 GROUP EVENTS
// ═══════════════════════════════════════════════════════════════

export async function participantsUpdate({ id, participants, action }) {
    try {
        if (opts['self'] || this.isInit) return
        if (db.data == null) await loadDatabase()
        const chat = db.data.chats[id]
        if (!chat?.welcome) return
        const meta = await Connection.store.fetchGroupMetadata(id, this.groupMetadata).catch(() => null)
        for (let user of participants) {
            const name = '@' + user.split('@')[0]
            if (action === 'add') await this.sendMessage(id, { text: chat.sWelcome || `🎉 Welcome ${name}!`, mentions: [user] }).catch(() => {})
            else if (action === 'remove') await this.sendMessage(id, { text: chat.sBye || `👋 Goodbye ${name}!`, mentions: [user] }).catch(() => {})
        }
    } catch {}
}

export async function groupsUpdate(groupsUpdate) {
    try {
        if (opts['self']) return
        for (const u of groupsUpdate) {
            if (!u.id) continue
            let chats = db.data.chats[u.id]
            if (!chats?.detect) continue
            let text = ''
            if (u.desc) text = (chats.sDesc || 'Desc changed').replace('@desc', u.desc)
            if (u.subject) text = (chats.sSubject || 'Subject changed').replace('@subject', u.subject)
            if (text) await this.sendMsg(u.id, { text }).catch(() => {})
        }
    } catch {}
}

export async function deleteUpdate(message) {
    try {
        if (!Array.isArray(message.keys)) return
        for (let key of message.keys) {
            if (key.fromMe) continue
            let chat = db.data.chats[key.remoteJid]
            if (!chat?.antiDelete) continue
            let cached = deletedMessages.get(key.remoteJid) || []
            let found = cached.find(m => m.key.id === key.id)
            if (found) {
                let name = '@' + found.sender.split('@')[0]
                await this.sendMessage(key.remoteJid, { text: `🗑️ *Anti-Delete*\n${name} deleted a message!`, mentions: [found.sender] }).catch(() => {})
            }
        }
    } catch {}
}

global.dfail = (type, m) => {
    let msg = {
        rowner: '*「👑 SUPREME ONLY」*',
        owner: '*「👤 OWNER ONLY」*',
        premium: '*「💎 PREMIUM ONLY」*',
        group: '*「👥 GROUP ONLY」*',
        admin: '*「🛡️ ADMIN ONLY」*',
    }[type]
    if (msg) try { m.reply(msg) } catch {}
}

// ═══════════════════════════════════════════════════════════════
//                    🔥 HOT RELOAD
// ═══════════════════════════════════════════════════════════════

let file = Helper.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.hex('#ff69b4')("💖 Updated 'fahim.js' ✨"))
    try { if (Connection.reload) await Connection.reload(await Connection.conn) } catch {}
})

const pluginsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'plugins')
let reloadTimeout = null
if (fs.existsSync(pluginsDir)) {
    fs.watch(pluginsDir, { recursive: true }, (_, filename) => {
        if (!filename?.endsWith('.js')) return
        clearTimeout(reloadTimeout)
        reloadTimeout = setTimeout(() => {
            console.log(chalk.hex('#ffb6c1')(`🔄 ${filename}`))
            try { Connection.reload?.(Connection.conn)?.catch(() => {}) } catch {}
        }, 2000)
    })
    console.log(chalk.hex('#ff69b4')('👁️ Hot Reload active ✨'))
}