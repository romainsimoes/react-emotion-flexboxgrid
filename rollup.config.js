import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import visualizer from 'rollup-plugin-visualizer';

const globals = {
  react: 'React',
  '@emotion/styled': 'styled',
  'prop-types': 'PropTypes',
  'lodash.isinteger': '_.isInteger'
};
const name = 'react-emotion-flexboxgrid';

const plugins = [
  babel({
    plugins: ['external-helpers']
  })
];

const base = {
  input: 'src/index.js',
  external: ['react', '@emotion/styled', 'prop-types', 'lodash.isinteger'],
  plugins
};

export default [
  Object.assign({}, base, {
    output: [
      {
        file: 'dist/react-emotion-flexboxgrid.js',
        format: 'umd',
        exports: 'named',
        name,
        globals
      },
      {
        file: 'dist/react-emotion-flexboxgrid.es.js',
        format: 'es',
        exports: 'named',
        name,
        globals
      }
    ]
  }),
  Object.assign({}, base, {
    output: [
      {
        file: 'dist/react-emotion-flexboxgrid.min.js',
        format: 'umd',
        exports: 'named',
        name,
        globals
      }
    ],
    plugins: base.plugins.concat([
      uglify(),
      visualizer({ filename: './bundle-stats.html' })
    ])
  })
];
