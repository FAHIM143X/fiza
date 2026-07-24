// ═══════════════════════════════════════════════
// 🎀 FIZA — Advanced Terminal Logger v3.0
// ═══════════════════════════════════════════════

import chalk from 'chalk'
import gradient from 'gradient-string'
import figlet from 'figlet'
import boxen from 'boxen'
import { jidDecode } from 'baileys-elite'

// 🎀 FIZA KAWAI THEME
const FIZA_THEME = {
    COLORS: {
        BACKGROUND: '#fff0f5',
        PRIMARY_PINK: '#ff69b4',
        SECONDARY_PINK: '#ff1493',
        LIGHT_PINK: '#ffb6c1',
        TEXT: '#4a004a',
        FADE_TEXT: '#c71585',
        WARNING: '#ffd700',
        ERROR: '#ff3d00'
    },
    GRADIENTS: {
        HEADER: gradient(['#ff69b4', '#ff1493', '#ffb6c1']),
        BORDER: gradient(['#ffb6c1', '#ff69b4'])
    },
    FONTS: {
        MAIN: 'Georgia11',
        ALT: 'ANSI Shadow'
    }
}

const processingAnimations = new Map()

// ── SAFE COLORS ──────────────────────────────────────────────
function pink(text) { return chalk.magenta(text) }
function hotPink(text) { return chalk.magentaBright(text) }
function darkPink(text) { return chalk.hex('#c71585')(text) }
function gray(text) { return chalk.gray(text) }
function cyan(text) { return chalk.cyan(text) }
function yellow(text) { return chalk.yellow(text) }
function green(text) { return chalk.green(text) }
function red(text) { return chalk.red(text) }

// ── LID RESOLVER ─────────────────────────────────────────────
function resolveLid(jid) {
    if (!jid) return jid
    jid = String(jid)
    if (!jid.endsWith('@lid')) return jid
    let lidNum = jid.split('@')[0]
    let contacts = global.db?.data?.contacts || {}
    for (let [realJid, contact] of Object.entries(contacts)) {
        if (!contact) continue
        let contactLid = String(contact.lid || '')
        if (contactLid === jid || contactLid === lidNum) return realJid
    }
    return jid
}

function getUserName(conn, jid) {
    if (!jid) return 'Unknown'
    jid = String(jid)
    let realJid = resolveLid(jid)
    if (typeof realJid !== 'string') realJid = String(realJid || jid)
    let contact = global.db?.data?.contacts?.[realJid] || global.db?.data?.contacts?.[jid]
    if (contact?.name && typeof contact.name === 'string') return contact.name
    if (contact?.notify && typeof contact.notify === 'string') return contact.notify
    try {
        let name = conn.getName?.(realJid)
        if (name && typeof name === 'string' && name.length > 0 && !name.includes('@')) return name
    } catch {}
    return realJid.split('@')[0]
}

// ── MESSAGE TYPE DETECTOR ────────────────────────────────────
function getMessageType(message) {
    if (!message) return 'unknown'
    let type = Object.keys(message)[0] || 'unknown'
    type = type.replace('Message', '')
    // Detailed types
    if (type.includes('sticker')) return '💫 Sticker'
    if (type.includes('image')) return '🖼️ Image'
    if (type.includes('video')) return '🎥 Video'
    if (type.includes('audio')) return type.includes('ptt') ? '🎤 Voice Note' : '🎵 Audio'
    if (type.includes('document')) return '📄 Document'
    if (type.includes('contact')) return '👤 Contact'
    if (type.includes('location')) return '📍 Location'
    if (type.includes('reaction')) return '💖 Reaction'
    if (type.includes('poll')) return '📊 Poll'
    if (type.includes('sticker')) return '💫 Sticker'
    if (type.includes('ephemeral')) return '⏳ ViewOnce'
    if (type.includes('viewOnce')) return '⏳ ViewOnce'
    if (type.includes('protocol')) return '🔄 Protocol'
    if (type.includes('interactive')) return '🔘 Button Tap'
    if (type.includes('buttonsResponse')) return '🔘 Button Reply'
    if (type.includes('templateButton')) return '🔘 Template Reply'
    if (type.includes('listResponse')) return '📋 List Reply'
    return type.toLowerCase() || 'N/A'
}

