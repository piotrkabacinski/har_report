tsc --project tsconfig.json && \
find ./src -type f \( -name "*.html" -o -name "*.css" \) -exec cp {} ./dist \;
cp ./manifest.json ./dist
