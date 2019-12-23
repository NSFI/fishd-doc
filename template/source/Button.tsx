import * as React from 'react'
import * as PropTypes from 'prop-types'

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger'

export interface BaseButtonProps {
  type?: ButtonType;
}

export type ButtonProps = BaseButtonProps;


class Button extends React.Component<any, any> {

  static defaultProps = {
    prefixCls: 'fishd-btn'
  };

  static propTypes = {
    type: PropTypes.string,
  };


  constructor(props: any) {
    super(props);
  }
  render() {
    const { type } = this.props;
    return <button type={type}>{this.props.children}</button>
  }
}

export default Button;
