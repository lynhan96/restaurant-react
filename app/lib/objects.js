import R from 'ramda'

export const removeKeyHasEmptyValue = R.filter(R.complement(R.isNil))

// INPUT: [{ordering: 2, name: 'b'}, {ordering: 1, name: 'a'}]
// OUTPUT: [{ordering: 1, name: 'a'}, {ordering: 2, name: 'b'}]
export const sortObjectsByKeyAtoZ = (datas, name) => R.sortBy(R.prop(name))(datas)

export const sortObjectsByKeyZtoA = (datas, name) => R.reverse(sortObjectsByKeyAtoZ(datas, name))
