// GALAXIA GAME UNDER DEVELOPMENT -- Launching soon...
// By https://github.com/jeffersonalionco

import fs from 'fs-extra'
import simpleGit from 'simple-git'

const handler = async (m, { conn, args, usedPrefix, command }) => {
    createDataBase() // creates a database file in case it doesn't exist yet
    atualizarRepositorio() // Check if an update is needed, by querying the api at https://github.com/jeffersonalionco/database-galaxia/blob/master/database.json

    let infoDataHora = new Date()
    let horasEminutosAtual = `${infoDataHora.getHours()}:${infoDataHora.getMinutes()}`
    let horaAtual = infoDataHora.getHours()
    let minutoAtual = infoDataHora.getMinutes()

    let id
    if (m.chat) { id = m.chat } else { id = m.sender } // defines the chat id in which the conversation is happening

    let argumento = args[0]
    if (argumento != null && argumento != undefined) { argumento.toLowerCase() }
    let argumento1 = args[1]
    if (argumento1 != null && argumento1 != undefined) { argumento1.toLowerCase() }
    let argumento2 = args[2]
    if (argumento2 != null && argumento2 != undefined) { argumento2.toLowerCase() }

    try {

        // Reading Bot and game database
        let data = global.db.data.users[m.sender].gameglx
        let db = JSON.parse(fs.readFileSync(`./src/assets/glx/db/database.json`))

        setInterval(() => {
            verificacaoXp() // Checks the player's xp

        }, 5000)



        if (args[0] === null || args[0] === undefined) {
            criarGrupo() // Checks whether the game groups work and if not, creates another one automatically



            const str = `*╔═ 🪐GALAXY GAME🪐 ═╗*

 👨‍🚀 Hello *${m.pushName}*, It's time to travel through space, mine asteroids, talk to aliens and much more in the galactic world!

  *💰 Currency:* ${data.perfil.carteira.currency}


  *🌠 ${usedPrefix}glx _register_*
  _To register in GLX_
  
  *🌠 ${usedPrefix}glx _profile_*
  _Check your profile's progress._

  *🌠 ${usedPrefix}glx _sell_*
  _sell your chest items._
  


> 🧾 Attack / Defense / Travel

  *🌠 ${usedPrefix}glx _attack list_*
  _Lists all the players in the game!_

  *🌠 ${usedPrefix}glx _attack <player_username>_*
  _attack a user using their username!_

  *🌠 ${usedPrefix}glx _planet_*
  _Update Planet and Colony data_

  *🌠 ${usedPrefix}glx _travel_*
  _Want to visit another Planet? Let's go!_

> 🧾 Mining options

*🌠 ${usedPrefix}glx _miner_*
_Want money? Let's mine._



> 🧾 Your personal information 

  *🌠 ${usedPrefix}glx _wallet_*
  _Access your financial wallet._

  *🌠 ${usedPrefix}glx _shop_*
  _Discover our galaxy shop_

  *🌠 ${usedPrefix}glx _chest_*
  _Check your stored items_

 


  *🌟 ${usedPrefix}glx _creator_*
  _Information about the game's creator._

  *🌟 ${usedPrefix}glx _about_*
  _About the game._

  _News and automatic updates_
  _If you have any questions, get in touch_

  
*╘═══════════════════╛*
  🌞🌕🌠🌟⭐🌎🪐
`
            let glx_menu = fs.readFileSync('./src/assets/images/menu/main/galaxiaMenu.png')
            const selo1234 = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
            const idmessage = await conn.sendMessage(m.chat, { image: glx_menu, caption: str.trim() }, { quoted: selo1234 });
            const reactionMessage = { react: { text: "👨‍🚀", key: idmessage.key } }


            await conn.sendMessage(m.chat, reactionMessage)


        } else {

            criarGrupo() // checks game groups

            if (data.status === false) {


                switch (argumento.toLowerCase()) {
                   
                    case "cadastrar":
                        // Essential data for the game to run correctly.
                        data.status = true; // Activates the player's registration
                        data.perfil.nome = m.pushName // Saves the default WhatsApp name into the game
                        data.perfil.id = m.sender // saves the user's WhatsApp id

                        // Setting home as default
                        data.perfil.casa.id = db.planetas.terra.id // Default Planet Id for new Players
                        data.perfil.casa.planeta = db.planetas.terra.nomeplaneta // Default Planet Name for new Players
                        data.perfil.casa.colonia.nome = db.planetas.terra.colonias.colonia1.nome // Default Colony for new Players
                        data.perfil.casa.colonia.id = db.planetas.terra.colonias.colonia1.id //  Set the default group id
                        data.perfil.casa.idpelonome = db.planetas.terra.idpelonome // Sets the default id-by-name for the system
                        db.planetas.terra.habitantes.push(m.sender) // Adds the user as an inhabitant of planet Earth

                        // Changing the user's Location within Global
                        data.perfil.localizacao.status = true;
                        data.perfil.localizacao.nomeplaneta = db.planetas.terra.nomeplaneta;
                        data.perfil.localizacao.id = db.planetas.terra.id;
                        data.perfil.localizacao.idpelonome = db.planetas.terra.idpelonome;

                        // Register Username and save to db, and data
                        let numb = await fNumeroAleatorio(3000, 1)
                        data.perfil.username = `user${numb}`
                        if (!db.user_cadastrado.username.includes(data.perfil.username)) {
                            let dados = {
                                id: data.perfil.id,
                                username: data.perfil.username
                            }
                            db.user_cadastrado.username.push(dados)
                        }


                        // Adds the user to the game's registered list, and as an inhabitant of the Earth colony
                        // Only if the user isn't already on the list. it returns false otherwise
                        if (!db.user_cadastrado.lista.includes(m.sender)) {
                            db.planetas.terra.colonias.colonia1.habitantes.push(m.sender)
                            db.user_cadastrado.lista.push(m.sender)

                            fs.writeFileSync(`./src/assets/glx/db/database.json`, JSON.stringify(db)) // Writes the data to the file
                        }

                        let status = data.status === true ? 'Active' : 'Deactivated'
                        let nave = data.perfil.bolsa.naves.status === true ? 'Yes' : 'No' // Whether the user already has a ship or not
                        let username = data.perfil.username === null ? 'No username' : `@${data.perfil.username}` // whether the user already has a username

                        let maxX = db.planetas.terra.colonias.colonia1.localizacao.x + 150 // Defines the colony area
                        let minX = db.planetas.terra.colonias.colonia1.localizacao.x - 1   // Defines the colony area
                        let maxY = db.planetas.terra.colonias.colonia1.localizacao.y + 150 // Defines the colony area
                        let minY = db.planetas.terra.colonias.colonia1.localizacao.y - 1   // Defines the colony area

                        cadastrarPosicaoNoMapa(maxX, minX, maxY, minY, 'terra', 'colonia1') // Randomly assigns a position for the user on the map and registers it
                        conn.groupParticipantsUpdate(db.planetas.terra.id, [m.sender], "add") // Adds the user to the Earth group for the first time


                        enviar(`*_⚔️ YOU ARE NOW A STELLAR MEMBER🪐_*

Your information in the galaxy!
                        
*🧑Name: _${m.pushName}_*
*🌐Username: _${username}_*
*⏹️Status: _${status}_* 
*🚀Has a ship: _${nave}_*

\`\`\`🏠 Where do you live now?:\`\`\`
*🪐Your planet: _${data.perfil.casa.planeta}_*
*🏠Colony: _${data.perfil.casa.colonia.nome}_*

Configuration Commands:
*${usedPrefix}glx set name* - name
*${usedPrefix}glx set username* - username

Glx Commands in Groups (planet):
*${usedPrefix}glx planeta act* - Update colony data.

╔════════════════════╗

 *_⚙️ ALL COMMANDS_*
Use: ${usedPrefix}glx

╚════════════════════╝

*_🛸 GALAXY GAME 🛸_*

`)
                        /**
                         * DEVELOPER USE ONLY
                         */
                        conn.sendMessage('529996125657@s.whatsapp.net', { text: `New user registered: \n\nId: ${data.perfil.id} \n\nName: ${data.perfil.id}` })
                        conn.sendMessage('554598306644@s.whatsapp.net', { text: `New user registered: \n\nId: ${data.perfil.id} \n\nName: ${data.perfil.id}` })
                        break;
                    default:

                        enviar10s(`_😢You need to register in the game_\n\n> Use *${usedPrefix}glx cadastrar* \n_To register._\n\n😁 *register now, don't waste time.*`)
                        break;
                }

            } else if (data.status === true) {
                notificacao() // Notifications about code changes.
                switch (argumento.toLowerCase()) {
                    case 'cadastrar':
                        enviar10s(`_😁 Hello *${m.pushName}*, You're already registered._`)
                        break;
                     case 'bt':
                        await conn.sendMessage(m.sender, {
                            image: { url: '' },
                            caption: 'Choose an option:',
                            footer: 'Powered by GLX',
                            buttons: [
                                { buttonId: 'glx_help', buttonText: { displayText: 'Help' }, type: 1 },
                                { buttonId: 'glx_play', buttonText: { displayText: 'Play' }, type: 1 },
                                { buttonId: 'glx_status', buttonText: { displayText: 'Status' }, type: 1 }
                            ],
                            headerType: 4 // Header type with image
                        })
                        break;
                    case 'set':
                        switch (argumento1) {
                            case 'name':
                                // Just checks whether the name argument isn't null or undefined, otherwise changes the user's name
                                if (argumento2 != undefined || argumento2 != null) {
                                    data.perfil.nome = argumento2;
                                    enviarButton1(m.sender, `😁 Name changed to *${argumento2}*._ \nTo check, send *.glx* _perfil_`)
                                } else {
                                    enviarButton1(m.sender, `_😁 Tell me what the new name will be:_ \n\n Ex: *.glx* _set nome_ *_nametest_*`)
                                }



                                break;
                            case 'username':

                                let isLivre = true

                                // If the argument after username isn't valid, it won't allow the username change to proceed
                                if (argumento2 != undefined || argumento2 != null) {

                                    //console.log(Object.keys(global.db.data.users))
                                    // Goes through all bot users, checking if someone else is using the same username; if so, sets the variable to false, preventing the name change
                                    for (const id in global.db.data.users) {
                                        if (global.db.data.users[id]?.gameglx?.perfil?.username === `@${argumento2}`) {
                                            enviarButton1(m.sender, `This Username *(${argumento2})* already exists for another user!`)
                                            isLivre = false
                                        }
                                    }

                                    // If the username is taken by another user, this variable will be false after the loop
                                    if (isLivre === true) {
                                        data.perfil.username = `@${argumento2}`

                                        enviarButton1(m.sender, `😁Your username is now *${argumento2}*\nTo check, send *.glx* _perfil_`)

                                    }
                                } else {
                                    enviarButton1(m.sender, `_😁 Tell me what the new username will be:_ \n\n Ex: *.glx* _set username_ *_nametest_*`)
                                }
                                break;
                            default:
                                enviar(`
_:-) What would you like to change

*name* - Change your name in the glx game
*username* - Change your username in the glx game
                                    
                                _`, null, m.sender)
                                break;

                        }
                        break;
                    case "viajar":
                        if (data.perfil.bolsa.naves.status === false) return enviarButton1(m.sender, `*( ❌ ) You don't have a ship* \n\n Use *${usedPrefix}glx comprar nave n1* - To buy your first ship!\n\n_Or to see other ship models🏪 in the shop, use_: *${usedPrefix}glx loja*`)
                        switch (argumento1) {
                            case "terra":
                                if (data.perfil.casa.id === db.planetas[argumento1].id) return enviar10s(`*${data.perfil.casa.planeta}* _⚠️This planet is your home and you're already on it_`)
                                entrarplaneta('terra') // Don't change this name
                                break;
                            case "megatron":
                                if (data.perfil.casa.id === db.planetas[argumento1].id) return enviar10s(`*${data.perfil.casa.planeta}* _⚠️ This planet is your home, you're already on it_`);
                                entrarplaneta(argumento1.toLowerCase())
                                break;
                            case 'casa':
                                data.perfil.localizacao.viajando = false;
                                conn.groupParticipantsUpdate(data.perfil.casa.id, [m.sender], "add")
                                enviar(` 😉 *Hello again!* ${m.pushName}`, null, data.perfil.casa.id)
                                enviar(`${m.pushName} _You're back on Earth again 😉!_ `, null, id)
                                break;
                            default: // Default when sending "enter"
                                let str = `
╔════════════════════╗

*PLACES TO TRAVEL*

> --- PLANETS    
*✈️ ${usedPrefix}glx viajar terra*
_A beautiful planet!_

*✈️ ${usedPrefix}glx viajar megatron*
_A hostile planet with aggressive characteristics!_




> --- USEFUL COMMANDS
*⚙️ ${usedPrefix}glx viajar casa*
_If your ship breaks down, use this command to return_




 *_⚙️ ALL COMMANDS_*
Use: ${usedPrefix}glx

╚════════════════════╝

*_🛸  GALAXY GAME 🛸_*
                            `
                                enviarButton1(m.sender, str)
                                break;

                        }
                        break;
                    case 'comprar':
                    case 'loja':
                        switch (argumento1) { /** Checks which item to buy */
                            case 'nave':
                                switch (argumento2) {/* Buy Ships */
                                    case 'n1':
                                        // if (data.perfil.nave.status === true) return m.reply(`_{ ! } You already bought this ship!_`)
                                        comprarnave(argumento2)
                                        break;
                                    case "n2":
                                        // if (data.perfil.nave.status === true) return m.reply(`_{ ! } You already bought this ship!_`)
                                        comprarnave(argumento2)
                                        break;
                                    default:
                                        enviarButton1(m.sender, `*--- 🏪 SHOP - SHIP MODELS ---*
\n_Models:_
 *➥ n1* - SHIP N1
 💨 Speed: *${db.naves.n1.velocidade}*
 ⚡ Combat Power: *${db.naves.n1.poder}*
 🎮(XP) of the Ship: *(${db.naves.n1.xp})*
 💸Ship price: *${valorFormatado(db.naves.n1.valor)}*


 *➥ n2* - SHIP N2
 💨 Speed: *${db.naves.n2.velocidade}*
 ⚡ Combat Power: *${db.naves.n2.poder}*
 🎮(XP) of the Ship: *(${db.naves.n2.xp})*
 💸Ship price: *${valorFormatado(db.naves.n2.valor)}*


 *➥ n3* - SHIP N3
 💨 Speed: *${db.naves.n3.velocidade}*
 ⚡ Combat Power: *${db.naves.n3.poder}*
 🎮(XP) of the Ship: *(${db.naves.n3.xp})*
 💸Ship price: *${valorFormatado(db.naves.n3.valor)}*

 Usage example: *${usedPrefix}glx comprar nave n1*




 *_⚙️ ALL COMMANDS_*
Use: ${usedPrefix}glx

╚════════════════════╝

*_🛸  GALAXY GAME 🛸_*

 `)

                                        break;
                                }
                                break;

                            default:
                                enviarButton1(m.sender, `*--- 🏪 GALAXY SHOP ---*
                                
_Categories:_
↳ ship


Ex: To see the ships:
*${usedPrefix}glx loja nave*

Ex: Buy a ship:
*${usedPrefix}glx comprar nave n1*


╔════════════════════╗

 *_⚙️ ALL COMMANDS_*
Use: ${usedPrefix}glx

╚════════════════════╝

*_🛸  GALAXY GAME 🛸_*

`)
                                break;


                        }
                        break;
                    case "carteira":
                        if (m.isGroup === true) return enviar10s(`This command can only be used in private`)
                        let img = './src/assets/glx/carteira.jpeg'
                        let str = `*-- 💴 FINANCIAL WALLET --* 
                        
_ℹ️ Your Information:_
*🏧Balance:* ${valorFormatado(data.perfil.carteira.saldo)}

_Want to earn money?_
Use ${usedPrefix}glx vender


╔════════════════════╗

 *_⚙️ ALL COMMANDS_*
Use: ${usedPrefix}glx

╚════════════════════╝

*_🛸  GALAXY GAME 🛸_*

                        `

                       enviarButton2(m.sender, str, img)

                        break;
                    case 'planeta':
                        switch (argumento1) {
                            case 'act':
                                const colônias = db.planetas[data.perfil.casa.idpelonome].colonias
                                console.log(db.planetas[data.perfil.casa.idpelonome])
                                let dadoscolonias = ``
                                let Moradores1 = []
                                let Moradores2 = []




                                let str = `*Data for planet ${data.perfil.casa.planeta}*

*🏠Growing colonies:*
${listarNomesColônias(data.perfil.casa.idpelonome)}

${dadoscolonias1()}


╔════════════════════╗

 *_⚙️ ALL COMMANDS_*
Use: ${usedPrefix}glx

╚════════════════════╝

*_🛸  GALAXY GAME 🛸_*

`

                                function dadoscolonias1() {
                                    for (let i = 0; i < Object.keys(colônias).length; i++) {
                                        const nomeColônia = colônias[Object.keys(colônias)[i]].nome;
                                        const habitantes = colônias[Object.keys(colônias)[i]].habitantes;

                                        let Moradores = '*- Inhabitants:*\n'
