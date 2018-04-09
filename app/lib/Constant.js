import Store from 'lib/Store'

export const getAdminData = _ => Store.getState().admin.data
export const getOrderingState = _ => Store.getState().ordering

export const apiDomainUrl = _ => 'http://localhost:8000/v1/'
