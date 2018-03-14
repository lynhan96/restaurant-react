import React from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import { isAdmin } from 'components/wrappers/isAdmin'

const Dashboard = (props) => {
  return (
    <div className='content-wrapper'>
      <section className='content'>
        <div className='row'>
         <div className='col-lg-3 col-xs-6'>
            <div className='small-box bg-yellow'>
              <div className='inner'>
                <h3>15</h3>
                <p>Nhân viên</p>
              </div>
              <div className='icon'>
                <i className='ion ion-person-stalker'></i>
              </div>
              <Link to='/employee-table' className='small-box-footer'>Chi tiết <i className='fa fa-ăở-circle-right'></i></Link>
            </div>
          </div>
          <div className='col-lg-3 col-xs-6'>
            <div className='small-box bg-red'>
              <div className='inner'>
                <h3>65</h3>
                <p>Khách hàng</p>
              </div>
              <div className='icon'>
                <i className='ion ion-android-contacts'></i>
              </div>
              <Link to='/guest-table' className='small-box-footer'>Chi tiết <i className='fa fa-ăở-circle-right'></i></Link>
            </div>
          </div>
          <div className='col-lg-3 col-xs-6'>
            <div className='small-box bg-aqua'>
              <div className='inner'>
                <h3>150</h3>
                <p>Tổng hóa đơn</p>
              </div>
              <div className='icon'>
                <i className='ion ion-ios-paper'></i>
              </div>
              <Link to='/ordering-table' className='small-box-footer'>Chi tiết <i className='fa fa-arrow-circle-right'></i></Link>
            </div>
          </div>
          <div className='col-lg-3 col-xs-6'>
            <div className='small-box bg-green'>
              <div className='inner'>
                <h3>10</h3>
                <p>Sự kiện đang diễn ra</p>
              </div>
              <div className='icon'>
                <i className='ion ion-coffee'></i>
              </div>
              <Link to='/event-table' className='small-box-footer'>Chi tiết <i className='fa fa-arrow-circle-right'></i></Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Hóa đơn</h3>
              </div>
              <div className='box-body chart-responsive'>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Doanh Thu</h3>
              </div>
              <div className='box-body chart-responsive' style={{ 'height': '385' }}>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Nhân viên</h3>
              </div>
              <div className='box-body chart-responsive'>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='box box-green'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Xuất nhập kho</h3>
              </div>
              <div className='box-body chart-responsive'>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default R.pipe(
  isAdmin
)(Dashboard)
