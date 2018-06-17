import React, {Component} from 'react'
import { connect } from 'react-redux'

import Header from 'components/layout/Header'
import SideBar from 'components/layout/SideBar'
import { ToastContainer } from 'react-toastify'
import Transition from 'react-transition-group/Transition'
import '../public/lib/cms/css/animate.css'
import '../public/lib/cms/css/custom.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import WebBrowserNotification from 'components/WebBrowserNotification'
import { fetchNotifications } from 'lib/actions/notification'
import { fetchAboutUs } from 'lib/actions/aboutUs'
import { fetchOrderings } from 'lib/actions/ordering'
import { getAdminData } from 'lib/Constant'

const ZoomInAndOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={800}
    onEnter={ node => node.classList.add('zoomIn', 'animate')}
    onExit={node => {
      node.classList.remove('zoomIn', 'animate')
      node.classList.add('zoomOut', 'animate')
    }}
  >
    {children}
  </Transition>
)

class App extends Component {
  componentWillUpdate() {
    this.props.dispatch(fetchNotifications())
    this.props.dispatch(fetchAboutUs())
    this.props.dispatch(fetchOrderings())
  }

  render() {
    const { children, signedIn } = this.props

    if (!signedIn) {
      return (
         <MuiThemeProvider>
          <div className='wrapper'>
            {children}
            <ToastContainer transition={ZoomInAndOut}/>
          </div>
        </MuiThemeProvider>
      )
    }

    return (
       <MuiThemeProvider>
        <div className='wrapper'>
          <SideBar/>
          <div className='main-panel'>
            <Header/>
            {children}
            <ToastContainer transition={ZoomInAndOut}/>
            {signedIn ? <WebBrowserNotification /> : <div/>}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(App)
