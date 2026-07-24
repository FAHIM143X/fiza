// plugins/downloader/play.js
import { exec } from 'child_process'
import fs       from 'fs'
import path     from 'path'
import { fileURLToPath } from 'url'
import axios    from 'axios'
import yts      from 'yt-search'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const TEMP       = path.join(__dirname, '../../temp')

if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP, { recursive: true })

// Cache for search results
const searchCache = new Map()

const getThumb = async (id) => {
    for (const q of ['maxresdefault', 'hqdefault', 'mqdefault']) {
        try {
            const r = await axios.get(`https://img.youtube.com/vi/${id}/${q}.jpg`, {
                responseType: 'arraybuffer', timeout: 5000
            })
            const b = Buffer.from(r.data)
            if (b.length > 5000) return b
        } catch {}
    }
    return null
}

const downloadAudio = (url, out) => {
    return new Promise((resolve, reject) => {
        const cmd = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 128K -o "${out}" "${url}" --no-playlist --force-ipv4 --socket-timeout 30 --no-warnings -q`
        exec(cmd, (err) => {
            if (err || !fs.existsSync(out)) return reject(err || new Error('File not created'))
            resolve(out)
        })
    })
}

const downloadSong = async (sock, chatId, msg, video, react, reply) => {
    await react('⬇️')

    // Get thumbnail
    const thumbBuf = await getThumb(video.videoId).catch(() => null)

    // Send info card
    await sock.sendMessage(chatId, {
        text: `🎵 *${video.title}*\n⏱️ ${video.timestamp} • 📺 ${video.author?.name || 'YouTube'}\n⬇️ Downloading...`,
        contextInfo: {
            externalAdReply: {
                title:                 video.title,
                body:                  `${video.author?.name || 'YouTube'} • ${video.timestamp}`,
                thumbnail:             thumbBuf || undefined,
                mediaType:             1,
                renderLargerThumbnail: true,
                showAdAttribution:     false,
                sourceUrl:             video.url,
                mediaUrl:              video.url,
            }
        }
    }, { quoted: msg })

    // Download audio
    const out = path.join(TEMP, `play_${Date.now()}.mp3`)

    try {
        await downloadAudio(video.url, out)
    } catch (err) {
        await react('❌')
        return reply('❌ Download failed!\n`pkg install yt-dlp` or `pip install yt-dlp`')
    }

    const size = fs.statSync(out).size
    if (size > 100 * 1024 * 1024) {
        fs.unlinkSync(out)
        await react('❌')
        return reply('❌ File too large!')
    }

    // Send audio
    await sock.sendMessage(chatId, {
        audio:    fs.readFileSync(out),
        mimetype: 'audio/mpeg',
        ptt:      false,
        fileName: `${video.title}.mp3`,
        contextInfo: {
            externalAdReply: {
                title:                 `🎧 ${video.title}`,
                body:                  `${video.author?.name || 'YouTube'} • ${video.timestamp}`,
                thumbnail:             thumbBuf || undefined,
                mediaType:             2,
                renderLargerThumbnail: false,
                showAdAttribution:     false,
                sourceUrl:             video.url,
                mediaUrl:              video.url,
            }
        }
    }, { quoted: msg })

    await react('✅')
    try { fs.unlinkSync(out) } catch {}
}

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
    const query  = text.trim()
    const chatId = m.chat
    const sender = m.sender

    if (!query) {
        return conn.reply(m.chat, 
            `🎵 *${usedPrefix + command} <song name>*\n` +
            `Example: ${usedPrefix}play faded alan walker\n\n` +
            `📌 *Commands:*\n` +
            `▸ ${usedPrefix}play <song>\n` +
            `▸ ${usedPrefix}song <song>\n` +
            `▸ ${usedPrefix}music <song>`, m)
    }

    await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })

    // Search YouTube
    const search = await yts(query).catch(() => null)
    const videos = search?.videos?.slice(0, 5)

    if (!videos || videos.length === 0) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        return conn.reply(m.chat, `❌ No results for: *${query}*`, m)
    }

    // If only 1 result, download directly
    if (videos.length === 1) {
        return await downloadSong(conn, chatId, m, videos[0], 
            (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } }),
            (txt) => conn.reply(m.chat, txt, m)
        )
    }

    // Store results for selection
    const cacheId = Date.now().toString()
    searchCache.set(cacheId, { videos, timestamp: Date.now() })
    setTimeout(() => searchCache.delete(cacheId), 180000)

    // Build results list
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']
    let txt = `╭───❨ 🎵 *SEARCH RESULTS* ❩\n│\n│ 📋 *${videos.length} songs found*\n│ 🎧 *${query}*\n│\n`
    
    videos.forEach((v, i) => {
        const title = v.title.length > 40 ? v.title.substring(0, 37) + '...' : v.title
        txt += `│ ${emojis[i]} *${title}*\n│    👤 ${v.author?.name || 'YT'} | ⏱️ ${v.timestamp}\n`
        if (i < videos.length - 1) txt += `│\n`
    })
    
    txt += `│\n│ 💬 *Reply with number (1-${videos.length})*\n│ ⏰ Expires in 3 minutes\n╰───❨ 🌙 Moonlight ❩`

    // Build button rows
    const rows = videos.map((v, i) => ({
        title: `${i + 1}. ${v.title.substring(0, 40)}`,
        description: `👤 ${v.author?.name || 'Unknown'} | ⏱️ ${v.timestamp}`,
        id: `#play_${cacheId}_${i}`
    }))

    const resultMsg = {
        text: txt,
        footer: '🌸 Tap button or reply with number',
        buttons: [
            {
                buttonId: 'music_select',
                buttonText: { displayText: '🎵 Choose Song' },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: '🎧 Select Your Song',
                        sections: [{
                            title: '🔍 Search Results',
                            highlight_label: 'Best Match',
                            rows: rows
                        }]
                    })
                }
            }
        ],
        headerType: 1,
        viewOnce: true
    }

    const { key } = await conn.sendMessage(m.chat, resultMsg, { quoted: m })
    await conn.sendMessage(m.chat, { react: { text: '🎵', key: m.key } })

    // Store for reply handling
    if (!global.FIZAPLAY) global.FIZAPLAY = {}
    global.FIZAPLAY[sender] = {
        key,
        cacheId,
        timeout: setTimeout(async () => {
            await conn.sendMessage(m.chat, { delete: key }).catch(() => {})
            delete global.FIZAPLAY[sender]
        }, 180000)
    }
}

