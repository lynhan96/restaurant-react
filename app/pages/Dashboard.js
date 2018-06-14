import React, { Component } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Pie, Line } from 'react-chartjs-2'
import moment from 'moment'

import { isAdmin } from 'components/wrappers/isAdmin'
import { updateActiveLink } from 'ducks/admin'
import { fetchDashboard } from 'lib/actions/dashboard'
import { getOrderingByMonth } from 'lib/objects'

const checkLength = data => data && data.length ? data.length : 0

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context)

    this.filterByDate = this.filterByDate.bind(this)

    this.state = {
      year: parseInt(moment().format('YYYY'))
    }
  }

  componentDidMount() {
    this.props.dispatch(updateActiveLink('dashboard'))
    this.props.dispatch(fetchDashboard())
  }

  filterByDate(event) {
    this.setState({ year: parseInt(event.target.value) })
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
        data: [checkLength(dashboardInfo[0]), checkLength(dashboardInfo[1]), checkLength(dashboardInfo[2]), checkLength(dashboardInfo[3])],
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
        data: [checkLength(dashboardInfo[4]), checkLength(dashboardInfo[5])],
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
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
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
            getOrderingByMonth(orderings, 1, this.state.year),
            getOrderingByMonth(orderings, 2, this.state.year),
            getOrderingByMonth(orderings, 3, this.state.year),
            getOrderingByMonth(orderings, 4, this.state.year),
            getOrderingByMonth(orderings, 5, this.state.year),
            getOrderingByMonth(orderings, 6, this.state.year),
            getOrderingByMonth(orderings, 7, this.state.year),
            getOrderingByMonth(orderings, 8, this.state.year),
            getOrderingByMonth(orderings, 9, this.state.year),
            getOrderingByMonth(orderings, 10, this.state.year),
            getOrderingByMonth(orderings, 11, this.state.year),
            getOrderingByMonth(orderings, 12, this.state.year)
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
                  <h3 className='title'>{checkLength(dashboardInfo[0]) + checkLength(dashboardInfo[1]) + checkLength(dashboardInfo[2]) + checkLength(dashboardInfo[3])}</h3>
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
                  <h3 className='title'>{checkLength(dashboardInfo[4]) + checkLength(dashboardInfo[5])}</h3>
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
                  <h3 className='title'>{checkLength(dashboardInfo[6])}</h3>
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
                  <div style={{ textAlign: 'center' }}>
                    <select
                      style={{width: '20%', display: 'inline-block'}}
                      className='form-control'
                      onChange={this.filterByDate}
                      value={this.state.year}
                    >
                      {[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map((key, index) => {
                        return (
                          <option value={key} key={index}>{key}</option>
                        )
                      })}
                    </select>
                  </div>
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

const style = {
  'header': {
    fontSize: '20px'
  }
}
