let handler = async (m, { conn, isAdmin, isOwner, isROwner, isBotAdmin, isGroup }) => {
    if (!isGroup) return m.reply('👥 Group only!')
    if (!isBotAdmin) return m.reply('🤖 Make me admin first!')

    let code = await conn.groupInviteCode(m.chat)
    m.reply(`🔗 *Group Link:* https://chat.whatsapp.com/${code}`)
}

handler.help = ['link', 'grouplink']
handler.tags = ['group']
handler.command = ['link', 'grouplink']
handler.group = true
handler.botAdmin = true
export default handler