import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Navigator from 'lib/Navigator'

import AddZoneForm from 'components/form/AddZoneForm'
import { submitAddZone } from 'lib/actions/zone'

class CreateZone extends Component {
  render() {
    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header' data-background-color='purple'>
                    <h4 className='title'>Tạo Khu Vực Bàn Ăn Trong Nhà Hàng</h4>
                  </div>
                  <div className='card-content'>
                    <div>
                      <Link to='map-tables' className='btn btn-success btn-round' style={style.buttonMargin}>
                        Trở lại
                      </Link>
                    </div>
                    <DecoratedCreateForm/>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Decorate LoginForm so that form is pure
const DecoratedCreateForm = reduxForm({
  form: 'login',
  onSubmit: submitAddZone,
  onSubmitSuccess: () => Navigator.push('map-tables')
})(AddZoneForm)

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

export default connect(mapStateToProps)(CreateZone)
