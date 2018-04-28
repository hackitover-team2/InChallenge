module.exports = function setupActions (state, emitter) {
  emitter.on('DOMContentLoaded', () => {
    const lsUserStr = window.localStorage.getItem('InChallenge.user')
    if (lsUserStr) {
      console.log('User found in LocalStorage')
      try {
        state.user = JSON.parse(lsUserStr)
        if (state.route === 'login') { // redirect away from login if user saved
          emitter.emit('replaceState', '/')
          emitter.emit('render')
        }
      } catch (e) {
        state.user = null
      }
    } else { // redirect to login if no user saved
      state.user = null
      emitter.emit('replaceState', '/login')
      emitter.emit('render')
    }
  })

  emitter.on('login', (email, pass) => {
    state.user = {
      email,
      pass
    }
    window.localStorage.setItem('InChallenge.user', JSON.stringify({email, pass}))
    emitter.emit('replaceState', '/')
    emitter.emit('render')
  })

  emitter.on('logout', () => {
    state.user = null
    window.localStorage.removeItem('InChallenge.user')
    emitter.emit('replaceState', '/login')
    emitter.emit('render')
  })
}
