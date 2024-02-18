./node_modules/.bin/esbuild src/*.ts src/*.css --bundle --minify --outdir=$OUT_DIR && \
find ./src -type f \( -name "*.html" -o -name "*.json" -o -name "*.mustache" \) -exec cp {} ./$OUT_DIR \;
