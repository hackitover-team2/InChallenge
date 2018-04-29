require('goratchet/dist/css/ratchet.css')
const devtools = require('choo-devtools')
const choo = require('choo')
const html = require('choo/html')
const store = require('./store/index.js')
const layout = require('./components/layout')
const start = require('./components/start')
const home = require('./components/home')
const journey = require('./components/journey')
const scores = require('./components/scores')
const leaderboard = require('./components/leaderboard')
const rewards = require('./components/rewards')
const profile = require('./components/profile')

const app = choo()
app.use(devtools())
app.use(store)
app.route('/', layout(home))
app.route('/journey', layout(journey))
app.route('/scores', layout(scores))
app.route('/scores/leaderboard', layout(leaderboard))
app.route('/rewards', layout(rewards))
app.route('/profile', layout(profile))
app.route('/start', start)
app.route('/reset', (state, emit) => {
  window.localStorage.removeItem('Droove.startFinished')
  window.setTimeout(() => {
    emit('replaceState', '/start')
  }, 200)
  return html`<div>wuooo?</div>`
})
// app.route('/login', login)
app.mount('#app-root')
