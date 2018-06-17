import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { defaultDomainUrl } from 'lib/Constant'

class Main extends Component {
  render() {
    const { signedIn } = this.props
    if (signedIn) {
      return (
        <div>
          <div className='col-md-3'/>
          <div className='col-md-6'>
            <div className='card' style={style.cardBackground}>
              <div className='card-header' style={style.cardHeaderBackground}>
                <h2 className='card-title' style={style.cardTitle}>Bạn đã đăng nhập. Nếu muốn thoát vui lòng bấm nút thoát!</h2>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid'>
          <div className='row animated fadeInUp'>
            <div className='col-lg-4 col-md-3 col-sm-3'></div>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='card card-stats'>
                <div className='card-content'>
                  <h3 className='title' style={{ textAlign: 'center' }}>Sơ đồ vào các trang quản lí</h3>
                  <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>BK Cookery</h2>
                </div>
              </div>
            </div>
          </div>
          <div className='row animated fadeInUp'>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-header card-chart' data-background-color='green' style={{ minHeight: '100px' }}>
                  <div className='ct-chart' id='dailySalesChart'>
                    <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>Trang quản trị viên</h2>
                  </div>
                  <div className='ct-chart' id='dailySalesChart' style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                    <Link to={defaultDomainUrl() + '3000/login'}>Truy cập</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-header card-chart' data-background-color='orange' style={{ minHeight: '100px' }}>
                  <div className='ct-chart' id='dailySalesChart'>
                    <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>Trang nhà bếp</h2>
                  </div>
                  <div className='ct-chart' id='dailySalesChart' style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                    <a href={defaultDomainUrl() + '4000'}>Truy cập</a>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-header card-chart' data-background-color='red' style={{ minHeight: '100px' }}>
                  <div className='ct-chart' id='dailySalesChart'>
                    <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>Trang thu ngân</h2>
                  </div>
                  <div className='ct-chart' id='dailySalesChart' style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                    <a href={defaultDomainUrl() + '5000'}>Truy cập</a>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'></div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-header card-chart' data-background-color='blue' style={{ minHeight: '100px' }}>
                  <div className='ct-chart' id='dailySalesChart'>
                    <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>Trang nhân viên phục vụ</h2>
                  </div>
                  <div className='ct-chart' id='dailySalesChart' style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                    <a href={defaultDomainUrl() + '3030'}>Truy cập</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  cardBackground: {
    background: 'white',
    marginTop: '20vh'
  },
  cardHeaderBackground: {
    background: '#ff9800'
  },
  cardTitle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600'
  }
}

const mapStateToProps = (state) => ({
  signedIn: state.admin.signedIn
})

export default connect(mapStateToProps)(Main)
