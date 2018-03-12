import React from 'react'
import R from 'ramda'
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const onDelete = (removeFn) => () => {
  if (confirm('Are you sure you want to delete?')) {
    return removeFn()
  }
}

const displaySetRow = (data) => {
  const { id, title, category, published, goToEditSet, goToQuestions, deleteSet } = data

  return (
    <tr key={id}>
      <td>{category}</td>
      <td>{title}</td>
      <td><Glyphicon glyph={published ? 'ok' : 'remove'}/></td>
      <td style={styles.actions}>
        <Button bsStyle='warning' onClick={goToQuestions(id)}>Questions</Button>
        <Button bsStyle='success' onClick={goToEditSet(id)}><Glyphicon glyph='pencil' /></Button>
        <Button bsStyle='danger' onClick={onDelete(() => deleteSet(id))}><Glyphicon glyph='trash' /></Button>
      </td>
    </tr>
  )
}

const SetsList = (props) => {
  const { sets, goToEditSet, goToQuestions, deleteSet } = props
  if (sets == null) return null
  const rows = R.pipe(
    R.values,
    R.map(R.assoc('goToEditSet', goToEditSet)),
    R.map(R.assoc('goToQuestions', goToQuestions)),
    R.map(R.assoc('deleteSet', deleteSet)),
    R.sort((a, b) => a.ordering - b.ordering),
    R.map(displaySetRow)
  )(sets)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <Table bordered={true} condensed={true} hover={true}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Publish</th>
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

const styles = {
  actions: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}
export default SetsList
