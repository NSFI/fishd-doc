import React, { Component } from 'react'
import Doc from '@/components/Doc'
import { plainComponents } from '@/config'
import renderer from './renderer'
import './style/index.less'
export default class Demo extends Component {
  render () {
    // TODO: 判断是组件还是markdown
    const menuItem = plainComponents.find(itm => itm.key === this.props.params.demo)

    if (menuItem || !this.props.params.demo) {
      if (menuItem && menuItem.type === 'react') {
        const Demo = menuItem.component.default
        return (
          <div className="u-demo">
            <Demo {...this.props} />
          </div>
        )
      } else {
        return (
          <div className="u-demo">
            <Doc renderer={renderer} {...this.props}></Doc>
          </div>
        )
      }
    } else {
      location.assign('/#/home')
      return null
    }
  }
}
