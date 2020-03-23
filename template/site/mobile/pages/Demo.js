/* eslint-disable array-bracket-spacing */
/* eslint-disable no-new-func */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { cold } from 'react-hot-loader'
import { transform } from 'babel-standalone'
import collect from '@/lib/collect'
import eventbus from '@/lib/eventbus'
import Home from '@/pages/Home'

import * as source from '../../../source/index'

import './Demo.less'

class Demo extends Component {
  constructor (props) {
    super(props)
    this.playerId = 'u-playerId'
  }

  componentDidMount () {
    this.renderDemoList()
    eventbus.on('reloadDemo', this.reloadDemo)
  }

  componentWillUnmount () {
    eventbus.removeAllListeners('reloadDemo')
  }

  reloadDemo = (data) => {
    const locationOne = location.hash.split('/') || []
    const locationTwo = location.hash.split('/') || []
    if (locationOne[locationOne.length - 1] === locationTwo[locationTwo.length - 1]) {
      this.renderSource(data.code, this.playerId + '-' + data.index)
    }
  }

  renderDemoList = () => {
    this.props.demos.forEach((item, index) => {
      this.renderSource(item.jsCode, this.playerId + '-' + index)
    })
  }

  renderSource = (value, playerId) => {
    new Promise((resolve) => {
      const args = [ 'context', 'React', 'ReactDOM' ]
      const argv = [ this, React, ReactDOM ]
      source &&
        Object.keys(source).forEach((key) => {
          args.push(key)
          argv.push(source[key])
        })
      resolve({ args, argv })
    })
      .then(({ args, argv }) => {
        let code
        if (/ReactDOM\.render/.test(value)) {
          code = transform(
            `
           ${value.replace('mountNode', `document.getElementById('${playerId}')`)}
        `,
            {
              presets: [ 'react', 'stage-1' ]
            }
          ).code
        } else {
          code = transform(
            `
          class Demo extends React.Component {
             ${value}
          }
          ReactDOM.render(<Demo {...context.props} />,
          document.getElementById('${playerId}'))
          `,
            {
              presets: [ 'react', 'stage-1' ]
            }
          ).code
        }
        args.push(code)
        new Function(...args).apply(null, argv)
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          throw err
        }
      })
  }

  goBack = () => {
    history.go(-1)
  }

  render () {
    const name = this.props.params.demo
    return (
      <div className='u-demo'>
        <div className='u-demo__header'>
          <div className='u-demo__back iconfont icon-arrowleft' onClick={this.goBack}></div>
          <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
        </div>
        <h3 className='u-demo__title'>组件{this.props.params.demo}示例</h3>
        <div className='u-demo__list'>
          {this.props.demos.map((item, index) => {
            return (
              <div id={item.id} key={index}>
                <div id={`${this.playerId}-${index}`} />
                {item.lessCode && <style>{item.lessCode}</style>}
                {item.cssCode && <style>{item.cssCode}</style>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default collect(cold(Demo), Home)
