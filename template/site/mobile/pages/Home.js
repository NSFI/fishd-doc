import React, { Component } from 'react'
import { config } from '../config'
import './Home.less'

export default class Home extends Component {
  render () {
    const { nav } = config
    const menuList = nav.map(menu => {
      const subMenuList = menu.children.map(subMenu => {
        return (
          <div className="u-demo" key={subMenu.name}>{subMenu.name}</div>
        )
      })
      return (
        <div key={menu.name}>
          <h2 className="u-title">{menu.name}</h2>
          {subMenuList}
        </div>
      )
    })
    return (
      <div className="u-home">
        <div className="u-logo">
          <img src="//ysf.nosdn.127.net/unanqvsjrxhnpwqrulcuumqxicpwsojh"></img>
        </div>
        <p className="u-desc">轻量、可靠的移动端 React 组件库</p>
        {menuList}
      </div>
    )
  }
}
