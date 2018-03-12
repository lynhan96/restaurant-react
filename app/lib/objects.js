import R from 'ramda'

export const removeKeyHasEmptyValue = R.filter(R.complement(R.isNil))

// INPUT: [{ordering: 2, name: 'b'}, {ordering: 1, name: 'a'}]
// OUTPUT: [{ordering: 1, name: 'a'}, {ordering: 2, name: 'b'}]
export const sortObjectsByKey = (name) => R.sortBy(R.prop(name))
