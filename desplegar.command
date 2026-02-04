#!/bin/bash
echo "Preparant per pujar Arrel a Internet..."
cd "$(dirname "$0")"

echo "1. Construint la web..."
npm run build

echo "2. Pujant a Netlify..."
echo "Si et demana Authorize, prem Enter..."

# Use --auth flag if token is available in env or try to force non-interactive
# Actually, the issue might be it's waiting for input. Let's try adding --open false to not auto-open browser if that's the issue
# Or simply add CI=true to key inputs minimal

export CI=true

if [ -f "./node_modules/.bin/netlify" ]; then
    ./node_modules/.bin/netlify deploy --prod --dir=dist
else
    npx netlify deploy --prod --dir=dist
fi

echo "✅ Fet! Ja pots tancar aquesta finestra."
read -p "Prem Enter per sortir..."
