// ═══════════════════════════════════════════════
// 🎀 FIZA — Word Search Puzzle Game
// ═══════════════════════════════════════════════

let fila, columna, sopaNube, sopaPalabra, sopaDir, userSP
let intentos = 0

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!userSP) {
        userSP = m.sender.split("@")[0]
        await conn.reply(m.chat, `🎮 *WORD SEARCH!*\n👤 @${userSP} find the hidden word!`, m, { mentions: [m.sender] })
    }

    async function generarSopaDeLetras() {
        const LADO = 16
        let sopaDeLetras = new Array(LADO)
        for (let i = 0; i < LADO; i++) sopaDeLetras[i] = new Array(LADO)

        const PALABRAS = ['FIZA', 'BOT', 'CUTE', 'LOVE', 'HEART', 'STAR', 'MOON', 'PINK', 'HOPE', 'DREAM', 'SMILE', 'HAPPY', 'MAGIC', 'SWEET', 'ANGEL', 'PEACE']
        const PALABRA = PALABRAS[Math.floor(Math.random() * PALABRAS.length)]

        let filaInicial = Math.floor(Math.random() * LADO)
        let columnaInicial = Math.floor(Math.random() * LADO)
        const DIRECCIONES = ["horizontal", "vertical", "diagonalDerecha", "diagonalIzquierda"]
        const DIRECCION = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)]

        let palabraAgregada = false
        while (!palabraAgregada) {
            filaInicial = Math.floor(Math.random() * LADO)
            columnaInicial = Math.floor(Math.random() * LADO)
            let palabraEntra = true
            for (let i = 0; i < PALABRA.length; i++) {
                if (DIRECCION === "horizontal" && (columnaInicial + i >= LADO)) { palabraEntra = false; break }
                else if (DIRECCION === "vertical" && (filaInicial + i >= LADO)) { palabraEntra = false; break }
                else if (DIRECCION === "diagonalDerecha" && (filaInicial + i >= LADO || columnaInicial + i >= LADO)) { palabraEntra = false; break }
                else if (DIRECCION === "diagonalIzquierda" && (filaInicial + i >= LADO || columnaInicial - i < 0)) { palabraEntra = false; break }
            }
            if (palabraEntra) {
                for (let i = 0; i < PALABRA.length; i++) {
                    if (DIRECCION === "horizontal") sopaDeLetras[filaInicial][columnaInicial + i] = PALABRA.charAt(i)
                    else if (DIRECCION === "vertical") sopaDeLetras[filaInicial + i][columnaInicial] = PALABRA.charAt(i)
                    else if (DIRECCION === "diagonalDerecha") sopaDeLetras[filaInicial + i][columnaInicial + i] = PALABRA.charAt(i)
                    else sopaDeLetras[filaInicial + i][columnaInicial - i] = PALABRA.charAt(i)
                }
                palabraAgregada = true
            }
        }

        const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const NUMS = "⓿❶❷❸❹❺❻❼❽❾❿⓫⓬⓭⓮⓯"
        let display = ""
        display += "   " + [...Array(LADO).keys()].map(n => NUMS[n] || n).join(" ") + "\n"
        for (let i = 0; i < LADO; i++) {
            let row = (NUMS[i] || i) + " "
            for (let j = 0; j < LADO; j++) {
                if (sopaDeLetras[i][j]) row += sopaDeLetras[i][j] + " "
                else row += LETRAS.charAt(Math.floor(Math.random() * LETRAS.length)) + " "
            }
            display += row + "\n"
        }

        await m.reply(`🎮 *WORD SEARCH!*\n🔍 Find: "${PALABRA}"\n📐 Direction: ${DIRECCION}\n🎯 Reply: ${usedPrefix}${command} rowcol\n❇️ Example: ${usedPrefix}${command} 28\n🎯 Attempts: ${intentos}`)
        await m.reply(display)

        fila = filaInicial
        columna = columnaInicial
        sopaNube = display
        sopaPalabra = PALABRA
        sopaDir = DIRECCION
    }

    let tagUser = userSP + '@s.whatsapp.net'
    if (userSP != m.sender.split("@")[0]) {
        await conn.reply(m.chat, `⏳ Wait your turn @${tagUser.split("@")[0]}!`, m, { mentions: [tagUser] })
        return
    }

    if (intentos === 0) {
        intentos = 3
        generarSopaDeLetras()
        setTimeout(() => {
            if (intentos !== 0) conn.reply(m.chat, `⏰ 2 minutes passed!`, m)
        }, 120000)
        setTimeout(() => {
            if (intentos !== 0) {
                conn.reply(m.chat, `❌ Time up! The word was "${sopaPalabra}" at ${sopaDir} row ${fila} col ${columna}`, m)
                fila = null; columna = null; sopaNube = null; sopaPalabra = null; sopaDir = null; userSP = null
                intentos = 0
            }
        }, 300000)
    } else {
        if (`${fila}${columna}` == text) {
            let reward = sopaPalabra.length <= 4 ? 4 : sopaPalabra.length <= 8 ? 8 : 24
            m.reply(`🎉 *CORRECT!* +${reward} diamonds!\nWord: "${sopaPalabra}" at ${sopaDir} row ${fila} col ${columna}`)
            fila = null; columna = null; sopaNube = null; sopaPalabra = null; sopaDir = null; userSP = null
            intentos = 0
            return
        } else {
            if (intentos === 1) {
                fila = null; columna = null; sopaNube = null; sopaPalabra = null; sopaDir = null; userSP = null
                intentos = 0
                await m.reply(`❌ Game Over! The word was "${sopaPalabra}" at ${sopaDir} row ${fila} col ${columna}`)
                return
            } else {
                intentos -= 1
                await m.reply(`❌ Wrong! ${intentos} attempts left\n\n${sopaNube}`)
                return
            }
        }
    }
}

handler.help = ['wordsearch', 'sopa', 'ws']
handler.tags = ['game']
handler.command = /^(wordsearch|sopa|ws|wordfind)$/i

export default handler