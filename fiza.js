import './settings.js'
import 'fiza-core'
import cfonts from 'cfonts'
import Connection from './lib/connection.js'
import Helper from './lib/helper.js'
import db from './lib/database.js'
import clearTmp from './lib/clearTmp.js'
import clearSessions from './lib/clearSessions.js'
import cron from 'node-cron'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { spawn } from 'child_process'
import { delay, mime, ranNumb } from './lib/func.js'
import { protoType, serialize } from './lib/simple.js'
import {
	plugins,
	loadPluginFiles,
	reload,
	pluginFolder,
	pluginFilter
} from './lib/plugins.js'
import express from 'express'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const args = [join(__dirname, 'fiza.js'), ...process.argv.slice(2)]
const PORT = process.env.PORT || process.env.SERVER_PORT || 8443
const { say } = cfonts
const { name, author } = require(join(__dirname, './package.json'))
const app = express()

// ═══════════════════════════════════════════════
// 🎀 FIZA BOT — Main Entry Point
// ═══════════════════════════════════════════════

app.get('/', (req, res) => {
    res.json({ 
        status: 'Fiza is Active ✨',
        owner: 'FAHIM',
        version: '2.0.0',
        uptime: process.uptime()
    })
})

app.get('/health', (req, res) => {
    res.json({ 
        name: 'Fiza',
        status: 'healthy',
        memory: process.memoryUsage().heapUsed / 1024 / 1024
    })
})

app.listen(8080, () => {
    console.log('╔══════════════════════════════════════╗')
    console.log('║      Fiza is Online ✨              ║')
    console.log('║      Port: 8080                     ║')
    console.log('║      Owner: FAHIM                   ║')
    console.log('╚══════════════════════════════════════╝')
})

console.log(`
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║         ███████╗██╗███████╗ █████╗       ║
    ║         ██╔════╝██║╚══███╔╝██╔══██╗      ║
    ║         █████╗  ██║  ███╔╝ ███████║      ║
    ║         ██╔══╝  ██║ ███╔╝  ██╔══██║      ║
    ║         ██║     ██║███████╗██║  ██║      ║
    ║         ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝      ║
    ║                                          ║
    ║         WhatsApp Multi-Device            ║
    ║         Made with 💖 by FAHIM           ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
`)

say('FIZA', {
	font: 'block',
	align: 'center',
	colors: ['pink', 'magenta'],
	background: 'transparent',
	letterSpacing: 1,
	lineHeight: 1,
	space: true,
	maxLength: '0'
})

say('WhatsApp Multi-Device', {
	font: 'simple',
	align: 'center',
	colors: ['yellow', 'green']
})

say('Created by FAHIM', {
	font: 'console',
	align: 'center',
	colors: ['red', 'magenta'],
	letterSpacing: 1
})

console.log(`
    ┌──────────────────────────────────────────┐
    │  Name        : FIZA                      │
    │  Owner       : FAHIM                     │
    │  Platform    : WhatsApp Multi-Device     │
    │  Version     : 2.0.0                     │
    │  Started     : ${new Date().toLocaleString()}  │
    └──────────────────────────────────────────┘
`)

// ═══════════════════════════════════════════════
// 🔥 DATABASE INITIALIZATION
// ═══════════════════════════════════════════════
console.log('🔄 Initializing database...')
await db.read()

if (!db.data) db.data = {}

if (!db.data.fizaDB) {
    db.data.fizaDB = {
        realOwners: [],
        botOwners: [],
        premiumUsers: [{user: '', date: 0}]
    }
    console.log('✅ Created database structure')
}

if (!db.data.users) db.data.users = {}
if (!db.data.chats) db.data.chats = {}
if (!db.data.settings) db.data.settings = {}
if (!db.data.statistics) db.data.statistics = {}
if (!db.data.contacts) db.data.contacts = {}

const YOUR_NUMBER = '917289881303'
const YOUR_NAME = 'FAHIM'
const BOT_NAME = 'FIZA'

if (!db.data.fizaDB.realOwners.some(([num]) => num === YOUR_NUMBER)) {
    db.data.fizaDB.realOwners.push([YOUR_NUMBER, YOUR_NAME, true])
    console.log(`✅ Added ${YOUR_NAME} as Real Owner`)
}

if (!db.data.fizaDB.botOwners.some(([num]) => num === YOUR_NUMBER)) {
    db.data.fizaDB.botOwners.push([YOUR_NUMBER, YOUR_NAME, true])
    console.log(`✅ Added ${YOUR_NAME} as Owner`)
}

if (!db.data.fizaDB.premiumUsers.some(v => v.user && v.user.includes(YOUR_NUMBER))) {
    db.data.fizaDB.premiumUsers.push({ 
        user: YOUR_NUMBER + '@s.whatsapp.net', 
        date: Date.now() + 999999999999 
    })
    console.log(`✅ Added ${YOUR_NAME} as Premium`)
}

if (Object.keys(db.data.settings).length === 0) {
    db.data.settings = {
        default: {
            selfMode: false,
            autoRead: false,
            restrictedMode: false,
            name: BOT_NAME,
            ownerName: YOUR_NAME
        }
    }
}

if (!db.data.statistics.startDate) {
    db.data.statistics = {
        startDate: Date.now(),
        totalCommands: 0,
        totalUsers: 0,
        totalChats: 0
    }
}

await db.write()
console.log('✅ Database initialized successfully!')
console.log(`👑 Supreme: FAHIM`)
console.log(`👤 Owners: ${db.data.fizaDB.botOwners.length}`)
console.log(`💎 Premium: ${db.data.fizaDB.premiumUsers.length}`)
console.log('─'.repeat(45))

protoType()
serialize()

Object.assign(global, {
	...Helper,
	timestamp: { start: Date.now() }
})

/** @type {import('./lib/connection.js').Socket} */
const conn = Object.defineProperty(Connection, 'conn', {
	value: await Connection.conn,
	enumerable: true,
	configurable: true,
	writable: true
}).conn

loadPluginFiles(pluginFolder, pluginFilter, {
	logger: conn.logger,
	recursiveRead: true
}).then(_ => {
    console.log('📦 Plugins Loaded Successfully')
    console.log(Object.keys(plugins))
}).catch(console.error)

if (!opts['test']) {
	setInterval(async () => {
		await Promise.allSettled([
			db.data ? db.write() : Promise.reject('db.data is null'),
			clearTmp(),
			clearSessions()
		])
	}, 1000 * 60 * 5)
}
if (opts['server']) (await import('./server.js')).default(conn, PORT)

async function _quickTest() {
	let test = await Promise.all([
		spawn('ffmpeg'),
		spawn('ffprobe'),
		spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
		spawn('convert'),
		spawn('magick'),
		spawn('gm'),
		spawn('find', ['--version'])
	].map(p => {
		return Promise.race([
			new Promise(resolve => { p.on('close', code => { resolve(code !== 127) }) }),
			new Promise(resolve => { p.on('error', _ => resolve(false)) })
		])
	}))
	let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
	let s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
	Object.freeze(global.support)

	if (!s.ffmpeg) (conn?.logger || console).warn('Install ffmpeg: pkg install ffmpeg')
	if (s.ffmpeg && !s.ffmpegWebp) (conn?.logger || console).warn('Stickers may not animate without libwebp')
	if (!s.convert && !s.magick && !s.gm) (conn?.logger || console).warn('Install imagemagick for stickers')
}

_quickTest()
	.then(() => {
        console.log('✅ System Check Complete')
        console.log('✨ Fiza is ready!')
    })
	.catch(console.error)

export { conn, db }