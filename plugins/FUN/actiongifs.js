// ═══════════════════════════════════════════════════════════════
// 🎀 FIZA — ACTION GIFS
// 💖 Direct GIF • Real WhatsApp Mentions • MP4 Playback
// 🌸 Multi API Fallback • Retry • Timeout
// 📱 Termux + FFmpeg Compatible
// 👑 By FAHIM
// ═══════════════════════════════════════════════════════════════

import fetch from 'node-fetch'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { tmpdir } from 'os'
import path from 'path'
import fs from 'fs'

const execFileAsync = promisify(execFile)

// ═══════════════════════════════════════════════════════════════
// 🎀 AVAILABLE ACTIONS
// ═══════════════════════════════════════════════════════════════

const actions = [
    'hug', 'kiss', 'slap', 'punch', 'pat', 'cuddle', 'cry', 'laugh',
    'dance', 'wave', 'blush', 'smile', 'wink', 'bonk', 'yeet', 'happy',
    'sad', 'angry', 'poke', 'tickle', 'highfive', 'handhold', 'bite',
    'kill', 'kick', 'glomp'
]

// ═══════════════════════════════════════════════════════════════
// 🔄 API ALIASES
// ═══════════════════════════════════════════════════════════════

const ALIASES = { sad: 'cry', angry: 'punch' }

