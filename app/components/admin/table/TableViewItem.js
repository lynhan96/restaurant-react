import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

import { isAdmin } from 'components/wrappers/isAdmin'

class TableViewItem extends Component {
  render() {
    const { viewHeader, data, subHeader } = this.props
    console.log(data)
    return (
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-header' data-background-color='purple'>
                    <h4 className='title'>{viewHeader}</h4>
                    <p className='category'>{subHeader}</p>
                </div>
                <div className='card-content'>
                  <form>
                    <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group label-floating'>
                              <label className='control-label'>Fist Name</label>
                              <div type='text' className='form-control'/>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group label-floating'>
                              <label className='control-label'>Last Name</label>
                              <div type='text' className='form-control'/>
                          </div>
                        </div>
                    </div>
                    <div className='clearfix'></div>
                  </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableViewItem)
