import { isArray } from 'core-js/fn/array'

export default async (req, res, next) => {
  const apiKeys = req.ctx.keys || []
  if (!Array.isArray(apiKeys) || apiKeys.length === 0) {
    return next()
  }
  const userKey = req.headers['x-api-key']
  if (!userKey) {
    return res.status(401).json({
      success: 0,
      message: 'unauthorized'
    })
  }
  const key = apiKeys.find(key => key.key === userKey)
  if (!key) {
    return res.status(401).json({
      success: 0,
      message: 'unauthorized'
    })
  }
  for (const access of key.access) {
    const haveAccess = [false, false]
    const [scope, action] = access.split('_')
    if (scope === '*' || scope.toUpperCase() === req.params.collection.toUpperCase()) {
      haveAccess[0] = true
    }
    if (action === '*' || action.toUpperCase() === req.method.toUpperCase()) {
      haveAccess[1] = true
    }
    if (haveAccess.every(k => k === true)) {
      return next()
    }
  }
  return res.status(401).json({
    success: 0,
    message: 'unauthorized'
  })
}