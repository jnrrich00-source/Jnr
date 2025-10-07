const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();
const axios = require("axios");
const FormData = require("form-data");


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

        const buffer = await conn.downloadMediaMessage(imageMsg);
        await reply("⏳ Enhancing image to 8K quality...");

        // ✅ Use Dark-Yasiya Scrap API for remini
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

        const buffer = await conn.downloadMediaMessage(imageMsg);
        await reply("⏳ Removing background...");

        // ✅ Remove.bg API call with your key
        const form = new FormData();
        form.append("image_file", buffer, "input.jpg");
        form.append("size", "auto");

        const { data } = await axios.post("https://api.remove.bg/v1.0/removebg", form, {
            headers: {
                "X-Api-Key": "AS2LjSJAGVUjjCw2tjp4LkNW",
                ...form.getHeaders(),
            },
            responseType: "arraybuffer",
        });

        await conn.sendMessage(
            from,
            { image: data, caption: "✅ *Background Removed Successfully!*" },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✨', key: mek.key } });

    } catch (error) {
        console.error("RemoveBG Error:", error.response?.data || error.message);
        await reply(`❌ *Error removing background:* ${error.message || "Unknown error"}`);
    }
});


// 🎨 Command: cartoon (AI Cartoon Filter)
cmd({
    pattern: "cartoon",
    alias: ["anime", "toonify"],
    react: "🎨",
    desc: "Turn image into cartoon/anime style",
    category: "tools",
    use: ".cartoon (reply image)",
    filename: __filename
}, async (conn, m, mek, { from, reply }) => {
    try {
        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const imageMsg = quoted?.imageMessage;

        if (!imageMsg) {
            return await reply("❌ Please reply to an image to turn it into cartoon style.");
        }

        await reply("⏳ Turning image into cartoon/anime style...");

        // Download replied image
        const buffer = await conn.downloadMediaMessage(imageMsg);

        // Upload buffer to free HuggingFace cartoonify API
        const form = new FormData();
        form.append("image_file", buffer, "cartoon.jpg");

        const { data } = await axios.post("https://api-inference.huggingface.co/models/lllyasviel/ControlNet", form, {
            headers: {
                Authorization: "Bearer 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", // Free HuggingFace token
                ...form.getHeaders(),
            },
            responseType: "arraybuffer",
        });

        await conn.sendMessage(
            from,
            { image: data, caption: "✅ *Cartoon Style Applied!*" },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '🎨', key: mek.key } });

    } catch (error) {
        console.error("Cartoon Error:", error.message);
        await reply(`❌ *Error converting image:* ${error.message || "Unknown error"}`);
    }
});
