import R from 'ramda'

const search = (data, keyword, fieldList) => {
  let returnValue = false
  fieldList.map((item, index) => {
    if (R.toLower(data[item.fieldName]).includes(R.toLower(keyword))) {
      returnValue = true
    }
  })

  return returnValue
}

export const searchByKeyword = (datas, keyword, fieldList) => R.filter(data => search(data, keyword, fieldList), datas)

// INPUT: [{ordering: 2, name: 'b'}, {ordering: 1, name: 'a'}]
// OUTPUT: [{ordering: 1, name: 'a'}, {ordering: 2, name: 'b'}]
export const sortObjectsByKeyAtoZ = (datas, name) => R.sortBy(R.prop(name))(datas)

export const sortObjectsByKeyZtoA = (datas, name) => R.reverse(sortObjectsByKeyAtoZ(datas, name))
