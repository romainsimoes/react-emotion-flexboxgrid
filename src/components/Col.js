import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isInteger from 'lodash.isinteger';

import config, { DIMENSION_NAMES } from '../config';

const ModificatorType = PropTypes.oneOfType([PropTypes.number, PropTypes.bool]);

const offsetProps = DIMENSION_NAMES.map((dimension) => `${dimension}Offset`);
const DimensionPropTypes = DIMENSION_NAMES.reduce((propTypes, dimension) => {
  propTypes[dimension] = ModificatorType;
  propTypes[`${dimension}Offset`] = PropTypes.number;
  return propTypes;
}, {});

const Col = styled('div')`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-right: ${(p) => config(p).gutterWidth / 2}rem;
  padding-left: ${(p) => config(p).gutterWidth / 2}rem;

  ${(p) =>
    p.reverse &&
    `
    flex-direction: column-reverse;
  `}

  ${(p) =>
    Object.keys(p)
      .filter((k) => DIMENSION_NAMES.indexOf(k) >= 0)
      .sort(
        (k1, k2) => DIMENSION_NAMES.indexOf(k1) - DIMENSION_NAMES.indexOf(k2)
      )
      .map((k) => {
        // default is Hide element
        let cssValue = 'display: none;';
        if (isInteger(p[k])) {
          cssValue = `
            flex-basis: ${100 / config(p).gridSize * p[k]}%;
            max-width: ${100 / config(p).gridSize * p[k]}%;
            display: block;
          `;
        } else if (p[k]) {
          // Auto-width
          cssValue = `
            flex-grow: 1;
            flex-basis: 0;
            max-width: 100%;
            display: block;
          `;
        }
        return config(p).media[k]`${cssValue}`;
      })}

  ${(p) =>
    Object.keys(p)
      .filter((k) => offsetProps.indexOf(k) >= 0)
      .map(
        (k) => config(p).media[k.replace(/Offset$/, '')]`
        margin-left: ${100 / config(p).gridSize * p[k]}%;
      `
      )}
`;

Col.displayName = 'Col';

Col.propTypes = {
  ...DimensionPropTypes,
  reverse: PropTypes.bool,
  children: PropTypes.node
};

export default Col;
