const errorHandlers = require('../helpers/libraries/errorHandlers.js')
const showController = require('../controllers/showController.js')

module.exports = (app, ua, googleAnalyticsId) => {
  // route to fetch all free public claims
  app.get('/:name/all', ({ params }, res) => {
    console.log(`>> GET request on /${params.name}/all`)
    // google analytics
    ua(googleAnalyticsId, { https: true }).event('Show Routes', '/name/all', `${params.name}/all`).send()
    // fetch all free public claims
    showController
      .getAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        console.log('/:name/all success.')
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims })
      })
      .catch(error => {
        console.log('/:name/all error:', error)
        errorHandlers.handleRequestError(error, res)
      })
  })
}
