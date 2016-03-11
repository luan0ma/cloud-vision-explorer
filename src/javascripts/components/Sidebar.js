import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Tab, Tabs } from 'react-toolbox'
import Drawer from 'react-toolbox/lib/drawer'
import FontIcon from 'react-toolbox/lib/font_icon'
import IconButton from 'react-toolbox/lib/button'
import 'stylesheets/Sidebar'
import tabStyle from 'react-toolbox/lib/tabs/style'

export default class Sidebar extends React.Component {
  static get propTypes() {
    return {
      sidebar: PropTypes.object.isRequired,
      hideSidebar: PropTypes.func.isRequired,
      changeTab: PropTypes.func.isRequired,
    }
  }

  componentWillMount() {
    const dummy = require('json!../data/sample1.json')
    this.setState(s =>
      _.assign(s, { visionData: JSON.stringify(dummy, null, 2) }))
  }

  render() {
    const { sidebar, hideSidebar, changeTab } = this.props
    const classForTab = (index) => {
      return sidebar.tabIndex === index ? 'col-xs active' : 'col-xs'
    }
    return (
      <Drawer
        className="sidebar"
        active={sidebar.isActive} type="right"
        onOverlayClick={hideSidebar}
      >
        <ul className="feature-indicator row">
          <li className="col-xs active"><FontIcon value='label_outline' /></li>
          <li className="col-xs active"><FontIcon value='translate' /></li>
          <li className="col-xs"><FontIcon value='search' /></li>
          <li className="col-xs active"><FontIcon value='face' /></li>
          <li className="col-xs"><FontIcon value='donut_small' /></li>
          <li className="col-xs"><FontIcon value='place' /></li>
          <li className="col-xs"><FontIcon value='photo' /></li>
        </ul>
        <SidebarTabs
          className="detail-tab"
          index={sidebar.tabIndex}
          onChange={changeTab}
        >
          <Tab label='Graph' className={classForTab(0)}>test</Tab>
          <Tab label='Data' className={classForTab(1)}>
            <pre>{this.state.visionData}</pre>
          </Tab>
        </SidebarTabs>
      </Drawer>
    )
  }
}

class SidebarTabs extends Tabs {
  // Copied mainly from the original class, but modified some orders and styles
  render () {
    let className = tabStyle.root
    const { headers, contents } = this.parseChildren()
    if (this.props.className) className += ` ${this.props.className}`

    return (
      <div ref='tabs' data-react-toolbox='tabs' className={className}>
        {this.renderContents(contents)}
        <nav className={tabStyle.navigation} ref='navigation'>
          {this.renderHeaders(headers)}
        </nav>
        <span
          className={tabStyle.pointer}
          style={_.omit(this.state.pointer, 'top')}
        />
      </div>
    )
  }
}