// ── CHAT TYPE DETECTOR ───────────────────────────────────────
function getChatType(jid) {
    if (!jid) return { icon: '💬', name: 'Unknown' }
    jid = String(jid)
    if (jid.endsWith('@g.us')) return { icon: '👥', name: 'Group' }
    if (jid.endsWith('@broadcast')) return { icon: '📢', name: 'Broadcast' }
    if (jid === 'status@broadcast') return { icon: '📸', name: 'Status' }
    if (jid.endsWith('@newsletter')) return { icon: '📰', name: 'Channel' }
    if (jid.endsWith('@s.whatsapp.net')) return { icon: '💕', name: 'Private' }
    if (jid.endsWith('@lid')) return { icon: '🆔', name: 'LID' }
    return { icon: '💬', name: 'Chat' }
}

// ── CONTENT EXTRACTOR ────────────────────────────────────────
function getMessageContent(message, mtype) {
    if (!message) return ''
    return (
        message.conversation ||
        message.extendedTextMessage?.text ||
        message.imageMessage?.caption ||
        message.videoMessage?.caption ||
        message.documentMessage?.caption ||
        message.audioMessage?.caption ||
        message.stickerMessage ? '💫 Sticker' :
        message.contactMessage ? '👤 Contact' :
        message.locationMessage ? '📍 Location' :
        message.reactionMessage ? `💖 Reacted with ${message.reactionMessage.text}` :
        message.pollCreationMessage ? '📊 Poll Created' :
        message.buttonsResponseMessage ? `🔘 Tapped: ${message.buttonsResponseMessage.selectedDisplayText}` :
        message.templateButtonReplyMessage ? `🔘 Tapped: ${message.templateButtonReplyMessage.selectedDisplayText}` :
        message.listResponseMessage ? `📋 Selected: ${message.listResponseMessage.title}` :
        message.interactiveResponseMessage ? '🔘 Interactive Response' :
        message.protocolMessage ? '🔄 Protocol Message' :
        message.viewOnceMessage ? '⏳ ViewOnce Media' :
        message.ephemeralMessage ? '⏳ Ephemeral' :
        pink('💫 FIZA MAGIC 💫')
    )
}

function startProcessingAnimation(msgId) {
    let index = 0
    const frames = ['🎀', '💖', '💗', '💝', '💕', '💞', '💓', '🌸']
    const animation = setInterval(() => {
        process.stdout.cursorTo(0)
        process.stdout.clearLine(0)
        process.stdout.write(
            pink('｡ﾟ•┈୨💖୧┈•ﾟ｡ ') +
            hotPink(frames[index] + ' FIZA is thinking ' + frames[index]) +
            pink(' ｡ﾟ•┈୨💖୧┈•ﾟ｡')
        )
        index = (index + 1) % frames.length
    }, 100)
    processingAnimations.set(msgId, animation)
}

function stopProcessingAnimation(msgId) {
    const animation = processingAnimations.get(msgId)
    if (animation) {
        clearInterval(animation)
        process.stdout.cursorTo(0)
        process.stdout.clearLine(0)
        processingAnimations.delete(msgId)
    }
}

