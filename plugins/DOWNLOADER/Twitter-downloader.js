// ═══════════════════════════════════════════════
// 🎀 FIZA — Twitter/X Video Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}twitter <url>*\n\nExample: ${usedPrefix}twitter https://twitter.com/user/status/123456`)

    if (!text.includes('twitter.com') && !text.includes('x.com')) {
        return m.reply('❌ Please provide a valid Twitter/X URL!')
    }

    m.reply('⬇️ *Downloading from Twitter/X...*')

    try {
        // Extract tweet ID
        let id = text.match(/\/([\d]+)/)
        if (!id) return m.reply('❌ Invalid URL!')

        // API 1: Tweeload
        let res = await fetch(`https://info.tweeload.site/status/${id[1]}.json`, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        })
        let data = await res.json()

        if (data.code !== 200) {
            // Fallback API
            let res2 = await fetch(`https://api.siputzx.my.id/api/dl/twitter?url=${encodeURIComponent(text)}`)
            let data2 = await res2.json()
            
            if (data2.status && data2.data) {
                if (data2.data.type === 'video') {
                    for (let media of data2.data.media) {
                        await conn.sendMessage(m.chat, {
                            video: { url: media.url || media },
                            caption: `🐦 *Twitter/X Video*\n🧁 FIZA Downloader`
                        }, { quoted: m })
                    }
                    return
                } else {
                    for (let media of data2.data.media) {
                        await conn.sendMessage(m.chat, {
                            image: { url: media.url || media },
                            caption: `🐦 *Twitter/X Photo*\n🧁 FIZA Downloader`
                        }, { quoted: m })
                    }
                    return
                }
            }
        }

        // Process Tweeload response
        let tweet = data.tweet
        let caption = tweet.text || 'Twitter/X Media'
        let author = tweet.author?.name || 'Unknown'

        if (tweet.media?.videos) {
            for (let video of tweet.media.videos) {
                let bestQuality = video.video_urls[video.video_urls.length - 1]
                await conn.sendMessage(m.chat, {
                    video: { url: bestQuality.url },
                    caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🐦 *TWITTER VIDEO* ──╮
│ 👤 ${author}
│ 💬 ${caption.slice(0, 100)}...
│ ❤️ ${tweet.likes} 🔄 ${tweet.retweets}
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
                }, { quoted: m })
            }
        } else if (tweet.media?.photos) {
            for (let photo of tweet.media.photos) {
                await conn.sendMessage(m.chat, {
                    image: { url: photo.url || photo },
                    caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🐦 *TWITTER PHOTO* ──╮
│ 👤 ${author}
│ 💬 ${caption.slice(0, 100)}...
│ ❤️ ${tweet.likes} 🔄 ${tweet.retweets}
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
                }, { quoted: m })
            }
        } else {
            m.reply('❌ No media found!')
        }

    } catch {
        m.reply('❌ Failed to download! Try another URL.')
    }
}

handler.help = ['twitter', 'x', 'tw', 'twdl']
handler.tags = ['downloader']
handler.command = /^(twitter|x|tw|twdl|xdl|twitterdl)$/i

export default handler