import React from 'react'

// 导入 antd 组件
import { Layout, Menu } from 'antd'
const { Content, Sider } = Layout

// 导入 路由组件
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

// 导入自定义组件
import MovieCategory from './MovieCategory'
import MovieDetail from './MovieDetail'

export default class MovieList extends React.Component {
  render() {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {/* 注意：子菜单的 to属性的值必须以：/movielist开头 */}
            <Menu.Item key="1"><Link to="/movielist/in_theaters">正在热映</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/movielist/coming_soon">即将上映</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/movielist/top250">top250</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          {/* 通过路由参数，来匹配不同的电影类型 */}
          {/* :page? 表示当前参数为可选参数 */}
            {/* Switch 组件: 实现两个Route中只渲染第一匹配的组件, 后面的组件就不再进行匹配了 */}
            <Switch>
              <Route path="/movielist/detail/:id" component={MovieDetail}></Route>
              <Route path="/movielist/:movieType/:page?" component={MovieCategory}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}