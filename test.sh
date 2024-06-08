export OUT_DIR=".test_build" &&
sh build.sh &&
playwright test --retries=2 &&
rm -rf $OUT_DIR
