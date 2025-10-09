const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "lyrics1",
    alias: ["lyric", "words"],
    react: "🎵",
    desc: "Get lyrics of a song",
    category: "music",
    use: ".lyrics <song name>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a song name!");

        await reply(`🔍 Searching lyrics for: *${q}*...`);

        // Fetch lyrics from API
        const apiUrl = `https://some-random-api.ml/lyrics?title=${encodeURIComponent(q)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API returned status ${response.status}`);
        const data = await response.json();

        if (!data || !data.lyrics) return await reply("❌ Lyrics not found!");

        // Limit message length (some platforms have limits)
        let lyrics = data.lyrics;
        if (lyrics.length > 4000) {
            lyrics = lyrics.substring(0, 3997) + '...';
        }

        await conn.sendMessage(from, {
            text: `🎵 *${data.title}* by *${data.author}*\n\n${lyrics}`
        }, { quoted: mek });

    } catch (error) {
        console.error("Lyrics Command Error:", error);
        await reply(`❌ Error: ${error.message}`);
    }
});
