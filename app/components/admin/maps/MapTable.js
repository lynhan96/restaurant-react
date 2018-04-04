import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import R from 'ramda'
import 'styles/website.less'
import {Tabs, Tab} from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

import { isAdmin } from 'components/wrappers/isAdmin'
import { updateActiveLink } from 'ducks/admin'
import ContentLoading from 'components/ContentLoading'
import MapElement from 'components/admin/maps/MapElement'
import AddZoneModal from 'components/admin/modals/AddZoneModal'

const contentBackground = {
  backgroundImage: 'url("images/background.jpg")',
  padding: '5px'
}

class MapTable extends Component {
  constructor (props) {
    super(props)

    this.addZoneOpen = this.addZoneOpen.bind(this)
    this.addZoneClose = this.addZoneClose.bind(this)
    this.addTableOpen = this.addTableOpen.bind(this)
    this.addTableClose = this.addTableClose.bind(this)

    this.state = {
      openAddZone: false,
      openAddTable: false
    }
  }

  componentDidMount() {
    this.props.dispatch(updateActiveLink('map-tables'))
  }

  addZoneOpen() {
    this.setState({openAddZone: true})
  }

  addZoneClose() {
    this.setState({openAddZone: false})
  }

  addTableOpen() {
    this.setState({openAddTable: true})
  }

  addTableClose() {
    this.setState({openAddTable: false})
  }

  render() {
    const { error } = this.props

    const addZoneActions = [
      <RaisedButton
        label='Cancel'
        primary={true}
        onClick={this.addZoneClose}
      />,
      <RaisedButton
        label='Submit'
        primary={true}
        disabled={true}
        onClick={this.addZoneClose}
      />
    ]

    const addTableActions = [
      <RaisedButton
        label='Cancel'
        primary={true}
        onClick={this.addTableClose}
      />,
      <RaisedButton
        label='Submit'
        primary={true}
        disabled={true}
        onClick={this.addTableClose}
      />
    ]

    if (error) {
      return (
        <ContentLoading
          error={error}
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='card' style={{ padding: '10px' }}>
              <div style={{ padding: '20px' }}>
                <RaisedButton
                  label='Thêm khu vực'
                  primary={true}
                  style={{ margin: '10px' }}
                  onClick={this.addZoneOpen}
                />
                <RaisedButton label='Tạo bàn ăn' secondary={true} onClick={this.addTableOpen}/>
                <Dialog
                  title='Tạo bàn ăn'
                  actions={addTableActions}
                  modal={true}
                  open={this.state.openAddTable}
                >
                  <AddZoneModal/>
                </Dialog>
                <Dialog
                  title='Thêm khu vực'
                  actions={addZoneActions}
                  modal={true}
                  open={this.state.openAddZone}
                >
                  <AddZoneModal/>
                </Dialog>
              </div>
            </div>
          </div>
          <div className='row'>
            <Tabs>
              <Tab label='Tầng 1' >
                <div className='card'>
                  <section style={contentBackground}>
                    <div className='container-fluid table-container'>
                      <MapElement/>
                    </div>
                  </section>
                </div>
              </Tab>
              <Tab label='Tầng 2' >
                <div className='card'>
                  <section style={contentBackground}>
                    <div className='container-fluid table-container'>
                      <MapElement/>
                      <MapElement/>
                    </div>
                  </section>
                </div>
              </Tab>
              <Tab label='Tầng 3'>
                <div className='card'>
                  <section style={contentBackground}>
                    <div className='container-fluid table-container'>
                      <MapElement/>
                      <MapElement/>
                      <MapElement/>
                    </div>
                  </section>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(MapTable)
