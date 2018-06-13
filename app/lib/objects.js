import R from 'ramda'
import moment from 'moment'

export const sortObjectsByKeyAtoZ = (datas, fieldName, offset, limit) => R.pipe(
  R.values,
  R.sortBy(R.prop(fieldName)),
  R.slice(offset * limit, limit * (offset + 1))
)(datas)

export const sortObjectsByKeyZtoA = (datas, fieldName, offset, limit) => R.reverse(sortObjectsByKeyAtoZ(datas, fieldName, offset, limit))

export const priceToString = price => price ? (price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ') : '0 VNĐ'

export const getOrderingByMonth = (orderings, month, year) => {
  let count = 0
  const startDate = moment(year + '-' + month + '-1').startOf('month').format('YYYY-MM-DD')
  const endDate = moment(year + '-' + month + '-1').endOf('month').format('YYYY-MM-DD')

  orderings.map(order => {
    const createdAt = moment(order.createdAt).format('YYYY-MM-DD')
    if (createdAt <= endDate && createdAt >= startDate) {
      count = count + 1
    }
  })

  return count
}
