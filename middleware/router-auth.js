export default function ({ store, redirect, route }) {
  store.state.user != null && route.name == 'login' ? redirect('/home') : ''
  store.state.user == null && isNotLoginRoute(route) ? redirect('/') : ''
}

function isNotLoginRoute(route) {
  if (route.matched.some(record => record.name != 'index')) {
    return true
  }
}
