import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone' 
import fs from 'fs' 
import db from './lib/database.js'

// ═══════════════════════════════════════════════
// 🔥 DATABASE INITIALIZATION
// ═══════════════════════════════════════════════
async function initDatabase() {
    await db.read()
    if (!db.data) db.data = {}
    
    if (!db.data.fizaDB) {
        db.data.fizaDB = {
            realOwners: [],
            botOwners: [],
            premiumUsers: [{user: '', date: 0}]
        }
    }
    
    if (!db.data.contacts) db.data.contacts = {}
    if (!db.data.phonebook) db.data.phonebook = {}
    
    const owners = [
        ['917289881303', '𝐹𝐴𝐻𝐼𝑀💋', true],
    ]
    
    for (let [number, name, isDeveloper] of owners) {
        if (!db.data.fizaDB.realOwners.some(([num]) => num === number)) {
            db.data.fizaDB.realOwners.push([number, name, isDeveloper || true])
        }
        if (!db.data.fizaDB.botOwners.some(([num]) => num === number)) {
            db.data.fizaDB.botOwners.push([number, name, true])
        }
    }
    
    await db.write()
    console.log(chalk.green('✅ Database initialized with owners'))
}

initDatabase()

// ═══════════════════════════════════════════════
// 📌 PREFIX SETTINGS
// ═══════════════════════════════════════════════
global.prefix = ['.', '!', '#', '/']
global.botprefix = '.'

// ═══════════════════════════════════════════════
// 👑 OWNERSHIP
// ═══════════════════════════════════════════════
global.owner = [
    ['917289881303', 'FAHIM', true],
    ['917289881303', 'FAHIM ✨', true]
]

global.rOwner = ['917289881303@s.whatsapp.net']
global.rOwn = ['917289881303@s.whatsapp.net']
global.ownerNumber = ['917289881303']

global.mods = ['917289881303']
global.prems = ['917289881303']
global.allowed = ['917289881303']

// ═══════════════════════════════════════════════
// 🎀 BOT IDENTITY
// ═══════════════════════════════════════════════
global.db = db
global.copyright = "© 𝐹𝐴𝐻𝐼𝑀💋"
global.author = '𝐹𝐴𝐻𝐼𝑀💋'
global.botname = '𝐹𝐼𝒁𝐴💗'
global.oname = global.author
global.bname = global.botname

// ═══════════════════════════════════════════════
// 🔗 LINKS
// ═══════════════════════════════════════════════
global.smlink = 'https://instagram.com/imfahim143'
global.gclink = 'https://chat.whatsapp.com/JnBffMgpiCgBAra3GQC9rW'
 
// ═══════════════════════════════════════════════
// 🔑 API KEYS
// ═══════════════════════════════════════════════
global.fizakeys = 'fiza'
global.lolkeysapi = ['GataDios']

// ═══════════════════════════════════════════════
// 💫 STICKER WATERMARKS
// ═══════════════════════════════════════════════
global.packname = '𝐹𝐼𝒁𝐴💗'
global.stkpack = '𝐹𝐼𝒁𝐴💗'
global.stkowner = '© 𝐹𝐴𝐻𝐼𝑀💋'
global.maker = 'Made with 💖 by 𝐹𝐴𝐻𝐼𝑀💋'

// ═══════════════════════════════════════════════
// 😊 GLOBAL EMOJIS
// ═══════════════════════════════════════════════
global.wait = '*⌛ _Charging..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

// ═══════════════════════════════════════════════
// ⚠️ SYSTEM MESSAGES
// ═══════════════════════════════════════════════
global.bug = '*!! Sorry 💢 !!*\nSomething went wrong 🌋'
global.stop = '*!! 🎭 Unfortunately 💔 !!*\nSystem is not Responding 🙃'

// ═══════════════════════════════════════════════
// 🕐 TIMELINES
// ═══════════════════════════════════════════════
global.botdate = `*⫹⫺ Date:*  ${moment.tz('Asia/Kolkata').format('DD/MM/YY')}`
global.bottime = `*⫹⫺ Time:* ${moment.tz('Asia/Kolkata').format('HH:mm:ss')}`

// ═══════════════════════════════════════════════
// 🖥️ HOSTING
// ═══════════════════════════════════════════════
global.serverHost = 1
global.getQrWeb = 0
global.renderHost = 0
global.replitHost = 0

// ═══════════════════════════════════════════════
// 🔑 API KEYS POOL
// ═══════════════════════════════════════════════
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = global.keysZens[Math.floor(Math.random() * global.keysZens.length)]
global.keysxteammm = [
  '29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu',
  'cb15ed422c71a2fb', '5bd33b276d41d6b4',
  'HIRO', 'kurrxd09', 'ebb6251cc00f9c63',
]
global.keysxteam = global.keysxteammm[Math.floor(Math.random() * global.keysxteammm.length)]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = global.keysneoxrrr[Math.floor(Math.random() * global.keysneoxrrr.length)]

// ═══════════════════════════════════════════════
// 🔄 HOT RELOAD
// ═══════════════════════════════════════════════
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("🔄 Updated 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})