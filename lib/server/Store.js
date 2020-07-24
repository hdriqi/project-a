import { MongoClient } from 'mongodb'

class Store {
  constructor(mongoURL) {
    this.mongoURL = mongoURL
    this.client = null
  }

  async init() {
    try {
      this.client = await MongoClient.connect(this.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    } catch (err) {
      throw err
    }
  }
}

export default Store