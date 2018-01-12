import React from 'react'

import { Spin, Alert, Button, Icon } from 'antd'

// 导入样式
import '../../css/movieDetail.css'

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      info: {},
      isLoading: true
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(`/api/movie/subject/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          info: data,
          isLoading: false
        })
      })
  }

  render() {
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

    const { info } = this.state
    const castList = info.casts.map(item => (
      <li key={item.id}>
        <img src={item.avatars.small} alt="" />
        <p>{item.name}</p>
      </li>
    ))

    return (
      <div>
        {/* 电影详情 -- { this.props.match.params.id } */}
        <Button type="primary" onClick={() => this.props.history.go(-1) }>
          <Icon type="left" />返回电影列表
        </Button>

        <div className="title-img">
          <h1>{ info.title }</h1>
          <img src={info.images.large} alt=""/>
        </div>

        <div className="casts">
          <h4 className="title">主要演员:</h4>
          <ul>
            { castList }
          </ul>
        </div>
        <div className="summary">
          <h4 className="title">剧情介绍:</h4>
          <p>{ info.summary }</p>
        </div>
      </div>
    )
  }
}