// Before handler for button clicks & number replies
handler.before = async (m, { conn }) => {
    if (!global.FIZAPLAY) global.FIZAPLAY = {}
    const sender = m.sender
    const chatId = m.chat

    // Handle native flow button
    const flow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
    if (flow) {
        try {
            const params = JSON.parse(flow.paramsJson || '{}')
            const id = params.id || ''

            if (id.startsWith('#play_')) {
                const [, cacheId, index] = id.split('_')
                const cached = searchCache.get(cacheId)

                if (!cached || Date.now() - cached.timestamp > 180000) {
                    return conn.reply(m.chat, '⏰ *Session expired!* Please search again.', m)
                }

                const video = cached.videos[parseInt(index)]
                if (video) {
                    searchCache.delete(cacheId)
                    if (global.FIZAPLAY[sender]) {
                        clearTimeout(global.FIZAPLAY[sender].timeout)
                        try { await conn.sendMessage(chatId, { delete: global.FIZAPLAY[sender].key }).catch(() => {}) } catch {}
                        delete global.FIZAPLAY[sender]
                    }
                    return await downloadSong(conn, chatId, m, video,
                        (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } }),
                        (txt) => conn.reply(m.chat, txt, m)
                    )
                }
            }
        } catch (e) {
            console.error('[PLAY] Button error:', e)
        }
        return
    }

    // Handle number reply
    const session = global.FIZAPLAY[sender]
    if (!session) return
    if (m.isBaileys || !m.quoted || m.quoted.id !== session.key.id || !m.text) return

    const num = parseInt(m.text.trim())
    if (num >= 1 && num <= 5) {
        clearTimeout(session.timeout)
        const cached = searchCache.get(session.cacheId)

        if (!cached || Date.now() - cached.timestamp > 180000) {
            delete global.FIZAPLAY[sender]
            return conn.reply(m.chat, '⏰ *Session expired!* Please search again.', m)
        }

        const video = cached.videos[num - 1]
        searchCache.delete(session.cacheId)
        delete global.FIZAPLAY[sender]

        if (video) {
            return await downloadSong(conn, chatId, m, video,
                (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } }),
                (txt) => conn.reply(m.chat, txt, m)
            )
        }
    } else {
        m.reply(`❌ *Invalid!* Reply with number *1-${searchCache.get(session.cacheId)?.videos?.length || 5}*`)
    }
}

handler.help = ['play', 'song', 'music']
handler.tags = ['downloader']
handler.command = /^(play|song|music)$/i
handler.limit = false
handler.register = false

export default handler