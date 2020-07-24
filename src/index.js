import cms from '../lib'

cms({
  schemas: [
    {
      name: 'Post',
      type: 'content',
      fields: [
        {
          name: 'title',
          type: 'text',
          validation: (input) => {
            return input.length > 0
          },
        }
      ],
      afterSave: (data) => {
        console.log(`Sent email notification new post ${data.id} to subscribers`)
      }
    }
  ]
})