export async function terminalLogger(m, conn) {
    try {
        const msgId = m.key.id
        const mtype = getMessageType(m.message)
        const content = getMessageContent(m.message, mtype)
        const isCommand = content?.trim()?.startsWith('.')

        if (isCommand) {
            startProcessingAnimation(msgId)
            await new Promise(resolve => setTimeout(resolve, 1500))
            stopProcessingAnimation(msgId)
        }

        const jid = m.key.remoteJid
        const chatInfo = getChatType(jid)
        const isGroup = jid?.endsWith('@g.us')
        const isStatus = jid === 'status@broadcast'
        const isChannel = jid?.endsWith('@newsletter')
        const isBroadcast = jid?.endsWith('@broadcast') && !isStatus

        // ── GET CHAT NAME ────────────────────────────────────
        let chatName = chatInfo.name
        try {
            if (isGroup) {
                let meta = await conn.groupMetadata(jid).catch(() => null)
                chatName = meta?.subject || 'Group'
            } else if (isChannel) {
                chatName = 'Channel'
            } else if (isStatus) {
                chatName = 'Status'
            } else if (isBroadcast) {
                chatName = 'Broadcast'
            } else {
                chatName = getUserName(conn, jid) || 'Private'
            }
        } catch {}

        // ── GET SENDER NAME ──────────────────────────────────
        const participant = m.key.participant || m.key.remoteJid
        let senderName = getUserName(conn, participant)
        if (/^\d{10,}$/.test(senderName)) {
            try { senderName = jidDecode(participant)?.user || senderName } catch {}
        }

        const isFromMe = m.key.fromMe
        const direction = isFromMe ? '✨' : '💌'
        const timestamp = new Date().toLocaleString()

        // ── SPECIAL HEADERS ──────────────────────────────────
        let specialHeader = ''
        if (isStatus) specialHeader = '📸 *STATUS UPDATE*'
        else if (isChannel) specialHeader = '📰 *CHANNEL POST*'
        else if (isBroadcast) specialHeader = '📢 *BROADCAST*'

        const header = `｡ﾟ•┈୨💖୧┈•ﾟ｡
  🍓 FIZA TERMINAL ${direction} 🍓${specialHeader ? '\n  ' + specialHeader : ''}
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        // ── BUILD BODY ───────────────────────────────────────
        let body = ''
        body += pink('📌 Type: ') + hotPink(mtype) + '\n'
        body += pink('💬 Chat: ') + hotPink(chatInfo.icon + ' ' + chatName) + '\n'
        body += pink('💖 From: ') + hotPink(isFromMe ? 'You ✨' : senderName) + '\n'
        body += darkPink('🦋 ' + timestamp) + '\n'

        // ── EXTRA DETAILS ────────────────────────────────────
        if (isGroup && m.key.participant) {
            body += gray('   └ Participant') + '\n'
        }
        if (m.message?.extendedTextMessage?.contextInfo?.isForwarded) {
            body += yellow('   📨 Forwarded') + '\n'
        }
        if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
            body += cyan('   💬 Mentioned: ') + m.message.extendedTextMessage.contextInfo.mentionedJid.length + '\n'
        }
        if (m.message?.imageMessage) {
            body += green('   📐 ' + (m.message.imageMessage.height || '?') + 'x' + (m.message.imageMessage.width || '?')) + '\n'
        }
        if (m.message?.videoMessage) {
            body += green('   ⏱️ ' + (m.message.videoMessage.seconds || '?') + 's') + '\n'
        }
        if (m.message?.audioMessage) {
            body += green('   ⏱️ ' + (m.message.audioMessage.seconds || '?') + 's') + '\n'
            if (m.message.audioMessage.ptt) body += green('   🎤 PTT') + '\n'
        }

        body += chalk.gray('~'.repeat(28)) + '\n\n'
        body += content + '\n\n'
        body += pink('🧁 Made with love by FIZA~')

        console.log(
            header + '\n' +
            boxen(body, {
                padding: 1,
                margin: { top: 0, bottom: 1 },
                borderStyle: 'round',
                borderColor: isCommand ? 'magenta' : 'magentaBright',
                backgroundColor: '#fff0f5',
                title: '👑 FIZA 👑',
                titleAlignment: 'center'
            })
        )

    } catch (error) {
        console.log(
            boxen(
                red('💔 Oopsie! FIZA error 💔') + '\n\n' +
                String(error.stack || error.message) + '\n\n' +
                pink('🧁 Please try again~'),
                {
                    padding: 1,
                    borderStyle: 'round',
                    borderColor: 'red',
                    backgroundColor: '#fff0f5',
                    title: '💀 ERROR',
                    titleAlignment: 'center'
                }
            )
        )
    }
}

export function showStartupBanner(botName, version) {
    console.clear()
    console.log(
        boxen(
            figlet.textSync(botName, { font: FIZA_THEME.FONTS.MAIN, horizontalLayout: 'default' }),
            { padding: 1, float: 'center', borderStyle: 'round', borderColor: 'magenta', backgroundColor: '#fff0f5', title: '｡ﾟ•┈୨💖୧┈•ﾟ｡', titleAlignment: 'center' }
        )
    )
    console.log(
        boxen(
            pink('✨━━━━⊱💫⊰━━━━✨') + '\n\n' +
            pink('🍓 Version: ') + hotPink(version) + '\n' +
            pink('💫 Awakened at: ') + hotPink(new Date().toLocaleString()) + '\n' +
            pink('👑 Owner: ') + hotPink('FAHIM') + '\n\n' +
            pink('🧁 FIZA is now listening~') + '\n\n' +
            darkPink('｡ﾟ•┈୨🌸୧┈•ﾟ｡'),
            { padding: 1, borderStyle: 'round', borderColor: 'magentaBright', backgroundColor: '#fff0f5', title: '🦋 INFO 🦋', titleAlignment: 'center' }
        )
    )
    console.log(darkPink('💗━━━━━━⊱💖⊰━━━━━━💗') + '\n')
}

export default { terminalLogger, showStartupBanner, theme: FIZA_THEME }