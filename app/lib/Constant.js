import Store from 'lib/Store'

export const getAdminData = _ => Store.getState().admin.data

export const apiDomainUrl = _ => 'http://localhost:8000/v1/'