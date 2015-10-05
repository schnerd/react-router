import createMemoryHistory from 'history/lib/createMemoryHistory'
import useRoutes from './useRoutes'
import { createRoutes } from './RouteUtils'

function match({
  routes,
  history,
  location,
  parseQueryString,
  stringifyQuery
}, cb) {
  let createHistory = history ? () => history : createMemoryHistory

  let staticHistory = useRoutes(createHistory)({
    routes: createRoutes(routes),
    parseQueryString,
    stringifyQuery
  })

  // Ensure history state is set correctly (history.isActive and others need this)
  // useRoutes.listen must be set, as that's where state is mutated
  staticHistory.listen(() => {})
  staticHistory.transitionTo(location)

  staticHistory.match(location, function (error, nextLocation, nextState) {
    let renderProps = nextState ? { ...nextState, history: staticHistory } : null
    cb(error, nextLocation, renderProps)
  })
}

export default match
