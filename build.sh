OUT_DIR="dist"

./node_modules/.bin/esbuild src/*.ts --bundle --minify --outdir=$OUT_DIR && \
./node_modules/.bin/esbuild src/*.css --bundle --minify --outdir=$OUT_DIR && \
find ./src -type f \( -name "*.html" -o -name "*.json" \) -exec cp {} ./$OUT_DIR \;
