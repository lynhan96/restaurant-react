import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import TableEditItem from 'components/admin/table/TableEditItem'
import { editAboutUs, editFieldInfo, selectFieldData, fetchAboutUs } from 'lib/actions/aboutUs'
import { updateActiveLink } from 'ducks/admin'

class AboutUs extends ReactQueryParams {
  componentDidMount() {
    this.props.dispatch(fetchAboutUs())
    this.props.dispatch(updateActiveLink('about-us'))
  }

  render() {
    const { aboutUs, dispatch } = this.props

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <TableEditItem
            editFieldInfo={editFieldInfo()}
            selectFieldData={selectFieldData()}
            editHeader='Thông tin Nhà hàng'
            arrLink={{ list: '' }}
            itemIndex={0}
            subHeader=''
            submitEdit={editAboutUs}
            items={aboutUs}
            dispatch={dispatch}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  aboutUs: state.aboutUs.items,
  loading: state.aboutUs.loading,
  error: state.aboutUs.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(AboutUs)
