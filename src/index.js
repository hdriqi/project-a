import dotenv from 'dotenv'
import CMS from '../lib'

dotenv.config()
const cms = new CMS()

cms.registerComponents([
  {
    name: 'schedule',
    component: 'InputSchedule'
  }
])

cms.registerSchemas([
  {
    name: 'Post',
    type: 'content',
    fields: [
      {
        name: 'title',
        type: 'text',
        validation: (input) => {
          return [input.length > 0, 'Title must be at least 1 characters']
        },
      },
      {
        name: 'title',
        type: 'schedule',
        validation: (input) => {
          return [input.length > 0, 'Title must be at least 1 characters']
        },
      },
    ],
    afterSave: (data) => {
      console.log(`Sent email notification new post ${data.id} to subscribers`)
    }
  }
])

cms.run({
  name: process.env.PROJECT_NAME,
  mongoURL: process.env.MONGO_URL,
  bucketName: process.env.BUCKET_NAME,
  iamUserKey: process.env.IAM_USER_KEY,
  iamUserSecret: process.env.IAM_USER_SECRET
})