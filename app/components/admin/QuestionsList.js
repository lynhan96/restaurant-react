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

const displayRow = (index, data) => {
  const { id, title, goToEdit, deleteQuestion } = data

  return (
    <tr key={id}>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td style={styles.actions}>
        <Button bsStyle='success' onClick={goToEdit(id)}><Glyphicon glyph='pencil' /></Button>
        <Button bsStyle='danger' onClick={onDelete(() => deleteQuestion(id))}><Glyphicon glyph='trash' /></Button>
      </td>
    </tr>
  )
}

const QuestionsList = (props) => {
  const { questions, goToEdit, deleteQuestion } = props
  if (questions == null) return null
  const rows = R.pipe(
    R.values,
    R.map(R.assoc('goToEdit', goToEdit)),
    R.map(R.assoc('deleteQuestion', deleteQuestion)),
    R.sort((a, b) => a.ordering - b.ordering)
  )(questions)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <Table bordered={true} condensed={true} hover={true}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => displayRow(index, row))}
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
export default QuestionsList
