// ═══════════════════════════════════════════════
// 🎀 FIZA — Truth or Dare Plugin (100+ Manual)
// ═══════════════════════════════════════════════

let handler = async (m, { args }) => {
    
    let truths = [
        "What's your biggest fear? 😨",
        "What's the last lie you told? 🤥",
        "Have you ever cheated on a test? 📝",
        "Who was your first crush? 💕",
        "What secret have you never told anyone? 🤫",
        "What's your guilty pleasure? 🫣",
        "Have you ever stalked someone online? 👀",
        "What's the worst thing you've ever done? 😈",
        "What's your biggest regret? 💔",
        "What's the most awkward date you've been on? 💑",
        "Have you ever pretended to like a gift? 🎁",
        "What's the longest you've gone without showering? 🚿",
        "What's the most embarrassing thing your parents caught you doing? 😳",
        "Have you ever ghosted someone? 👻",
        "What's the weirdest thing you've eaten? 🍽️",
        "Have you ever sent a text to the wrong person? 📱",
        "What's the most trouble you've been in? 🚔",
        "Have you ever lied about your age? 🎂",
        "What's your biggest insecurity? 🫣",
        "Have you ever cheated in a relationship? 💔",
        "What's the meanest thing you've ever said? 😤",
        "Have you ever stolen anything? 🥷",
        "What's the most embarrassing song on your playlist? 🎵",
        "Have you ever faked being sick? 🤒",
        "What's the worst haircut you've ever had? 💇",
        "Have you ever cried in public? 😢",
        "What's the most awkward thing you've said to a crush? 💬",
        "Have you ever been rejected? 💔",
        "What's the weirdest dream you've ever had? 💭",
        "Have you ever broken something and blamed someone else? 🫢",
        "What's your most embarrassing nickname? 🏷️",
        "Have you ever pretended to know someone? 🤝",
        "What's the worst date you've been on? 🌹",
        "Have you ever been caught lying? 🤥",
        "What's the strangest thing you've searched on Google? 🔍",
        "Have you ever eavesdropped on someone? 👂",
        "What's the most childish thing you still do? 🧸",
        "Have you ever been in love? 💘",
        "What's the worst gift you've ever received? 🎁",
        "Have you ever talked behind someone's back? 🗣️",
    ]
    
    let dares = [
        "Send a voice note singing Happy Birthday! 🎤",
        "Change your group PFP to something funny for 10 minutes! 📸",
        "Send your last selfie! 🤳",
        "Type the next 5 messages with your eyes closed! 👀",
        "Talk in rhyme for the next 5 minutes! 🎭",
        "Send a voice message in a funny accent! 🗣️",
        "Post 'I love FIZA bot' in the group! 💖",
        "Do 10 pushups and send proof! 💪",
        "Send your most recent photo! 📷",
        "Say a tongue twister 5 times fast! 👅",
        "Call a friend and say 'I love you'! 📞",
        "Send a voice note screaming 'I am the best!' 📢",
        "Post an embarrassing childhood photo! 👶",
        "Talk without using the letter 'E' for 5 minutes! 🗣️",
        "Do your best impression of a celebrity! 🌟",
        "Send a text to your last message saying 'I'm watching you'! 👁️",
        "Act like a chicken for 30 seconds! 🐔",
        "Send a voice note whispering everything! 🤫",
        "Post a status saying 'I am a potato'! 🥔",
        "Draw something with your eyes closed and send it! 🎨",
        "Sing a song in reverse! 🔄",
        "Send a voice note laughing for 10 seconds! 😂",
        "Do a dramatic reading of the last text you received! 📖",
        "Wear socks on your hands for the next 10 minutes! 🧦",
        "Send a message using only emojis! 🎯",
        "Record yourself doing a dance! 💃",
        "Call someone and speak only in questions! ❓",
        "Send a voice note in slow motion! 🦥",
        "Post 'I believe in unicorns' as your status! 🦄",
        "Do an impression of the person who sent the last message! 🎭",
        "Send a selfie with a funny face! 🤪",
        "Speak in third person for 10 minutes! 👤",
        "Send a voice note while holding your nose! 👃",
        "Post your most used emoji and explain why! 🤔",
        "Record yourself trying to rap! 🎤",
        "Send a message with your non-dominant hand! ✍️",
        "Act out a movie scene! 🎬",
        "Send a voice note yodeling! 🗣️",
        "Post 'I am secretly a superhero' with a straight face! 🦸",
        "Do a catwalk and send the video! 🐱",
    ]
    
    let type = args[0]?.toLowerCase()
    let botName = global.botname || 'FIZA'
    
    if (type === 'truth') {
        let t = truths[Math.floor(Math.random() * truths.length)]
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 😇 *TRUTH* ──╮
│
│ ❓ ${t}
│
╰── 🧁 Be honest! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
    
    if (type === 'dare') {
        let d = dares[Math.floor(Math.random() * dares.length)]
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 😈 *DARE* ──╮
│
│ 🎯 ${d}
│
╰── 🧁 Do it now! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎮 *${botName} TRUTH/DARE* ──╮
│
│ 📝 .tod truth → Get a truth
│ 📝 .tod dare → Get a dare
│
│ 📊 40 Truths | 40 Dares
╰── 🧁 Play with friends! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['tod', 'truthordare', 'truth', 'dare']
handler.tags = ['fun']
handler.command = ['tod', 'truthordare', 'truth', 'dare']
handler.group = true

export default handler