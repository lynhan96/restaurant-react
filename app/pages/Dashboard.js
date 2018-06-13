import React, { Component } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Pie, Line } from 'react-chartjs-2'

import { isAdmin } from 'components/wrappers/isAdmin'
import { updateActiveLink } from 'ducks/admin'
import { fetchDashboard } from 'lib/actions/dashboard'
import { getOrderingByMonth } from 'lib/objects'

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(updateActiveLink('dashboard'))
    this.props.dispatch(fetchDashboard())
  }

  render() {
    const { dashboardInfo, orderings } = this.props

    const employeeData = {
      labels: [
        'Quản trị viên',
        'Nhân viên phục vụ',
        'Nhân viên bếp',
        'Nhân viên thu ngân'
      ],
      datasets: [{
        data: [dashboardInfo[0].length, dashboardInfo[1].length, dashboardInfo[2].length, dashboardInfo[3].length],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#5BBD2B'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#5BBD2B'
        ]
      }]
    }

    const foodData = {
      labels: [
        'Còn món',
        'Hết món'
      ],
      datasets: [{
        data: [dashboardInfo[4].length, dashboardInfo[5].length],
        backgroundColor: [
          '#36A2EB',
          '#FF6384'
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FF6384'
        ]
      }]
    }

    const orderingData = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: 'Số lượng hóa đơn',
          fill: true,
          lineTension: 1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            getOrderingByMonth(orderings, 1, 2018),
            getOrderingByMonth(orderings, 2, 2018),
            getOrderingByMonth(orderings, 3, 2018),
            getOrderingByMonth(orderings, 4, 2018),
            getOrderingByMonth(orderings, 5, 2018),
            getOrderingByMonth(orderings, 6, 2018),
            getOrderingByMonth(orderings, 7, 2018),
            getOrderingByMonth(orderings, 8, 2018),
            getOrderingByMonth(orderings, 9, 2018),
            getOrderingByMonth(orderings, 10, 2018),
            getOrderingByMonth(orderings, 11, 2018),
            getOrderingByMonth(orderings, 12, 2018)
          ]
        }
      ]
    }

    return (
      <div className='content'>
        <div className='container-fluid'>
          <div className='row animated fadeInUp'>
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='card card-stats'>
                <div className='card-header' data-background-color='orange'>
                  <i className='material-icons'>group</i>
                </div>
                <div className='card-content'>
                  <p className='category' style={style.header}>Nhân viên</p>
                  <h3 className='title'>{dashboardInfo[0].length + dashboardInfo[1].length + dashboardInfo[2].length + dashboardInfo[3].length}</h3>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='card card-stats'>
                <div className='card-header' data-background-color='green'>
                  <i className='material-icons'>view_module</i>
                </div>
                <div className='card-content'>
                  <p className='category' style={style.header}>Số món ăn</p>
                  <h3 className='title'>{dashboardInfo[4].length + dashboardInfo[5].length}</h3>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='card card-stats'>
                <div className='card-header' data-background-color='red'>
                  <i className='material-icons'>assignment_ind</i>
                </div>
                <div className='card-content'>
                  <p className='category' style={style.header}>Khách hàng</p>
                  <h3 className='title'>{dashboardInfo[6].length}</h3>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='card card-stats'>
                <div className='card-header' data-background-color='blue'>
                  <i className='material-icons'>shopping_cart</i>
                </div>
                <div className='card-content'>
                  <p className='category' style={style.header}>Hóa đơn</p>
                  <h3 className='title'>{R.values(orderings).length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className='row animated fadeInUp'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-content'>
                  <h2 className='title' style={{ textAlign: 'center' }}>Nhân viên</h2>
                  <Pie data={employeeData}/>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-content'>
                  <h2 className='title' style={{ textAlign: 'center' }}>Trạng thái món ăn</h2>
                  <Pie data={foodData}/>
                </div>
              </div>
            </div>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-content'>
                  <h2 className='title' style={{ textAlign: 'center' }}>Biểu đồ hòa đơn theo từng tháng</h2>
                  <Line data={orderingData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dashboardInfo: state.dashboard.items,
  orderings: state.ordering.items
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin,
)(Dashboard)

const style ={
  'header': {
    fontSize: '20px'
  }
}