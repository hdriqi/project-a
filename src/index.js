import dotenv from 'dotenv'
import CMS from '../lib'
import aws from 'aws-sdk'

dotenv.config()
const cms = new CMS()

cms.registerComponents([
  {
    name: 'schedule',
    component: 'InputSchedule',
  }
])

cms.registerDataTypes([
  {
    dataType: {
      schedule: {
        fields: [
          {
            name: 'day',
            type: 'enum'
          },
          {
            name: 'hour',
            type: 'enum'
          }
        ]
      }
    }
  },
])

cms.setupEmail({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    region: 'ap-southeast-1'
  })
})

cms.run({
  name: process.env.PROJECT_NAME,
  mongoURL: process.env.MONGO_URL,
  bucketName: process.env.BUCKET_NAME,
  iamUserKey: process.env.IAM_USER_KEY,
  iamUserSecret: process.env.IAM_USER_SECRET
})