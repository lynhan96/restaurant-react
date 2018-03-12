import React from 'react'
import Spinner from 'react-spinkit'
import { connect } from 'react-redux'

export const hasListData = (Component) => {
  class HasListDataClass extends React.Component {
    render() {
      const { data } = this.props
      if (data) {
        return <Component { ...this.props } />
      } else {
        return <Spinner spinnerName='double-bounce' />
      }
    }
  }

  const mapStateToProps = (state) => state.list

  return connect(mapStateToProps)(HasListDataClass)
}
