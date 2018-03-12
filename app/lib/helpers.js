import R from 'ramda'

// Given a list of questions and a result,
// returns the score of the result
export const getScore = R.curry((questions, result) => {
  // responseId is unique
  // so we can flatten all the responses with their weightage
  // and calculate the result quickly
  const responsesWithWeightage = R.pipe(
    R.values,
    R.map(R.prop('responses')),
    R.map(R.values),
    R.flatten,
    R.groupBy(R.prop('id')),
    R.map(R.head),
    R.map(R.prop('weightage'))
  )(questions)

  result = R.values(result)
  return R.pipe(
    R.map((responseID) => responsesWithWeightage[responseID]),
    R.sum,
    R.divide(R.__, R.length(result))
  )(result)
})
