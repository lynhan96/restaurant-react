import React from 'react'
import Button from 'react-bootstrap/lib/Button'

import { getScore } from 'lib/helpers'

const Result = (props) => {
  const { set, result, goToThankYou } = props
  if (set == null || result == null) return null
  const { questions, title } = set
  const hasPassed = getScore(questions, result) >= 75

  return (
    <div>
      <h2>Result of {title}</h2>
      {!hasPassed &&
        <div className='row'>
          <div className='col-md-12'>
            <p>You did not manage to secure the minimum requirements to become a Supply Chain Fellows. You can opt to re-try your a self assessment on the same validation set or choose another one. You could also opt to participate in professional development programs hosted by Supply Chain Asia to further improve on your specific knowledge and skills to meet the validation requirements.</p>
            <p>We look forward to your continuous support and participation.</p>

            <p>Regards,</p>
            <p>Paul Lim<br />
              Founder/President<br />
              Supply Chain Asia</p>

            <a className='btn btn-success' target='_blank' href={COMMUNITY_LINK}>I would like to join as a community member.</a>
          </div>
        </div>
      }

      {hasPassed &&
        <div className='row'>
          <div className='col-md-12'>
            <p>Congratulations!</p>
            <p>You have qualified to join our Supply Chain Fellowship Program. However, your details will need to be verified and profile confirmed by an industry professional. If you are keen to join this program and be recognised as SC Fellows or Senior Fellows, click on the green button below and your details will be forwarded to our team and we will follow up with you on the next steps to take.</p>
            <p>However, we only understand that you may not want to participate in the program. You can opt to receive regular updates from us by clicking on the red button below.</p>
            <p>We appreciate your time spent to validate your knowledge and skills and look forward to your participation Supply Chain Asia programs.</p>
            <p>Regards,</p>
            <p>Paul Lim<br />
              Founder/President<br />
              Supply Chain Asia</p>
            <p><Button bsStyle='success' onClick={goToThankYou}>Yes, please contact me to join as a Supply Chain Fellow!</Button></p>
            <p><a className='btn btn-warning' target='_blank' href={COMMUNITY_LINK}>No, I am not interested but I would like to receive regular updates from Supply Chain Fellowship Program.</a></p>
            <p><Button bsStyle='danger'>No, I am not interested in anything.</Button></p>
          </div>
        </div>
      }
    </div>
  )
}

export default Result
