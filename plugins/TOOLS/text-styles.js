// ═══════════════════════════════════════════════
// 🎀 FIZA — Text Styler
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    let txt = text || m.quoted?.text || ''
    if (!txt) return m.reply(`📝 *${usedPrefix}style <text>*\n\nExample: ${usedPrefix}style Hello World`)

    try {
        let res = await fetch(`http://qaz.wtf/u/convert.cgi?text=${encodeURIComponent(txt)}`)
        let html = await res.text()

        // Parse styles from HTML table
        let styles = {}
        let tableMatch = html.match(/<table>(.*?)<\/table>/s)
        if (tableMatch) {
            let rows = tableMatch[1].match(/<tr>(.*?)<\/tr>/gs) || []
            
            for (let row of rows) {
                let nameMatch = row.match(/class="aname">([^<]+)</)
                let contentMatch = row.match(/<td[^>]*>([^<]+)<\/td>/)
                
                if (nameMatch && contentMatch) {
                    let name = nameMatch[1].trim()
                    let content = contentMatch[1].trim()
                    styles[name + (styles[name] ? ' Reversed' : '')] = content
                }
            }
        }

        if (Object.keys(styles).length === 0) {
            return m.reply('❌ No styles found!')
        }

        // Build response with FIZA theme
        let result = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ✨ *TEXT STYLES* ──╮
│
`

        let count = 0
        for (let [name, value] of Object.entries(styles)) {
            if (count >= 15) break // Limit to 15 styles
            result += `│ *${name}*\n│ ${value}\n│\n`
            count++
        }

        result += `│ 📝 ${Object.keys(styles).length} styles total\n╰── 🧁 FIZA ──╯\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        m.reply(result)

    } catch {
        // Fallback: Simple built-in styles
        let builtInStyles = {
            'Bold Serif': toSerifBold(txt),
            'Bold Italic': toBoldItalic(txt),
            'Double Struck': toDoubleStruck(txt),
            'Script': toScript(txt),
            'Sans Bold': toSansBold(txt),
            'Monospace': toMonospace(txt),
            'Small Caps': toSmallCaps(txt),
            'Upside Down': toUpsideDown(txt),
        }

        let result = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ✨ *TEXT STYLES* ──╮
│
`
        for (let [name, value] of Object.entries(builtInStyles)) {
            result += `│ *${name}*\n│ ${value}\n│\n`
        }
        result += `╰── 🧁 FIZA ──╯\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        m.reply(result)
    }
}

// Built-in font generators
function toSerifBold(text) {
    return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 120211))
}

function toBoldItalic(text) {
    return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 120263))
}

function toDoubleStruck(text) {
    return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 120055))
}

function toScript(text) {
    return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 119927))
}

function toSansBold(text) {
    return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 120211))
}

function toMonospace(text) {
    return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 120351))
}

function toSmallCaps(text) {
    return text.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + 120255))
}

function toUpsideDown(text) {
    let chars = 'zʎxʍʌnʇsɹbdouɯlʞɾᴉɥƃɟǝpɔqɐ'
    return text.toLowerCase().split('').reverse().join('').replace(/[a-z]/g, c => chars[c.charCodeAt(0) - 97] || c)
}

handler.help = ['style', 'styletext', 'font']
handler.tags = ['tools']
handler.command = /^(style|styletext|font)$/i

export default handler