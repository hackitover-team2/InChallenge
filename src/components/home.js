const html = require('choo/html')

module.exports = function renderHome (state, emit) {
  return html`
  <div class="content-padded">
      <h1>Home</h1>
  </div>
  `
}
