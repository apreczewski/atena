import config from 'config-yml'
import model from './achievement'

const findAllByUser = async userId => {
  return await model.find({ user: userId }).exec()
}

const findOne = async query => {
  return await model.findOne(query).exec()
}

const create = async achievement => {
  const newAchievement = new model(achievement)
  return await newAchievement.save()
}

// TODO: export to settings
const findMain = (category, action, type) => {
  let achievements = null
  if (
    config.hasOwnProperty(`achievements-${category}`) &&
    config[`achievements-${category}`].hasOwnProperty(action) &&
    config[`achievements-${category}`][action].hasOwnProperty(type)
  ) {
    achievements = config[`achievements-${category}`][action][type]
  }

  return achievements
}

export default {
  findAllByUser,
  findMain,
  findOne,
  create
}
