// ╔══════════════════════════════════════════════════════════════╗
// ║           🎬  FIZA YOUTUBE DOWNLOADER                       ║
// ╚══════════════════════════════════════════════════════════════╝

import axios from 'axios'

export default async (link) => {
    const response = await fetch("https://www.yt1s.com/api/ajaxSearch/index", {
        method: "POST",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "https://www.yt1s.com/",
            "Origin": "https://www.yt1s.com"
        },
        body: new URLSearchParams({ q: link, vt: "home" })
    })

    if (!response.ok) { console.error(`Error: Received status ${response.status}`); return }
    const data = await response.json()

    const result = {
        title: data.title,
        duration: parseDuration(data.t),
        author: data.a
    }

    const resultUrl = {
        video: Object.values(data.links.mp4),
        audio: Object.values(data.links.mp3)
    }

    for (const i in resultUrl) {
        resultUrl[i] = resultUrl[i].map(v => ({
            size: v.size,
            format: v.f,
            quality: v.q,
            download: download.bind({}, data.vid, v.k)
        })).sort((a, b) => (a.quality.slice(0, -1) * 1) - (b.quality.slice(0, -1) * 1))
    }

    return { result, resultUrl }
}

async function download(id, k) {
    const response = await fetch("https://www.yt1s.com/api/ajaxConvert/convert", {
        method: "POST",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "https://www.yt1s.com/",
            "Origin": "https://www.yt1s.com",
        },
        body: new URLSearchParams({ vid: id, k })
    })
    const data = await response.json()
    return data.dlink
}

function parseDuration(s) {
    const h = Math.floor(s / 3600)
    const m = Math.floor(s / 60) % 60
    s = Math.floor(s) % 60
    return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":")
}