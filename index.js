const fetch = require("node-fetch").default

const getNpmRegistry = async () => {
  const registryMap = {
    taobao: "https://registry.npmmirror.com",
    npm: "https://registry.npmjs.org"
  }
  const promiseList = Object.keys(registryMap).map(async (key) =>
    fetch(registryMap[key])
      .catch(() => null)
      .then(() => Promise.resolve(registryMap[key]))
  )
  try {
    const url = await Promise.race(promiseList)
    return url
  } catch (e) {
    return registryMap["npm"]
  }
}

const util = async () => {
  return await getNpmRegistry()
}

module.exports = util
