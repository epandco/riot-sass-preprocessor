# Riot Sass Preprocessor

## Installation
```
npm install --save-dev @epandco/riot-sass-preprocessor
```

## Usage
To initialize the preprocessor, call `initRiotSassPreprocessor`, passing in a reference to `registerPreprocessor` from
[`@riotjs/compiler`](https://github.com/riot/compiler):

```ts
const { registerPreprocessor } = require('@riotjs/compiler');
const { initRiotSassPreprocessor } = require('@epandco/riot-sass-preprocessor');

initRiotSassPreprocessor(registerPreprocessor);
```

Additional options can be provided with a 2nd argument:

```ts
const { registerPreprocessor } = require('@riotjs/compiler');
const { initRiotSassPreprocessor } = require('@epandco/riot-sass-preprocessor');

initRiotSassPreprocessor(registerPreprocessor, {
  lint: false,
  outputStyle: 'expanded'
});
```

Available options:

```ts
interface PreprocessorOptions {

  lint?: boolean; // Default: true

  stylelintConfigPath?: string; // Default: './stylelintrc'

  includePaths?: string[]; // Default: ['./src/sass']

  outputStyle?: 'compressed' | 'expanded'; // Default: 'compressed'

}
```