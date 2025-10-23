const { cmd, commands } = require('../command');
const axios = require('axios');
const config = require('../config'); // ✅ Import config to access BOT_NAME

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for DML-MD bot",
    category: "download",
    use: ".pair 255785591XXX",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
    try {
        // Extract phone number
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // Validate number
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 255785591XXX`");
        }

        // Request pairing code
        const response = await axios.get(`https://dml-md-session-8bg5.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!response.data || !response.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;

        // Send formatted message
        await conn.sendMessage(from, {
            text: `♻ *DML-MD PAIRING COMPLETED*\n\n*Your pairing code is:* ${pairingCode}`,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363387497418815@newsletter',
                    newsletterName: config.BOT_NAME,
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Optional delay and resend clean code
        await new Promise(resolve => setTimeout(resolve, 2000));

        await conn.sendMessage(from, { text: pairingCode }, { quoted: mek });

    } catch (error) {
        console.error("Pair command error:", error);
        await reply("❌ An error occurred while getting pairing code. Please try again later.");
    }
});
