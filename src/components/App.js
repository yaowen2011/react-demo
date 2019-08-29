// React中的路由是：浏览器地址栏中的哈希值（#/home） 与 组件的对应关系

// react-dom 路由中包含了三个基础组件：
// 
// Router：
//  1 是路由的容器，需要通过路由管理的内容，都应该被包裹在 Router组件中
//  2 整个应用中，只使用一次 Router 组件即可
//  3 最佳实践：使用 Router 作为项目的根组件，包裹整个应用
// Route：
//  1 路由的出口
//  2 直接在组件中通过 path属性指定：哈希值（#），component属性指定：要展示的组件
//  3 也就是：当 path 被匹配的时候，那么对应的 component组件就会展示在Route所在的位置
//  4 一个路由规则，需要使用一个 Route组件
// Link
//  1 路由的入口
//  2 通过 to属性 来指定哈希值（#），并且这个值与Router中的 path 想对应
// 
// 路由使用注意点：
//  1 当切换菜单（修改浏览器地址栏中的哈希值）的时候，react中的所有Route都会被匹配一次，只要能匹配，那么这个Route中的组件就会展示

import React, { Component } from 'react'

// 导入 antd 组件
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

// 导入自定义样式
import '../css/app.css'

// 导入 路由组件
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// 导入 自定义组件
import Home from './home/Home'
import MovieList from './movie/MovieList'
import About from './about/About'

export default class MovieContainer extends Component {
  render() {
    // defaultSelectedKeys 用来设置默认选中菜单

    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" >logo</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"> <Link to="/">首页</Link> </Menu.Item>
              <Menu.Item key="2"> <Link to="/movielist/in_theaters">电影列表</Link> </Menu.Item>
              <Menu.Item key="3"> <Link to="/about">关于</Link> </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {/* excat 表示完全匹配，也就是说：只有 Link中的to属性的值 与 path的值 完全相同，那么这一项才会匹配 */}
              <Route path="/" exact component={ Home }></Route>
              <Route path="/movielist" component={ MovieList }></Route>
              <Route path="/about" component={ About }></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
             ©2017 Created by xxx
          </Footer>
        </Layout>
      </Router>
    )
  }
}
