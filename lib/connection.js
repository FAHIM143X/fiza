// @ts-check
import * as os from 'os'
import chalk from 'chalk'
import db, { loadDatabase } from './database.js'
import fs from 'fs'
import Helper from './helper.js'
import importFile from './import.js'
import open from 'open'
import P from 'pino'
import path, { resolve } from 'path'
import readline from 'readline'
import storeSystem from './store.js'
import { fileURLToPath } from 'url'
import { HelperConnection } from './simple.js'

/** @type {import('baileys-elite')} */
// @ts-ignore
const {
	default: makeWASocket,
	DisconnectReason,
	fetchLatestBaileysVersion,
	useMultiFileAuthState
} = (await import('baileys-elite')).default

const Device = (os.platform() === 'win32') ? 'Windows' : (os.platform() === 'darwin') ? 'MacOS' : 'Linux'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ''}fiza-session`)
const authFile = `${Helper.opts._[0] || 'fiza-session'}.data.json`
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

// 🔐 FIZA143X PAIRING CODE
const usePairingCode = true

let [
	isCredsExist,
	isAuthSingleFileExist,
	authState
] = await Promise.all([
	Helper.checkFileExists(authFolder + '/creds.json'),
	Helper.checkFileExists(authFile),
	useMultiFileAuthState(authFolder)
])

const store = storeSystem.makeInMemoryStore()
const storeFile = `${Helper.opts._[0] || 'data'}.store.json`
store.readFromFile(storeFile)

const logger = P({
    timestamp: () => `,"time":"${new Date().toJSON()}"`,
    level: 'silent',
    transport: { target: 'pino-pretty', options: { colorize: true } }
}).child({ class: 'baileys' })

const connectionOptions = {
	printQRInTerminal: false,
	syncFullHistory: false,
	auth: authState.state
}

let conns = new Map();

async function start(oldSocket = null, opts = {}) {
	opts = { store: opts.store || store, logger: opts.logger || logger, authState: opts.authState || authState, ...opts }
	
	let { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(chalk.magenta(`-- using WA v${version.join('.')}, isLatest: ${isLatest} --`))
	let conn = await makeWASocket({
		version, ...connectionOptions, ...opts.connectionOptions,
		logger: opts.logger, auth: opts.authState.state,
		generateHighQualityLinkPreview: true, markOnlineOnConnect: false,
		defaultQueryTimeoutMs: undefined, browser: [Device, 'Chrome', '20.0.04']
	})
	HelperConnection(conn, { store: opts.store, logger: opts.logger })

	if (oldSocket) { conn.isInit = oldSocket.isInit; conn.isReloadInit = oldSocket.isReloadInit }
	if (conn.isInit == null) { conn.isInit = false; conn.isReloadInit = true }

	store.bind(conn.ev, { groupMetadata: conn.groupMetadata })
	
	// 🔐 PAIRING CODE - FIZA143X
	if(usePairingCode && !conn.authState.creds.registered) {
		console.clear()
		console.log('')
		console.log(chalk.hex('#ff69b4')('  ╔══════════════════════════════════╗'))
		console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ff1493').bold('  🍓  FIZA PAIRING SYSTEM  🍓  ') + chalk.hex('#ff69b4')('║'))
		console.log(chalk.hex('#ff69b4')('  ╠══════════════════════════════════╣'))
		console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  🔐  Pair Code: FIZA143X         ') + chalk.hex('#ff69b4')('║'))
		console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('                                  ') + chalk.hex('#ff69b4')('║'))
		console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  📱  Enter your phone number     ') + chalk.hex('#ff69b4')('║'))
		console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  💡  e.g., 917289881303         ') + chalk.hex('#ff69b4')('║'))
		console.log(chalk.hex('#ff69b4')('  ╚══════════════════════════════════╝'))
		console.log('')
		
		let phoneNumber = await question(chalk.hex('#ff69b4')('  ➜  ') + chalk.hex('#ff1493')('+'))
		rl.close()
		phoneNumber = phoneNumber.replace(/\D/g,'')
		
		console.log('')
		console.log(chalk.hex('#ff69b4')('  ╔══════════════════════════════════╗'))
		console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  🧁  Generating pair code...     ') + chalk.hex('#ff69b4')('║'))
		console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  💫  Please wait ~              ') + chalk.hex('#ff69b4')('║'))
		console.log(chalk.hex('#ff69b4')('  ╚══════════════════════════════════╝'))
		console.log('')
		
		try {
			let code = await conn.requestPairingCode(phoneNumber)
			code = code?.match(/.{1,4}/g)?.join('-') || code
			
			console.clear()
			console.log('')
			console.log(chalk.hex('#ff69b4')('  ╔══════════════════════════════════╗'))
			console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ff1493').bold('  🎀  YOUR PAIRING CODE  🎀    ') + chalk.hex('#ff69b4')('║'))
			console.log(chalk.hex('#ff69b4')('  ╠══════════════════════════════════╣'))
			console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('                                  ') + chalk.hex('#ff69b4')('║'))
			console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffffff').bold(`     ${code}     `) + chalk.hex('#ff69b4')('║'))
			console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('                                  ') + chalk.hex('#ff69b4')('║'))
			console.log(chalk.hex('#ff69b4')('  ╠══════════════════════════════════╣'))
			console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  📱  Enter in WhatsApp           ') + chalk.hex('#ff69b4')('║'))
			console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  ⚡  Expires in 60 seconds       ') + chalk.hex('#ff69b4')('║'))
			console.log(chalk.hex('#ff69b4')('  ║') + chalk.hex('#ffb6c1')('  💗  Welcome to FIZA!            ') + chalk.hex('#ff69b4')('║'))
			console.log(chalk.hex('#ff69b4')('  ╚══════════════════════════════════╝'))
			console.log('')
		} catch (e) {
			console.log(chalk.red('  ❌  Failed: ' + e.message))
			process.exit(1)
		}
	}

	await reload(conn, false, opts).then((success) => console.log('- bind handler event -', success))
	return conn
}

let OldHandler = null
async function reload(conn, restartConnection, opts = {}) {
	opts = { store: opts.store || store, logger: opts.logger || logger, authState: opts.authState || authState, ...opts }
	
	if (!opts.handler) opts.handler = importFile(Helper.__filename(resolve('./fahim.js'))).catch(console.error)
	if (opts.handler instanceof Promise) opts.handler = await opts.handler
	if (!opts.handler && OldHandler) opts.handler = OldHandler
	OldHandler = opts.handler
	const isReloadInit = !!conn.isReloadInit
	if (restartConnection) {
		try { conn.ws.close() } catch { }
		conn.ev.removeAllListeners()
		Object.assign(conn, await start(conn, opts) || {})
	}

	Object.assign(conn, getMessageConfig())

	if (!isReloadInit) {
		if (conn.handler) conn.ev.off('messages.upsert', conn.handler)
		if (conn.participantsUpdate) conn.ev.off('group-participants.update', conn.participantsUpdate)
		if (conn.groupsUpdate) conn.ev.off('groups.update', conn.groupsUpdate)
		if (conn.onDelete) conn.ev.off('messages.delete', conn.onDelete)
		if (conn.connectionUpdate) conn.ev.off('connection.update', conn.connectionUpdate)
		if (conn.credsUpdate) conn.ev.off('creds.update', conn.credsUpdate)
	}
	if (opts.handler) {
		conn.handler = opts.handler.handler.bind(conn)
		conn.participantsUpdate = opts.handler.participantsUpdate.bind(conn)
		conn.groupsUpdate = opts.handler.groupsUpdate.bind(conn)
		conn.onDelete = opts.handler.deleteUpdate.bind(conn)
	}
	if (!opts.isChild) conn.connectionUpdate = connectionUpdate.bind(conn, opts)
	conn.credsUpdate = opts.authState.saveCreds.bind(conn)

	conn.ev.on('messages.upsert', conn.handler)
	conn.ev.on('group-participants.update', conn.participantsUpdate)
	conn.ev.on('groups.update', conn.groupsUpdate)
	conn.ev.on('messages.delete', conn.onDelete)
	if (!opts.isChild) conn.ev.on('connection.update', conn.connectionUpdate)
	conn.ev.on('creds.update', conn.credsUpdate)

	conn.isReloadInit = false
	return true
}
 
async function connectionUpdate(opts, update) {
	const { connection, lastDisconnect } = update
	const code = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
	if (connection === 'close') {
		if (code) {
			console.log('- Connection Closed, Reconnecting -')
			await reload(this, true, opts)
		} else {
			console.log(chalk.red('-- Device loggedOut --'))
			process.exit(0)
		}
	} else if (connection == 'open') console.log('- opened connection -')
	if (db.data == null) loadDatabase()
}

function getMessageConfig() {
	return {
		welcome: 'Hello @user!\n\n🎉 *WELCOME* to @group!',
		bye: '👋GOODBYE @user!',
		spromote: '*@user* promoted!',
		sdemote: '*@user* demoted!',
		sDesc: 'Description changed',
		sSubject: 'Subject changed',
		sIcon: 'Icon updated!',
		sRevoke: 'Link changed'
	}
}

const conn = start(null, { store, logger, authState }).catch(console.error)

export default { start, reload, conn, conns, logger, connectionOptions, authFolder, storeFile, authState, store, getMessageConfig }
export { conn, conns, logger }