// 豆瓣电影案例

import React from 'react'
import ReactDOM from 'react-dom'

import MovieContainer from './components/App'

import './data/index.js'

ReactDOM.render(
  <MovieContainer></MovieContainer>,
  document.getElementById('app')
)






/* import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class MovieList extends Component {
  render() {
    return (
      <div>豆瓣电影</div>
    )
  }
}

ReactDOM.render(
  <MovieList></MovieList>,
  document.getElementById('app')
) */