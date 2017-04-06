# remove previous packages
rm -rf build/mirador*

# build package
node_modules/.bin/grunt package

# mk tmp release dir
mkdir -p build/tmp/build/mirador

# unzip build
unzip build/mirador.zip -d build/tmp/build

# add example
cp examples/example.html build/tmp/build

cd build/tmp

# zip it up
zip -r build/build.zip build/
mv build/build.zip ../

tar -czvf build/build.tar.gz build/
mv build/build.tar.gz ../

cd -
