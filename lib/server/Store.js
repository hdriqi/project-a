import { MongoClient, ObjectID } from 'mongodb'
import AWS from 'aws-sdk'
import qpm from 'query-params-mongo'

class Store {
  constructor(project) {
    this.projectName = project.name
    this.mongoURL = project.mongoURL
    this.convertId = ObjectID
    this.client = null
    this.processQuery = qpm()

    this.bucketName = project.bucketName
    this.s3 = new AWS.S3({
      accessKeyId: project.iamUserKey,
      secretAccessKey: project.iamUserSecret,
    })
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

  async get(db, collection, query) {
    const mongoQuery = this.processQuery(query)
    const result = await this.client.db(db).collection(collection)
      .find(mongoQuery.filter)
      .sort(mongoQuery.sort)
      .skip(mongoQuery.skip)
      .limit(mongoQuery.limit)

    const data = await result.toArray()
    return data
  }

  async upload(file) {
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const newName = `${id}_${file.originalname}`

    const params = {
      Bucket: this.bucketName,
      Key: newName,
      Body: file.buffer,
      ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
      const self = this
      this.s3.putObject(params, async (perr, pres) => {
        if (perr) {
          console.log("Error uploading data: ", perr)
          reject(perr)
        } else {
          await self.client.db(self.projectName).collection('_media').insertOne({
            fileName: file.originalname,
            uniqueName: newName,
            fileSize: file.size,
            createdAt: new Date().toISOString()
          })
          resolve(`https://${self.bucketName}.s3-ap-southeast-1.amazonaws.com/${newName}`)
        }
      })
    })
  }
}

export default Store