rm -rf $OUT_DIR && \
# Build & minify script files
./node_modules/.bin/esbuild \
src/panel/panel.ts \
src/panel/css/panel.css \
src/settings/settings.ts \
src/settings/css/settings.css \
src/*.ts \
--bundle --minify --outdir=$OUT_DIR && \
# Copy icons directory
cp -r ./src/icons ./$OUT_DIR && \
# Copy assets
find ./src -type f \( -name "*.html" -o -name "*.json" -o -name "*.mustache" \) -exec cp {} ./$OUT_DIR \;
