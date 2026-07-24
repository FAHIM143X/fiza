// ═══════════════════════════════════════════════
// 🎀 FIZA — Bot Script Repo Plugin
// ═══════════════════════════════════════════════

import axios from 'axios'

let handler = async function (m, { conn }) {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'
    const DIVIDER = '💗━━━━━━⊱💖⊰━━━━━━💗'

    const repoURL = 'https://github.com/FAHIM143X/fiza'

    try {
        let [, username, repoName] = repoURL.match(/github\.com\/([^/]+)\/([^/]+)/)
        let response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)

        if (response.status === 200) {
            let repo = response.data

            let caption = `${BORDER_TOP}
╭── 🎀 *FIZA BOT* ──╮
│ ✨ *A Fully Featured WhatsApp Bot*
│ 💗 Made with love by FAHIM
${DIVIDER}
│ ⭐ Stars: ${repo.stargazers_count}
│ 🔱 Forks: ${repo.forks_count}
│ 👀 Watchers: ${repo.watchers_count}
│ 🐛 Issues: ${repo.open_issues_count}
│ 📅 Updated: ${new Date(repo.updated_at).toLocaleDateString()}
│ 🔗 ${repoURL}
${DIVIDER}
│ 🚀 *Key Features*
│ 💬 Automated Messaging
│ 🖼️ Media Sharing
│ 🛡️ Group Management
│ 🎮 Interactive Games
│ 🤖 AI Commands
│ ⚡ Custom Commands
${DIVIDER}
│ 📦 *Deploy Now!*
│ 🧁 Enhance your WhatsApp!
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`

            await conn.sendMessage(m.chat, {
                image: { url: repo.owner.avatar_url },
                caption: caption,
                contextInfo: {
                    externalAdReply: {
                        title: '🎀 FIZA BOT',
                        body: `⭐ ${repo.stargazers_count} | 🔱 ${repo.forks_count}`,
                        thumbnailUrl: repo.owner.avatar_url,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceUrl: repoURL
                    }
                }
            }, { quoted: m })

        } else {
            return m.reply(`${BORDER_TOP}\n❌ *Unable to fetch repository info.*\n${BORDER_BOTTOM}`)
        }

    } catch (error) {
        console.error('Repo Error:', error)
        return m.reply(`${BORDER_TOP}\n❌ *Error fetching repository info.*\n${BORDER_BOTTOM}`)
    }
}

handler.help = ['script', 'repo', 'sc']
handler.tags = ['main']
handler.command = ['sc', 'repo', 'script', 'code']

export default handler
