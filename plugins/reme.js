const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

// 📸 Command: remini (HD Enhancer)
cmd({
    pattern: "remini",
    alias: ["hd", "enhance"],
    react: "🧠",
    desc: "Make image 8K quality",
    category: "tools",
    use: ".remini (reply image)",
    filename: __filename
}, async (conn, m, mek, { from, reply }) => {
    try {
        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const imageMsg = quoted?.imageMessage;

        if (!imageMsg) {
            return await reply("❌ Please reply to an image to enhance it (8K HD).");
        }

        // ✅ Download image as Buffer instead of file path
        const buffer = await conn.downloadMediaMessage(imageMsg);
        await reply("⏳ Enhancing image to 8K quality...");

        // ✅ Send buffer directly to API
        const result = await dy_scrap.remini(buffer);
        if (!result?.url) return await reply("❌ Failed to enhance image!");

        await conn.sendMessage(
            from,
            { image: { url: result.url }, caption: "✅ *Enhanced to 8K HD!*" },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '📸', key: mek.key } });

    } catch (error) {
        console.error("Remini Error:", error);
        await reply(`❌ *Error enhancing image:* ${error.message || "Unknown error"}`);
    }
});


// 🧹 Command: removebg (Background Remover)
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

        // ✅ Download as buffer instead of saving file
        const buffer = await conn.downloadMediaMessage(imageMsg);
        await reply("⏳ Removing background...");

        // ✅ Send buffer to removebg function
        const result = await dy_scrap.removebg(buffer);
        if (!result?.url) return await reply("❌ Failed to remove background!");

        await conn.sendMessage(
            from,
            { image: { url: result.url }, caption: "✅ *Background Removed Successfully!*" },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✨', key: mek.key } });

    } catch (error) {
        console.error("RemoveBG Error:", error);
        await reply(`❌ *Error removing background:* ${error.message || "Unknown error"}`);
    }
});
