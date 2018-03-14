import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { dispatchLogout } from 'ducks/admin'

const SideBar = (props) => {
  const { signedIn, dispatch } = props
  const logout = dispatchLogout(dispatch)

  if (signedIn) {
    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          <ul className='sidebar-menu' data-widget='tree'>
            <li>
              <Link to='/dashboard'>
                <i className='fa fa-dashboard'></i> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to='/restaurant-map'>
                <i className='fa fa-map'></i>
                <span>Sơ đồ nhà hàng</span>
              </Link>
            </li>
            <li>
              <Link to='/administrator-table'>
                <i className='fa fa-user-circle-o'></i> <span>Quản trị viên</span>
              </Link>
            </li>
            <li>
              <Link to='/employee-table'>
                <i className='fa fa-user-o'></i> <span>Nhân viên</span>
              </Link>
            </li>
            <li className='treeview'>
              <a href=''>
                <i className='fa fa-table'></i>
                <span>Nhà hàng</span>
                <span className='pull-right-container'>
                  <span className='label label-primary pull-right'>9</span>
                </span>
              </a>
              <ul className='treeview-menu'>
                <li className='active'>
                  <Link to='/restaurant-map-table'>
                    <i className='fa fa-circle-o'></i>
                    Khu vực trong nhà hàng
                  </Link>
                </li>
                <li>
                  <Link to='/restaurant-table-type'>
                    <i className='fa fa-circle-o'></i>
                    Loại bàn ăn
                  </Link>
                </li>
                <li>
                  <Link to='/order-calendar'>
                    <i className='fa fa-circle-o'></i>
                    Lịch đặt bàn
                  </Link>
                </li>
                <li>
                  <Link to='/guest-table'>
                    <i className='fa fa-circle-o'></i>
                    Khách hàng
                  </Link>
                </li>
                <li>
                  <Link to='/category-table'>
                    <i className='fa fa-circle-o'></i>
                    Danh mục món ăn
                  </Link>
                </li>
                <li>
                  <Link to='/menu-table'>
                    <i className='fa fa-circle-o'></i>
                    Thực đơn
                  </Link>
                </li>
                <li>
                  <Link to='/event-table'>
                    <i className='fa fa-circle-o'></i>
                    Sự kiện
                  </Link>
                </li>
                <li>
                  <Link to='/voucher-table'>
                    <i className='fa fa-circle-o'></i>
                    Mã khuyến mãi
                  </Link>
                </li>
                <li>
                  <Link to='/ordering-table'>
                    <i className='fa fa-circle-o'></i>
                    Hóa đơn
                  </Link>
                </li>
              </ul>
            </li>
            <li className='treeview'>
              <a href=''>
                <i className='fa fa-database'></i>
                <span>Kho</span>
                <span className='pull-right-container'>
                  <span className='label label-primary pull-right'>3</span>
                </span>
              </a>
              <ul className='treeview-menu'>
                <li>
                  <Link to='/category-material-table'>
                    <i className='fa fa-circle-o'></i>
                    Danh mục Nguyên liệu
                  </Link>
                </li>
                <li>
                  <Link to='/material-table'>
                    <i className='fa fa-circle-o'></i>
                    Nguyên liệu
                  </Link>
                </li>
                <li>
                  <Link to='/ware-house-ordering-table'>
                    <i className='fa fa-circle-o'></i>
                    Hóa dơn
                  </Link>
                </li>
              </ul>
            </li>
            <li className='treeview'>
              <a href=''>
                <i className='fa fa-history'></i>
                <span>Lịch sử</span>
                <span className='pull-right-container'>
                  <span className='label label-primary pull-right'>5</span>
                </span>
              </a>
              <ul className='treeview-menu'>
                <li>
                  <Link to='/event-history-table'>
                    <i className='fa fa-circle-o'></i>
                    Sự kiện
                  </Link>
                </li>
                <li>
                  <Link to='/menu-history-table'>
                    <i className='fa fa-circle-o'></i>
                    Thay đổi thực đơn
                  </Link>
                </li>
                <li>
                  <Link to='/ordering-history-table'>
                    <i className='fa fa-circle-o'></i>
                    Thay đổi hóa đơn
                  </Link>
                </li>
                <li>
                  <Link to='/material-history-table'>
                    <i className='fa fa-circle-o'></i>
                    Thay đổi nguyên liệu
                  </Link>
                </li>
                <li>
                  <Link to='/material-ordering-history-table'>
                    <i className='fa fa-circle-o'></i>
                    Hóa đơn xuất nhập kho
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to='/login' onClick={logout}>
                <i className='fa fa-sign-out'></i> <span>Thoát</span>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    )
  } else {
    return (<div/>)
  }
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(SideBar)
