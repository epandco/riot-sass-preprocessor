import { join } from 'path';

import { lint } from 'stylelint';
import { renderSync } from 'sass';
import stripIndent from 'strip-indent';

export interface PreprocessorOptions {
  lint?: boolean;
  stylelintConfigPath?: string;
  includePaths?: string[];
  outputStyle?: 'compressed' | 'expanded';
}

type PreprocessorFn = (source: string, options: unknown) => Record<string, unknown>;
type RegisterPreprocessorFn = (type: string, name: string, preprocessor: PreprocessorFn) => void;

export function initRiotSassPreprocessor(
  registerPreprocessorFn: RegisterPreprocessorFn,
  options: PreprocessorOptions = {}
): void {
  options.lint = options.lint || true;
  options.stylelintConfigPath = options.stylelintConfigPath || join(process.cwd(), '.stylelintrc');
  options.includePaths = options.includePaths || [join(process.cwd(), 'src', 'sass')];
  options.outputStyle = options.outputStyle || 'compressed';

  registerPreprocessorFn('css', 'scss', (code, { options: { file } }) => {
    if (options.lint) {
      lint({
        configFile: options.stylelintConfigPath,
        code: stripIndent(code),
        codeFilename: file,
        formatter: 'string'
      }).then((data) => {
        if (data.errored) {
          console.log(data.output);
        }
      });
    }

    const { css } = renderSync({
      data: code,
      includePaths: options.includePaths,
      outputStyle: options.outputStyle
    });

    return {
      code: css.toString(),
      map: null
    };
  });
}