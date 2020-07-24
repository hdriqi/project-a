import CMS from '../lib'

const cms = new CMS()

cms.registerComponents([
  {
    name: 'Schedule',
    component: 'InputSchedule'
  }
])

cms.registerSchemas({
  schemas: [
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
  ]
})

cms.run()