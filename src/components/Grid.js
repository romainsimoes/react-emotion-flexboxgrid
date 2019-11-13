import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config, { DIMENSION_NAMES } from '../config';

const Grid = styled('div')`
  margin-right: auto;
  margin-left: auto;
  ${(gridProps) => {
    if (gridProps.fluid) {
      return css`
        padding-right: ${(props) => `${config(props).outerMargin}rem`};
        padding-left: ${(props) => `${config(props).outerMargin}rem`};
      `;
    }
    return css`
      ${DIMENSION_NAMES.map(
        (t) =>
          config(gridProps).container[t] &&
          config(gridProps).media[t]`
        width: ${(props) => config(props).container[t]}rem;
      `
      )};
    `;
  }};
`;

Grid.displayName = 'Grid';

Grid.propTypes = {
  fluid: PropTypes.bool,
  children: PropTypes.node
};

export default Grid;
