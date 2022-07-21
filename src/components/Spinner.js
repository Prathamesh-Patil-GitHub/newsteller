// *****************************
// @author - Prathamesh Patil  **
// ****************************


import React, { Component } from 'react'
import spinner from '../img/spinner.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt='Loading...'></img>
      </div>
    )
  }
}
