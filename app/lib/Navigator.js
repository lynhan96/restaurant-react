import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'

const Navigator = useRouterHistory(createHistory)({
  basename: '/scfp'
})

export default Navigator
