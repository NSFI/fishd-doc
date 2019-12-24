import * as React from 'react'
import * as PropTypes from 'prop-types'

import './index.less'

export type ButtonType = 'default' | 'primary' | 'danger'
export type ButtonSize = 'small' | 'middle' | 'large'

export interface BaseButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
}

export type ButtonProps = BaseButtonProps;


class Button extends React.Component<any, any> {

  static defaultProps = {
    prefixCls: 'fishd-btn',
    type: 'default',
    size: 'middle'
  };

  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.string
  };


  constructor(props: any) {
    super(props);
  }
  render() {
    const { type, size, prefixCls, ...otherProps } = this.props;
    const classStr = `${prefixCls} ${prefixCls}__${type} ${prefixCls}__${size}`
    return <button type={type} className={classStr} {...otherProps}>{this.props.children}</button>
  }
}

export default Button;
