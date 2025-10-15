const {
  gmd,
  config,
  commands,
  fetchJson,
  getBuffer,
  GiftedApkDl
} = require("../lib");
const {
  PREFIX: prefix
} = config;
const axios = require("axios");
yts = require("yt-search");
gmd({
  'pattern': "igdl1",
  'alias': ["instagram", 'insta', 'ig'],
  'react': '⬇️',
  'desc': "Download Instagram videos/reels",
  'category': "download",
  'filename': __filename
}, async (_0x5d89bb, _0x5aa720, _0x52102a, {
  from: _0x1aeabb,
  args: _0x878407,
  q: _0xec9694,
  reply: _0x67724
}) => {
  try {
    const _0x1944b0 = _0xec9694 || _0x52102a.quoted?.['text'];
    if (!_0x1944b0 || !_0x1944b0.includes("instagram.com")) {
      return _0x67724("❌ Please provide/reply to an Instagram link");
    }
    await _0x5d89bb.sendMessage(_0x1aeabb, {
      'react': {
        'text': '⏳',
        'key': _0x52102a.key
      }
    });
    const _0x51e360 = 'https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=' + encodeURIComponent(_0x1944b0);
    const _0x55bcf5 = await axios.get(_0x51e360);
    if (!_0x55bcf5.data?.["status"] || !_0x55bcf5.data.data?.["length"]) {
      await _0x5d89bb.sendMessage(_0x1aeabb, {
        'react': {
          'text': '❌',
          'key': _0x52102a.key
        }
      });
      return _0x67724("Failed to fetch media. Invalid link or private content.");
    }
    for (const _0x3d9832 of _0x55bcf5.data.data) {
      await _0x5d89bb.sendMessage(_0x1aeabb, {
        [_0x3d9832.type === "video" ? "video" : "image"]: {
          'url': _0x3d9832.url
        },
        'caption': "📶 *Instagram Downloader*\n\n- ❤‍🩹 *Quality*: HD\n\n> *DML-TECH*"
      }, {
        'quoted': _0x5aa720
      });
    }
    await _0x5d89bb.sendMessage(_0x1aeabb, {
      'react': {
        'text': '✅',
        'key': _0x52102a.key
      }
    });
  } catch (_0x1b337f) {
    console.error("IGDL Error:", _0x1b337f);
    await _0x5d89bb.sendMessage(_0x1aeabb, {
      'react': {
        'text': '❌',
        'key': _0x52102a.key
      }
    });
    _0x67724("❌ Download failed. Try again later.");
  }
});
gmd({
  'pattern': "play5",
  'alias': ['ytmp3', "yta"],
  'desc': "Download YouTube songs",
  'category': "download",
  'react': '🎵',
  'filename': __filename
}, async (_0x13c3f3, _0x3617e4, _0x5e2e26, {
  from: _0x1b6ad0,
  args: _0x236523,
  q: _0xf533fc,
  reply: _0x19e2e6
}) => {
  try {
    if (!_0xf533fc) {
      return _0x19e2e6("🎶 Please provide song name!\n\nExample: .play Moye Moye");
    }
    const {
      videos: _0x13fd0c
    } = await yts(_0xf533fc);
    if (!_0x13fd0c || _0x13fd0c.length === 0x0) {
      return _0x19e2e6("❌ No results found!");
    }
    const _0x10fa20 = _0x13fd0c[0x0];
    const _0x5633e4 = "https://apis-keith.vercel.app/download/dlmp3?url=" + encodeURIComponent(_0x10fa20.url);
    const _0x545236 = await axios.get(_0x5633e4);
    const _0x3263a9 = _0x545236.data;
    if (!_0x3263a9?.['status'] || !_0x3263a9?.["result"]?.["data"]?.["downloadUrl"]) {
      return _0x19e2e6("❌ Download failed! Try again later.");
    }
    const _0x3b3003 = _0x3263a9.result.data.downloadUrl;
    const _0x4f81ec = _0x3263a9.result.data.title || "song";
    await _0x13c3f3.sendMessage(_0x1b6ad0, {
      'audio': {
        'url': _0x3b3003
      },
      'mimetype': "audio/mpeg",
      'fileName': _0x4f81ec + ".mp3"
    }, {
      'quoted': _0x3617e4
    });
    await _0x13c3f3.sendMessage(_0x1b6ad0, {
      'react': {
        'text': '✅',
        'key': _0x5e2e26.key
      }
    });
  } catch (_0x370596) {
    console.error("Error in play command:", _0x370596);
    _0x19e2e6("❌ Error occurred, try again later!");
    await _0x13c3f3.sendMessage(_0x1b6ad0, {
      'react': {
        'text': '❌',
        'key': _0x5e2e26.key
      }
    });
  }
});
gmd({
  'pattern': "video1",
  'alias': ["ytmp4", "ytv"],
  'desc': "Download YouTube videos",
  'category': "download",
  'react': '📹',
  'filename': __filename
}, async (_0x5c34af, _0x1caad3, _0x974e48, {
  from: _0x2f8151,
  args: _0x1b0baf,
  q: _0x186646,
  reply: _0x892d77
}) => {
  try {
    if (!_0x186646) {
      return _0x892d77("📺 Please provide video name or URL!\n\nExample: .video funny cat");
    }
    let _0x174005 = _0x186646;
    if (!_0x186646.includes('youtube.com') && !_0x186646.includes("youtu.be")) {
      const {
        videos: _0x38dd7f
      } = await yts(_0x186646);
      if (!_0x38dd7f || _0x38dd7f.length === 0x0) {
        return _0x892d77("❌ No results found!");
      }
      _0x174005 = _0x38dd7f[0x0].url;
    }
    const _0x51c07d = "https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=" + encodeURIComponent(_0x174005);
    const _0x35bde2 = await axios.get(_0x51c07d);
    const _0x5c11ea = _0x35bde2.data;
    if (!_0x5c11ea?.['status'] || !_0x5c11ea?.["result"]?.['media']) {
      return _0x892d77("❌ Download failed! Try again later.");
    }
    const _0x22ee77 = _0x5c11ea.result.media;
    const _0x426f3d = _0x22ee77.video_url_hd !== "No HD video URL available" ? _0x22ee77.video_url_hd : _0x22ee77.video_url_sd !== "No SD video URL available" ? _0x22ee77.video_url_sd : null;
    if (!_0x426f3d) {
      return _0x892d77("❌ No downloadable video found!");
    }
    await _0x5c34af.sendMessage(_0x2f8151, {
      'video': {
        'url': _0x426f3d
      },
      'caption': "> *" + _0x22ee77.title + " Downloaded Successfully ✅*\n> *DML-TECH*"
    }, {
      'quoted': _0x1caad3
    });
    await _0x5c34af.sendMessage(_0x2f8151, {
      'react': {
        'text': '✅',
        'key': _0x974e48.key
      }
    });
  } catch (_0x4ad786) {
    console.error("Error in video command:", _0x4ad786);
    _0x892d77("❌ Error occurred, try again later!");
    await _0x5c34af.sendMessage(_0x2f8151, {
      'react': {
        'text': '❌',
        'key': _0x974e48.key
      }
    });
  }
});
gmd({
  'pattern': "tiktok1",
  'alias': ["ttdl", 'tt', "tiktokdl"],
  'desc': "Download TikTok video without watermark",
  'category': "download",
  'react': '🎀',
  'filename': __filename
}, async (_0x899514, _0x57c0ff, _0x83cda0, {
  from: _0x22c19a,
  args: _0x1f68ef,
  q: _0x4c5d58,
  reply: _0x4fa984
}) => {
  try {
    if (!_0x4c5d58) {
      return _0x4fa984("Please provide a TikTok video link.");
    }
    if (!_0x4c5d58.includes("tiktok.com")) {
      return _0x4fa984("Invalid TikTok link.");
    }
    const _0x2b99a2 = 'https://delirius-apiofc.vercel.app/download/tiktok?url=' + _0x4c5d58;
    const {
      data: _0xc3e60d
    } = await axios.get(_0x2b99a2);
    if (!_0xc3e60d.status || !_0xc3e60d.data) {
      return _0x4fa984("Failed to fetch TikTok video.");
    }
    const {
      title: _0x305e0b,
      like: _0x1416de,
      comment: _0x27c405,
      share: _0x322760,
      author: _0x20c866,
      meta: _0x31b707
    } = _0xc3e60d.data;
    const _0x330b32 = _0x31b707.media.find(_0x38b3af => _0x38b3af.type === "video").org;
    await _0x899514.sendMessage(_0x22c19a, {
      'video': {
        'url': _0x330b32
      },
      'caption': "DML-TECH",
      'contextInfo': {
        'mentionedJid': [_0x83cda0.sender]
      }
    }, {
      'quoted': _0x57c0ff
    });
  } catch (_0x3de441) {
    console.error("Error in TikTok downloader command:", _0x3de441);
    _0x4fa984("An error occurred: " + _0x3de441.message);
  }
});
gmd({
  'pattern': "gitclone1",
  'desc': "Clone/Download GitHub Repositories",
  'category': "downloader",
  'filename': __filename
}, async (_0x24b31b, _0xa30ccb, _0x40073a, {
  from: _0x4a06cd,
  quoted: _0x47bb8d,
  body: _0x5ebd39,
  isCmd: _0x15240f,
  command: _0x112c49,
  args: _0x574793,
  q: _0x11f191,
  isGroup: _0x3f7f85,
  sender: _0x245ca1,
  senderNumber: _0x329a77,
  botNumber2: _0x37211f,
  botNumber: _0x33e998,
  pushname: _0x3ddfd6,
  isMe: _0x5cb19c,
  isOwner: _0x3bcf2c,
  groupMetadata: _0x113810,
  groupName: _0x4a5611,
  participants: _0x426991,
  groupAdmins: _0x4615a9,
  isBotAdmins: _0x536b48,
  isAdmins: _0x264235,
  reply: _0x55e8d7
}) => {
  try {
    if (!_0x11f191) {
      return _0x55e8d7("Please provide a GitHub repository URL, e.g.,\n" + prefix + "gitclone https://github.com/MLILA17/DML-MD");
    }
    const _0x46c635 = _0x11f191.trim();
    if (!_0x46c635.includes("github.com")) {
      return _0x55e8d7("Is that a valid GitHub repo link?!");
    }
    let _0x46d175 = /(?:https:\/\/|git@)github\.com[\/:]([^\/:]+)\/([^\/:\.]+)(?:\.git)?/i;
    let _0x4a6bdf = _0x46c635.match(_0x46d175);
    if (!_0x4a6bdf) {
      return _0x55e8d7("The provided URL does not appear to be a valid GitHub repository link.");
    }
    let [, _0x21ee9f, _0x48220b] = _0x4a6bdf;
    let _0x39134f = "https://api.github.com/repos/" + _0x21ee9f + '/' + _0x48220b + '/zipball';
    let _0x2236c8 = await fetch(_0x39134f, {
      'method': "HEAD"
    });
    if (!_0x2236c8.ok) {
      return _0x55e8d7("Failed to fetch repository details. Make sure the URL is correct and the repository is public.");
    }
    let _0x1b0c6d = _0x2236c8.headers.get("content-disposition");
    let _0x12b23c = _0x1b0c6d ? _0x1b0c6d.match(/attachment; filename=(.*)/)[0x1] : _0x48220b + ".zip";
    await _0x24b31b.sendMessage(_0x4a06cd, {
      'document': {
        'url': _0x39134f
      },
      'mimetype': 'application/zip',
      'fileName': _0x12b23c
    }, {
      'quoted': _0xa30ccb
    });
  } catch (_0x31c24e) {
    console.error(_0x31c24e);
    _0x55e8d7("An error occurred: " + _0x31c24e.message);
  }
});
gmd({
  'pattern': "apk1",
  'alias': ["app", 'apkdl'],
  'desc': "Download Android Apps",
  'use': ".apk <app_name>",
  'react': '📥',
  'category': 'downloader',
  'filename': __filename
}, async (_0x187e20, _0x124910, _0x50b768, {
  from: _0x193ad3,
  quoted: _0x2e0d07,
  body: _0x22cb39,
  q: _0x230437,
  reply: _0x310433
}) => {
  const _0x3437f5 = _0x230437.trim();
  if (!_0x3437f5) {
    return _0x310433("Please provide an app name for the link ❗");
  }
  _0x310433("_Downloading " + _0x3437f5 + '_');
  try {
    const _0x341a8b = await GiftedApkDl(_0x3437f5);
    const _0x36359f = await getBuffer(_0x341a8b.link);
    if (!_0x36359f || !_0x341a8b.appname) {
      await _0x50b768.react('❌');
    }
    await _0x187e20.sendMessage(_0x193ad3, {
      'document': _0x36359f,
      'caption': "Quoted is Your App\n> " + global.footer,
      'mimetype': "application/vnd.android.package-archive",
      'fileName': _0x341a8b.appname + ".apk"
    }, {
      'quoted': _0x124910
    });
    await _0x50b768.react('✅');
  } catch (_0x588aa3) {
    console.log(_0x588aa3);
    await _0x50b768.react('❌');
    _0x310433("Error: " + _0x588aa3.message);
  }
});
