import dotenv from 'dotenv'
import CMS from '../lib'
import nodemailer from 'nodemailer'
import aws from 'aws-sdk'

const SENT_EMAIL = false

dotenv.config()
const cms = new CMS()

const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    region: 'ap-southeast-1'
  })
})

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
      if (SENT_EMAIL) {
        transporter.sendMail({
          from: 'notification@evius.id',
          to: 'riqi.asdf@gmail.com',
          subject: 'New Data',
          text: 'New Data on Post collection'
        }, (err, info) => {
          if (err) {
            console.log(err)
            return
          }
          console.log(info.envelope);
          console.log(info.messageId);
        })
      }
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