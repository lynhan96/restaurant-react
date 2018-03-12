import React from 'react'
import { Collapse } from 'react-bootstrap/lib'
import { changeToggleStatus } from 'ducks/ui/homepage'

const membershipData = [
  {
    header: 'Corporate Endorsement',
    data: [
      {
        name: 'PLATINUM',
        price: '30,000',
        sgtPrice: '32,100'
      },
      {
        name: 'GOLD',
        price: '20,000',
        sgtPrice: '21,400'
      },
      {
        name: 'SILVER',
        price: '15,000',
        sgtPrice: '16,050'
      }
    ]
  },
  {
    header: 'Corporate Membership',
    data: [
      {
        name: 'LSPS/VENDORS',
        price: '1,750',
        sgtPrice: '1,872.50'
      },
      {
        name: 'SHIPPERS',
        price: '1,250',
        sgtPrice: '1,337.50'
      },
      {
        name: 'SMES',
        price: '850',
        sgtPrice: '909.50'
      }
    ]
  },
  {
    header: 'Individual Membership',
    data: [
      {
        name: 'SC FELLOWS',
        price: '275',
        sgtPrice: '294.25'
      },
      {
        name: 'SC PROFESSIONALS',
        price: '175',
        sgtPrice: '187.25'
      },
      {
        name: 'STUDENTS',
        price: '25',
        sgtPrice: '26.75'
      }
    ]
  }
]

const renderDataHTML = (item, key) => {
  const { name, price, sgtPrice } = item
  return (
    <div style={styles.toggleBodyItem} key={key}>
      > {name}
      <br/>
      <b style={styles.toggleBodyItemPrice}>${price}/yr</b> (aft GST S${sgtPrice})
    </div>
  )
}

const renderToggleHTML = (dispatch, toggleStatus, index, membership) => {
  const { header, data } = membership
  const status = toggleStatus[index]

  let toggleDataHTML = []
  for (var i = 0; i < data.length; i++) {
    const item = data[i]
    toggleDataHTML.push(renderDataHTML(item, i))
  }

  return (
    <div key={index}>
      <h3 style={styles.toggleHeader} onClick={ () => dispatch(changeToggleStatus(toggleStatus, index)) }>
        {header} <span style={styles.toggleHeaderIcon}>v</span>
      </h3>
      <Collapse in={status}>
        <div>
          {toggleDataHTML}
        </div>
      </Collapse>
    </div>
  )
}

const HomePageRightColumn = (props) => {
  const { toggleStatus, dispatch } = props

  let membershipsHTML = []
  for (var i = 0; i < membershipData.length; i++) {
    const membership = membershipData[i]
    membershipsHTML.push(renderToggleHTML(dispatch, toggleStatus, i, membership))
  }

  return (
    <div className='col-md-4'>
      <h2 style={styles.title}>
        <div style={styles.titleInner}>
          SCA Membership
        </div>
      </h2>
      <p>
        Connect with like-minded supply chain professionals from all over the world, gain access to exclusive industry events, and stay up-to-date with our in-depth news coverage of the latest happenings in the supply chain sector. Enroll now for instant membership and enjoy exclusive mem- bers-only bene ts.
      </p>
      {membershipsHTML}
    </div>
  )
}

const styles = {
  title: {
    height: 37,
    borderBottom: '3px solid #000000'
  },
  titleInner: {
    width: 50,
    height: 37,
    whiteSpace: 'nowrap',
    borderBottom: '3px solid #f5a300'
  },
  toggleHeader: {
    backgroundColor: '#faa61a',
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#ffffff',
    cursor: 'pointer',
    marginBottom: 0
  },
  toggleHeaderIcon: {
    float: 'right'
  },
  toggleBodyItem: {
    backgroundColor: '#ffcb05',
    borderBottom: '1px solid #ffffff',
    padding: 30,
    fontSize: 18
  },
  toggleBodyItemPrice: {
    fontSize: 30
  }
}

export default HomePageRightColumn
