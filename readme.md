#.npmrc file code

@kamrulislam:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:\_authToken=YOUR_PAT_OF_GITHUB

#For Creating a Token -

Go to https://github.com/settings/tokens or if the link is invalid then,

- click on the right side profile picture
- settings >> developer settings >> classic tokens
- generate new token >> generate new token (classic) >> give it access to repo + write packages + github (cicd if needed)

#For Publishing
npm publish (one time only)

#For installing in other project -

- create a .npmrc file on that project
  --code
  @rohid-hasan:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:\_authToken=YOUR_PAT_OF_GITHUB

- Run the command
  npm install @rohid-hasan/neeramoy-pdf-generator
