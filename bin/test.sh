export OUT_DIR=".test_build" &&
sh bin/build.sh &&
playwright test --retries=2 &&
rm -rf $OUT_DIR
