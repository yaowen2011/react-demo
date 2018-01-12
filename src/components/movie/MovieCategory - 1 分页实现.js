import React, { Component } from 'react'

// 导入 antd 组件
import { Card, Spin, Alert, Rate, Pagination } from 'antd';

// 导入自定义样式
import '../../css/moviecategory.css'

export default class MovieCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 数据
      data: {},
      // 数据加载中，如果数据没有加载完成，isLoading值为：true；否则，为false
      isLoading: true
    }

    this.goPage = this.goPage.bind(this)
  }

  // 点击分页后发生了什么?
  // 1 点击分页组件, 触发分页组件的onChange事件
  // 2 事件中通过 this.props.history.push() 方法, 修改了浏览器地址栏中的哈希值
  // 3 当哈希值发生改变, 当前组件的 componentWillReceiveProps() 钩子函数就会执行
  // 4 在这个钩子函数中, 就可以通过 nextProps.match.params 来获取到路由参数了

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.match.params);
    // const { page } = nextProps.match.params
    const page = nextProps.match.params.page || 1

    // 先将 isLoading 设置为 true，目的是为了 加载中的效果
    this.setState({
      isLoading: true
    })

    // 发送ajax请求，获取数据
    // start 表示起始索引号
    // count 表示每页的条数

    // 第一页: 0 1 2 3 4
    // 第二页: 5 6 7 8 9
    // 第三页: 10 11 12 13 14
    // 第四页: 15 16 17 18 19

    // 第 n 页的起始索引号 = ( page - 1 ) * count
    const start = (page - 1) * 5

    fetch(`/api/movie/${nextProps.match.params.movieType}?start=${start}&count=5`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data);
        this.setState({
          data,
          isLoading: false
        })
      })
  }

  render() {
    // console.log(this.state);
    if (this.state.isLoading) {
      return (
        <Spin tip="Loading...">
          <Alert
            message="友情提示："
            description="数据正在疯狂加载中，请稍候..."
            type="info"
          />
        </Spin>
      )
    }

    const { subjects, total } = this.state.data

    const movieList = subjects.map(item => {
      return (
        <Card
          key={item.id}
          hoverable
          cover={<img alt="example" src={item.images.small} />}
        >
          <h3>{ item.title }</h3>
          <p>电影类型：{ item.genres.join('、') }</p>
          <p>上映年份：{ item.year }</p>
          <Rate disabled defaultValue={ item.rating.average / 2 } />
        </Card>
      )
    })

    return (
      <div>
        {/* 电影列表 */}
        <div className="movie-list">{ movieList }</div>
        {/* 分页 */}
        <Pagination defaultCurrent={1} current={this.props.match.params.page - 0 || 1} defaultPageSize={5} total={total} onChange={ this.goPage } />
      </div>
    )
  }

  // 页面跳转
  goPage(page, pageSize) {
    // console.log('当前页：', page);
    this.props.history.push(`/movielist/${this.props.match.params.movieType}/${page}`)
  }
}