// ═══════════════════════════════════════════════════════════════
// ⚙️ CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
    timeout: 12000,
    retries: 2,
    maxFileSize: 25 * 1024 * 1024,
    ffmpeg: 'ffmpeg',
    crf: '23'
}

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/124.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/plain, */*'
}

// ═══════════════════════════════════════════════════════════════
// 🛡️ HELPERS
// ═══════════════════════════════════════════════════════════════

function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false
    try { const p = new URL(url); return p.protocol === 'http:' || p.protocol === 'https:' } catch { return false }
}

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), CONFIG.timeout)
    try { return await fetch(url, { ...options, headers: { ...HEADERS, ...(options.headers || {}) }, signal: controller.signal }) }
    finally { clearTimeout(timer) }
}

async function retryRequest(fn, name) {
    for (let attempt = 1; attempt <= CONFIG.retries + 1; attempt++) {
        try { const result = await fn(); if (result) return result }
        catch (error) { console.log(`[FIZA-GIF] ${name} attempt ${attempt}: ${error.message}`) }
        if (attempt <= CONFIG.retries) await new Promise(r => setTimeout(r, 800 * attempt))
    }
    return null
}

function cleanup(...files) {
    for (const file of files) { try { if (file && fs.existsSync(file)) fs.unlinkSync(file) } catch {} }
}

// ═══════════════════════════════════════════════════════════════
// 🌸 API FETCHERS
// ═══════════════════════════════════════════════════════════════

async function fetchWaifuPics(action) {
    return retryRequest(async () => {
        const res = await fetchWithTimeout(`https://api.waifu.pics/sfw/${action}`)
        if (!res.ok) return null
        const data = await res.json()
        return isValidUrl(data?.url) ? data.url : null
    }, `WaifuPics/${action}`)
}

async function fetchNekosLife(action) {
    return retryRequest(async () => {
        const res = await fetchWithTimeout(`https://nekos.life/api/v2/img/${action}`)
        if (!res.ok) return null
        const data = await res.json()
        return isValidUrl(data?.url) ? data.url : null
    }, `NekosLife/${action}`)
}

async function fetchOtakugifs(action) {
    return retryRequest(async () => {
        const res = await fetchWithTimeout(`https://api.otakugifs.xyz/gif?reaction=${action}`)
        if (!res.ok) return null
        const data = await res.json()
        const url = data?.url || data?.gif || data?.data?.url || data?.result?.url
        return isValidUrl(url) ? url : null
    }, `Otakugifs/${action}`)
}

// ═══════════════════════════════════════════════════════════════
// 🌐 GET GIF FROM MULTIPLE PROVIDERS
// ═══════════════════════════════════════════════════════════════

async function getActionGif(action) {
    const providers = [
        { name: 'WaifuPics', fn: () => fetchWaifuPics(action) },
        { name: 'NekosLife', fn: () => fetchNekosLife(action) },
        { name: 'Otakugifs', fn: () => fetchOtakugifs(action) },
    ]
    for (const p of providers) {
        try {
            const url = await p.fn()
            if (isValidUrl(url)) { console.log(`[FIZA-GIF] ✅ ${p.name}`); return url }
        } catch {}
    }
    return null
}

// ═══════════════════════════════════════════════════════════════
// 📥 DOWNLOAD + 🎬 CONVERT
// ═══════════════════════════════════════════════════════════════

async function downloadMedia(url, output) {
    const res = await fetchWithTimeout(url, { headers: { 'Accept': 'image/gif,video/*,*/*' } })
    if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`)
    const buffer = await res.buffer()
    if (!buffer.length || buffer.length > CONFIG.maxFileSize) throw new Error('Invalid size')
    fs.writeFileSync(output, buffer)
    return output
}

async function convertGifToMp4(input, output) {
    await execFileAsync(CONFIG.ffmpeg, [
        '-y', '-i', input, '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
        '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-crf', CONFIG.crf,
        '-movflags', '+faststart', '-an', output
    ], { maxBuffer: 10 * 1024 * 1024 })
    if (!fs.existsSync(output) || fs.statSync(output).size === 0) throw new Error('MP4 failed')
    return output
}

// ═══════════════════════════════════════════════════════════════
// 💬 ACTION TEXT
// ═══════════════════════════════════════════════════════════════

const actionText = {
    hug: 'hugged', kiss: 'kissed', slap: 'slapped', punch: 'punched',
    pat: 'patted', cuddle: 'cuddled', cry: 'cried with', laugh: 'laughed with',
    dance: 'danced with', wave: 'waved at', blush: 'blushed at', smile: 'smiled at',
    wink: 'winked at', bonk: 'bonked', yeet: 'yeeted', happy: 'is happy with',
    sad: 'is sad with', angry: 'is angry at', poke: 'poked', tickle: 'tickled',
    highfive: 'high-fived', handhold: 'held hands with', bite: 'bit',
    kill: 'killed', kick: 'kicked', glomp: 'glomped'
}

// ═══════════════════════════════════════════════════════════════
// 🎀 MAIN HANDLER
// ═══════════════════════════════════════════════════════════════

const handler = async (m, { conn, usedPrefix, command }) => {

    const who = m.mentionedJid?.[0] || m.quoted?.sender || null

    if (m.isGroup && !who) {
        return m.reply(`📝 *Tag someone!*\n\nExample: ${usedPrefix}${command} @user`)
    }

    const apiAction = ALIASES[command] || command
    const gifUrl = await getActionGif(apiAction)

    if (!gifUrl) return m.reply(`❌ No ${command} GIF found!`)

    const action = actionText[command] || command

    // 🔥 REAL WHATSAPP MENTIONS
    const senderTag = m.sender.split('@')[0]
    const targetTag = who ? who.split('@')[0] : senderTag
    const caption = `@${senderTag} ${action} @${targetTag} `

    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    const gifPath = path.join(tmpdir(), `fiza-${id}.gif`)
    const mp4Path = path.join(tmpdir(), `fiza-${id}.mp4`)

    try {
        await downloadMedia(gifUrl, gifPath)
        await convertGifToMp4(gifPath, mp4Path)

        const videoBuffer = fs.readFileSync(mp4Path)

        await conn.sendMessage(m.chat, {
            video: videoBuffer,
            mimetype: 'video/mp4',
            gifPlayback: true,
            caption: caption,
            mentions: [m.sender, who].filter(Boolean)
        }, { quoted: m })

        console.log(`[FIZA-GIF] ✅ ${command} sent`)

    } catch (error) {
        console.error(`[FIZA-GIF] ❌ ${command}:`, error.message)
        try {
            if (fs.existsSync(mp4Path)) {
                await conn.sendMessage(m.chat, {
                    video: fs.readFileSync(mp4Path),
                    mimetype: 'video/mp4',
                    caption: caption,
                    mentions: [m.sender, who].filter(Boolean)
                }, { quoted: m })
            } else {
                // Ultimate fallback: send as document
                await conn.sendMessage(m.chat, {
                    document: { url: gifUrl },
                    fileName: `${command}.gif`,
                    mimetype: 'image/gif',
                    caption: caption,
                    mentions: [m.sender, who].filter(Boolean)
                }, { quoted: m })
            }
        } catch (e) {
            await m.reply(`❌ Failed to send ${command} GIF.`)
        }
    } finally {
        cleanup(gifPath, mp4Path)
    }
}

// ═══════════════════════════════════════════════════════════════
// 🔌 PLUGIN SETTINGS
// ═══════════════════════════════════════════════════════════════

handler.help = actions.map(a => `${a} @user`)
handler.tags = ['fun', 'anime', 'reaction']
handler.command = actions
handler.group = true

export default handler