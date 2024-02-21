rm -rf $OUT_DIR && \
./node_modules/.bin/esbuild \
src/panel/panel.ts \
src/panel/css/panel.css \
src/settings/settings.ts \
src/settings/css/settings.css \
src/*.ts \
--bundle --minify --outdir=$OUT_DIR && \
find ./src -type f \( -name "*.html" -o -name "*.json" -o -name "*.mustache" \) -exec cp {} ./$OUT_DIR \;
