# remove previous packages
rm -rf build/mirador*

# build package
node_modules/.bin/grunt build

# mk tmp release dir
mkdir build/tmp

# unzip build
unzip build/mirador.zip -d build/tmp

# checkout github pages
git checkout gh-pages

# remove directories
rm -rf demo/css demo/fonts demo/images demo/locales demo/plugins demo/skins demo/themes

# copy over new directories
cp -R build/tmp/mirador/css demo
cp -R build/tmp/mirador/fonts demo
cp -R build/tmp/mirador/images demo
cp -R build/tmp/mirador/locales demo
cp -R build/tmp/mirador/plugins demo
cp -R build/tmp/mirador/skins demo
cp -R build/tmp/mirador/themes demo

# Copy over files
cp build/tmp/mirador/mirador.min.js demo
cp build/tmp/mirador/mirador.js demo
cp build/tmp/mirador/ZeroClipboard.swf demo

# Clean up extra files
rm demo/css/mirador-combined.css

# Clean up unpacked build
rm -rf build/tmp

# Add and commit demo files
git add demo/
git commit -m 'update demo'
git push origin gh-pages

git checkout -
