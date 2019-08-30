import express from 'express'
import users from './usersController'
import user from './user'

const router = express.Router()

router.get('/', async (req, res) => {
  let result = {}
  if (req.query.slack) {
    result = await users.findUsersWithSlack()
  } else if (req.query.name) {
    result = await users.findRocketUsersByName(req.query.name)
  }

  return res.json(result)
})

router.put('/:id/score', async (req, res) => {
  const { type, score } = req.body
  const result = await users.transferScore(req.params.id, type, score)
  return res.json(result)
})

router.get('/:uuid/profile', async (req, res) => {
  const result = await users.getUserProfileByUuid(req.params.uuid)
  return res.json(result)
})

router.delete('/uuids', async (req, res) => {
  await user.deleteMany({ uuid: { $in: req.body } })
  res.send(true)
})

export default router
