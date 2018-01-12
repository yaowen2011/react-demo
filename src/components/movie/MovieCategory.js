import React, { Component } from 'react'

// 导入 antd 组件
import { Card, Spin, Alert, Rate, Pagination } from 'antd';

// 导入自定义样式
import '../../css/moviecategory.css'

export default class MovieCategory extends Component {
  constructor(props) {
    super(props)

    // 如果应用中需要在多个方法中使用同一个数据, 可以将这个数据存储到this中
    // this.isFetch = true

    // state 中只存放与页面逻辑相关的内容
    this.state = {
      // 数据
      data: {},
      // 数据加载中，如果数据没有加载完成，isLoading值为：true；否则，为false
      isLoading: true
    }

    this.goPage = this.goPage.bind(this)
    // this.goDetail = this.goDetail.bind(this)
  }

  // 点击分页后发生了什么?
  // 1 点击分页组件, 触发分页组件的onChange事件
  // 2 事件中通过 this.props.history.push() 方法, 修改了浏览器地址栏中的哈希值
  // 3 当哈希值发生改变, 当前组件的 componentWillReceiveProps() 钩子函数就会执行
  // 4 在这个钩子函数中, 就可以通过 nextProps.match.params 来获取到路由参数了
  componentDidMount() {

    console.log(1);
    // 当前页:
    this.page = this.props.match.params.page - 0 || 1
    // 当前电影类型:
    this.movieType = this.props.match.params.movieType

    // 发送请求, 获取数据
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    // 当前页:
    this.page = nextProps.match.params.page - 0 || 1
    // 当前电影类型:
    this.movieType = nextProps.match.params.movieType

    // 先将 isLoading 设置为 true，目的是为了 加载中的效果
    this.setState({
      isLoading: true
    })

    // 发送请求, 获取数据
    this.fetchData()
  }

  fetchData() {
    const start = (this.page - 1) * 5

    fetch(`/api/movie/${this.movieType}?start=${start}&count=5`)
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
          onClick={() => { this.goDetail(item.id) } }
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
        <Pagination defaultCurrent={1} current={this.page} defaultPageSize={5} total={total} onChange={ this.goPage } />
      </div>
    )
  }

  // 页面跳转
  goPage(page, pageSize) {
    // console.log('当前页：', page);
    this.props.history.push(`/movielist/${this.movieType}/${page}`)
  }

  // 跳转到详情页:
  goDetail(id) {
    this.props.history.push(`/movielist/detail/${id}`)
  }
}