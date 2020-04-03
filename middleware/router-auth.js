export default function ({ store, redirect, route }) {
  store.state.user != null && route.name == 'login' ? redirect('/') : ''
  store.state.user == null && isNotLoginRoute(route) ? redirect('/login') : ''
}

function isNotLoginRoute(route) {
  if (route.matched.some(record => record.name != 'login')) {
    return true
  }
}
