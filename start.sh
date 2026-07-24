#!/bin/bash
# 🎀 FIZA Bot - Auto Restart

while true; do
    echo "🎀 Starting FIZA Bot..."
    node fiza.js
    echo "💔 Bot crashed! Restarting in 3 seconds..."
    sleep 3
done
