import React from 'react'
import { connect } from 'react-redux'

import HomePageBanner from 'components/layout/homepage/HomePageBanner'
import HomePageLeftColumn from 'components/layout/homepage/HomePageLeftColumn'
import HomePageRightColumn from 'components/layout/homepage/HomePageRightColumn'
import HomePageBottomIcons from 'components/layout/homepage/HomePageBottomIcons'

const HomePage = (props) => {
  const { toggleStatus, dispatch } = props

  return (
    <div className='container'>
      <HomePageBanner />
      <div style={styles.content} className='row'>
        <HomePageLeftColumn />
        <HomePageRightColumn toggleStatus={toggleStatus} dispatch={dispatch} />
      </div>
      <HomePageBottomIcons />
    </div>
  )
}

const mapStateToProps = (state) => state.homepage

export default connect(mapStateToProps)(HomePage)

const styles = {
  content: {
    paddingTop: 20
  }
}
