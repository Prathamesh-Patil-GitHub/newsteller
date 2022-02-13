import React, { Component } from 'react'
import spinner from '../spinner.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt='Loading...'></img>
      </div>
    )
  }
}
