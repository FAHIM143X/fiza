
// ═══════════════════════════════════════════════
// 🎀 FIZA — JSC Plugin Loader
// ═══════════════════════════════════════════════

import { createRequire } from 'module'
import path from 'path'
import fs from 'fs'

const require = createRequire(import.meta.url)

export async function loadJscPlugin(pluginPath) {
    try {
        // Load compiled bytecode
        let mod = require(pluginPath)
        return mod.default || mod
    } catch (e) {
        console.error('Failed to load JSC:', pluginPath, e.message)
        return null
    }
}

// Override plugin loader to use .jsc files
export function getPluginFiles(dir) {
    let files = []
    let items = fs.readdirSync(dir)
    
    for (let item of items) {
        let full = path.join(dir, item)
        if (fs.statSync(full).isDirectory()) {
            files.push(...getPluginFiles(full))
        } else if (item.endsWith('.jsc')) {
            files.push(full)
        }
    }
    return files
}
