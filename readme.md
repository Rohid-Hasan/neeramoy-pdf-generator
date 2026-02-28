.npmrc file code
@kamrulislam:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:\_authToken=YOUR_PAT_OF_GITHUB

//for publishing
npm publish

For installing in other project -

Step--1
create a .npmrc file on that project
--code
@rohid-hasan:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:\_authToken=YOUR_PAT_OF_GITHUB

Step--2
npm install @rohid-hasan/neeramoy-pdf-generator
