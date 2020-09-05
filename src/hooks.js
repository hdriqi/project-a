module.exports = [
  {
    name: 'Student',
    afterCreate: async (ctx, data) => {
      console.log(`Sent email notification new student ${data._id} to subscribers`)
      ctx.email.sendMail({
        from: 'notification@evius.id',
        to: process.env.NOTIF_RECEIVER,
        subject: `[Electrum #${data._id}] New Student Data`,
        html: `Received new student data. Visit <a href="https://cms.rumahbelajarelectrum.com" target="_blank">Dashboard</a>`
      }, (err, info) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(info.envelope)
        console.log(info.messageId)
      })
    },
  },
  {
    name: 'Tutor',
    afterCreate: async (ctx, data) => {
      console.log(`Sent email notification new student ${data._id} to subscribers`)
      ctx.email.sendMail({
        from: 'notification@evius.id',
        to: process.env.NOTIF_RECEIVER,
        subject: `[Electrum #${data._id}] New Tutor Data`,
        html: `Received new tutor data. Visit <a href="https://cms.rumahbelajarelectrum.com" target="_blank">Dashboard</a>`
      }, (err, info) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(info.envelope)
        console.log(info.messageId)
      })
    },
  },
  {
    name: 'Online',
    afterCreate: async (ctx, data) => {
      console.log(`Sent email notification new online student ${data._id} to subscribers`)
      ctx.email.sendMail({
        from: 'notification@evius.id',
        to: process.env.NOTIF_RECEIVER,
        subject: `[Electrum #${data._id}] New Online Student Data`,
        html: `Received new online student data. Visit <a href="https://cms.rumahbelajarelectrum.com" target="_blank">Dashboard</a>`
      }, (err, info) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(info.envelope)
        console.log(info.messageId)
      })
    },
  }
]