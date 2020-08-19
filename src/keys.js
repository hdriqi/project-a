module.exports = [
  {
    key: process.env.ROOT_KEY,
    access: ['*_*']
  },
  {
    key: process.env.CLIENT_READ_KEY,
    access: [
      'SLIDES_GET',
      'COMPANY_GET', 
      'WHY_GET',
      'METHODS_GET',
      'TESTIMONIALS_GET',
      'PRICING_GET',
      'FAQ_GET',
      'NEWS_GET',
      'TEAM_GET',
      'INFO_GET'
    ]
  },
  {
    key: process.env.CLIENT_WRITE_KEY,
    access: [
      'STUDENT_POST',
      'TUTOR_POST'
    ]
  },
]