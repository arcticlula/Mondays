export default function ({ store, redirect, route }) {
  store.state.user != null && route.name == 'login' ? redirect('/home') : ''
  store.state.user == null && isHomeRoute(route) ? redirect('/') : ''
}

function isHomeRoute(route) {
  if (route.matched.some(record => record.path == '/home')) {
    return true
  }
}
