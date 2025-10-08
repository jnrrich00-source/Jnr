cmd({
    pattern: "removebg",
    alias: ["rmbg", "bgremove"],
    react: "🧼",
    desc: "Remove image background",
    category: "tools",
    use: ".removebg (reply image)",
    filename: __filename
}, async (conn, m, mek, { from, reply }) => {
    try {
        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const imageMsg = quoted?.imageMessage;

        if (!imageMsg) {
            return await reply("❌ Please reply to an image to remove background.");
        }

        // Download image buffer
        const buffer = await conn.downloadMediaMessage(imageMsg);
        console.log('Buffer received:', buffer.length); // Check if the buffer size is as expected
        await reply("⏳ Removing background...");

        // Use Remove.bg official API with your new API key
        const form = new FormData();
        form.append("image_file", buffer, "input.jpg");
        form.append("size", "auto");

        // Send request to Remove.bg API
        const { data } = await axios.post("https://api.remove.bg/v1.0/removebg", form, {
            headers: {
                "X-Api-Key": "3VHmWLKeioVRWWsMhsv8ZAz6", // Your new Remove.bg API Key
                ...form.getHeaders(),
            },
            responseType: "arraybuffer",
        });

        console.log('Response data:', data); // Check if the response data is as expected

        // Send the result image
        await conn.sendMessage(
            from,
            { 
                image: data, 
                caption: "✅ *Background Removed Successfully!*",
                contextInfo: { 
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363401025139680@newsletter",
                        newsletterName: "DML-BG",
                        serverMessageId: 13
                    }
                }
            },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✨', key: mek.key } });

    } catch (error) {
        console.error("RemoveBG Error:", error.response?.data || error.message);
        await reply(`❌ *Error removing background:* ${error.response?.data || error.message || "Unknown error"}`);
    }
});
