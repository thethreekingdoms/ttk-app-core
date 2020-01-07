import React from 'react';
import { Input, Tooltip } from 'antd';

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {

  onChange = (e) => {
    const { value } = e.target;
    const { onChange, match } = this.props;
    const myReg = match === 'int' ? /^[0-9]*$/ : /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && myReg.test(value)) || value === '' || value === '-') {
      onChange(value);
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    let { value, onBlur, onChange,notZero } = this.props;
    value = String(value);
    if(notZero && Number(value)===0){
      onChange('');
    }else if (value && value.charAt(value.length - 1) === '.' || value === '-') {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { value, hideTip, max, placeholder } = this.props;
    if (hideTip) {
      return (
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          maxLength={max || 25}
        />
      );
    }
    const title = value ? (
      <span className="numeric-input-title">
        {value !== '-' ? formatNumber(value) : '-'}
      </span>
    ) : (placeholder || 'Input a number');
    return (
      <Tooltip
        trigger={['focus']}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          maxLength={max || 25}
        />
      </Tooltip>
    );
  }
}

export default NumericInput