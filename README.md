# zooniverse-ui-es6-template

## Usage

Available on [npm](http://npmjs.com), include as a dependency using `npm install --save _______`

Description: Template to start an es6 lib. Clone this repo and add code 

```bash
git clone git@github.com:zooniverse-ui/zooniverse-ui-es6-template your-project-name

```

To setup automated testing you'll need to:

+ Enable a build on travis-ci.org
+ Create a new user for the project on Sauce Labs
+ Run:

```bash
travis encrypt SAUCE_USERNAME=<sauce username> -r <travis-username>/<repo> --add
travis encrypt SAUCE_ACCESS_KEY=<sauce api key> -r <travis-username>/<repo> --add
```

+ Then `git push`

## Supported Properties

### Module name

| property | default | effect |
|----------|:-------:|--------|
| name  | `defaultValue` | short description |

## Contributing

See [CONTRIBUTING.md](https://github.com/zooniverse-ui/markdownz/tree/master/CONTRIBUTING.md)

## License

Copyright 2015 by The Zooniverse. Licensed under the Apache Public License v2. See [LICENSE](https://github.com/zooniverse-ui/markdownz/tree/master/LICENSE) for details.
