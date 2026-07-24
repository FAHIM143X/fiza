// ═══════════════════════════════════════════════
// 🎀 FIZA — APK/App Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}apk <app name>*\n\nExample: ${usedPrefix}apk whatsapp\n${usedPrefix}apk spotify premium`)

    m.reply('🔍 *Searching app...*')

    try {
        // Search APK
        let searchRes = await fetch(`https://delirius-apiofc.vercel.app/search/aptoide?q=${encodeURIComponent(text)}&limit=1`)
        let searchData = await searchRes.json()

        if (!searchData.status || !searchData.data?.[0]) {
            return m.reply('❌ App not found!')
        }

        let app = searchData.data[0]

        // Download
        let dlRes = await fetch(`https://delirius-apiofc.vercel.app/download/aptoide?id=${app.id}`)
        let dlData = await dlRes.json()

        if (!dlData.status || !dlData.data) {
            return m.reply('❌ Failed to get download link!')
        }

        let apk = dlData.data

        // Send info
        let info = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📱 *APK DOWNLOAD* ──╮
│ 📦 ${apk.name || app.name}
│ 📋 ${apk.package || app.package}
│ ⏫ ${apk.lastup || app.lastup || 'N/A'}
│ 📦 ${apk.size || app.size || 'N/A'}
│ 📥 ${apk.downloads || 'N/A'}
│
│ ⬇️ Downloading...
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        await conn.sendMessage(m.chat, {
            image: { url: apk.icon || app.icon },
            caption: info
        }, { quoted: m })

        // Send APK file
        let apkUrl = apk.dllink || apk.download || apk.url
        if (apkUrl) {
            // Check size - if >100MB send as document
            let sizeText = apk.size || '0 MB'
            let sizeNum = parseFloat(sizeText.replace(/[^0-9.]/g, ''))
            let isGB = sizeText.includes('GB')
            let isLarge = isGB || sizeNum > 100

            if (isLarge) {
                await m.reply(`📦 *Large file detected!*\nSending as document...`)
                await conn.sendMessage(m.chat, {
                    document: { url: apkUrl },
                    fileName: `${apk.name}.apk`,
                    mimetype: 'application/vnd.android.package-archive'
                }, { quoted: m })
            } else {
                await conn.sendMessage(m.chat, {
                    document: { url: apkUrl },
                    fileName: `${apk.name}.apk`,
                    mimetype: 'application/vnd.android.package-archive'
                }, { quoted: m })
            }

            await m.reply(`✅ *APK Downloaded!*\n📱 ${apk.name}\n🧁 FIZA`)
        } else {
            m.reply('❌ No download link!')
        }

    } catch (e) {
        console.log(e)
        // Fallback
        try {
            let res = await fetch(`https://api.siputzx.my.id/api/dl/aptoide?query=${encodeURIComponent(text)}`)
            let data = await res.json()
            if (data.status && data.data?.url) {
                await conn.sendMessage(m.chat, {
                    document: { url: data.data.url },
                    fileName: `${text}.apk`,
                    mimetype: 'application/vnd.android.package-archive'
                }, { quoted: m })
                return
            }
        } catch {}
        m.reply('❌ Failed to download APK!')
    }
}

handler.help = ['apk', 'modapk', 'aptoide']
handler.tags = ['downloader', 'search']
handler.command = /^(apk|modapk|aptoide|apkmod|app)$/i

export default handler