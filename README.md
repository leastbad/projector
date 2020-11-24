# Stimulus Projector

[![](https://img.shields.io/npm/dt/stimulus-projector.svg)](https://www.npmjs.com/package/stimulus-projector)
[![](https://img.shields.io/npm/v/stimulus-projector.svg)](https://www.npmjs.com/package/stimulus-projector)
[![](https://github.com/leastbad/stimulus-projector/workflows/Lint/badge.svg)](https://github.com/leastbad/stimulus-projector)
[![](https://img.shields.io/github/license/leastbad/stimulus-projector.svg)](https://github.com/leastbad/stimulus-projector)
[![Netlify Status](https://api.netlify.com/api/v1/badges/PENDING/deploy-status)](https://stimulus-projector.netlify.com)

## Getting started

## Installation

```bash
$ yarn add stimulus-projector
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Projector from "stimulus-projector"

const application = Application.start()
application.register("projector", Projector)
```

## Usage

## Development

### Project setup
```bash
$ yarn install
$ yarn dev
```

### Linter
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are responsible to lint and format this component:
```bash
$ yarn lint
$ yarn format
```

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
