import React from 'react'
import R from 'ramda'
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const displayRow = (page) => {
  const { id, title, goToEdit } = page

  return (
    <tr key={id}>
      <td>{title}</td>
      <td>
        <Button bsStyle='success' onClick={goToEdit(id)}><Glyphicon glyph='pencil' /></Button>
      </td>
    </tr>
  )
}

const PagesList = (props) => {
  const { pages, goToEdit } = props
  if (pages == null) return null

  const rows = R.pipe(
    R.mapObjIndexed((page, key) => ({...page, id: key})),
    R.values,
    R.map(R.assoc('goToEdit', goToEdit)),
    R.map(displayRow)
  )(pages)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <Table bordered={true} condensed={true} hover={true}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default PagesList
