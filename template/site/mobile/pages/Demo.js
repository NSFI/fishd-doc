import React, { Component } from 'react'
import { Button } from '../../../source/index'
export default class Demo extends Component {
  render () {
    return (
      <div>
        组件<em>{this.props.params.demo}</em>示例
        <Button type="primary">我是示例按钮</Button>
      </div>
    )
  }
}
