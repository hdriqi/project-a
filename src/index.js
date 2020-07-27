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

cms.registerSchemas([
  {
    name: 'Student',
    type: 'Form',
    fields: [
      {
        name: 'fullname',
        type: 'text'
      },
      {
        name: 'additionalStudentFullname',
        type: 'array_text'
      },
      {
        name: 'class',
        type: 'enum',
        default: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
        ]
      },
      {
        name: 'school',
        type: 'text'
      },
      {
        name: 'phoneNumber',
        type: 'text'
      },
      {
        name: 'email',
        type: 'text'
      },
      {
        name: 'parentName',
        type: 'text'
      },
      {
        name: 'parentPhoneNumber',
        type: 'text'
      },
      {
        name: 'parentEmail',
        type: 'text'
      },
      {
        name: 'addressProvince',
        type: 'text'
      },
      {
        name: 'addressCity',
        type: 'text'
      },
      {
        name: 'addressStreet',
        type: 'text'
      },
      {
        name: 'addressUrban',
        type: 'text'
      },
      {
        name: 'addressSubDistrict',
        type: 'text'
      },
      {
        name: 'subjects',
        type: 'array_text',
        default: [
          'Matematika',
          'Fisika',
          'Kimia',
          'Biologi',
        ]
      },
      {
        name: 'schedule',
        type: 'array_schedule'
      },
      {
        name: 'scheduleAdditional',
        type: 'text'
      },
      {
        name: 'teacher',
        type: 'array_text',
        default: [
          'Laki-laki',
          'Wanite'
        ]
      },
      {
        name: 'notes',
        type: 'choice',
        default: [
          'Ya',
          'Tidak'
        ]
      },
      {
        name: 'studentTotalName',
        type: 'enum',
        default: [
          'Paket 8 sesi',
          'Paket 24 sesi',
          'Paket 48 sesi',
        ]
      },
    ]
  },
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
    afterCreate: (data) => {
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