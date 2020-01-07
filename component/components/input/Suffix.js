import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Tooltip } from 'antd';

const defaultTooltip = {
    show: '显示密码',
    hide: '隐藏密码'
};

// const HoverIcon = `
//   cursor: pointer;
//   &:hover {
//     color: #40a9ff
//   }
// `

const Suffix = ({ tooltip = defaultTooltip, visible = false, ...otherProps }) => {
    return (
        <Tooltip title={visible ? tooltip.hide : tooltip.show}>
            {visible ? <Icon type="eye-o" {...otherProps} /> : <Icon type="eye" {...otherProps} />}
        </Tooltip>
    );
};

Suffix.propTypes = {
    tooltip: PropTypes.object,
    visible: PropTypes.bool
};

export default Suffix;