# remove previous packages
rm -rf build dist

# build package
node_modules/.bin/grunt build

# mk tmp release dir
mkdir -p build/tmp/build/mirador

# copy mirador build into tmp folder
cp -r build/mirador/* build/tmp/build/mirador

# add example(s)
cp examples/example.html build/tmp/build

cd build/tmp

# zip it up
zip -r build/build.zip build/
mv build/build.zip ../

tar -czvf build/build.tar.gz build/
mv build/build.tar.gz ../

# remove temporary files
cd .. && rm -rf tmp

# make npm dist directory
cd ..
mkdir dist
cp -r build/mirador/* dist
