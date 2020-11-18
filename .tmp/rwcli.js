
  const proxyquire = require("proxyquire")
  const fs = require('fs')
  const path = require('path')
  const files = {}
  const fileOverrides = {"file:///Users/dthyresson/Dropbox%20%28Personal%29/projects/redwoodjs/pectin/web/src/Routes.js":"// In this file, all Page components from 'src/pages` are auto-imported. Nested\n// directories are supported, and should be uppercase. Each subdirectory will be\n// prepended onto the component name.\n//\n// Examples:\n//\n// 'src/pages/HomePage/HomePage.js'         -> HomePage\n// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage\n\nimport { Router, Route } from '@redwoodjs/router'\n\nconst Routes = () => {\n  return (\n    <Router>\n      <Route notfound page={NotFoundPage} />\n    </Router>\n  )\n}\n\nexport default Routes\n"}
  const FILE_SCHEME = 'file://'

  function URL_file(f) {
    if (f.startsWith(FILE_SCHEME))
      f = f.substr(FILE_SCHEME.length)
    return new URL(FILE_SCHEME + path.normalize(f)).href
  }

  proxyquire('@redwoodjs/cli/dist', {
    fs: {
      mkdir() {},
      mkdirSync(...args) {},
      writeFile(a, b) {
        files[URL_file(a)] = b
      },
      writeFileSync(a, b) {
        files[URL_file(a)] = b
      },
      readFileSync(...args) {
        const f = URL_file(args[0])
        if (fileOverrides[f]) return fileOverrides[f]
        return fs.readFileSync.apply(fs, args)
      },
      '@global': true,
    },
  })

  process.on('exit', () => {
    console.log("---------===----===--------")
    console.log(JSON.stringify(files, null, 2))
  })
  