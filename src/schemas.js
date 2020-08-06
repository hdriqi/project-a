// fullname: router.query.fullname || '',
//     class: router.query.class ||'',
//     schoolName: '',
//     stuPhoneNumber: '',
//     stuEmail: '',
//     parentTitle: '',
//     parentFullname: '',
//     parentPhoneNumber: '',
//     parentEmail: '',
//     addressProvince: '',
//     addressCity: '',
//     addressDetail: '',
//     tutorNote: '',
//     package: ''

module.exports = [
  {
    name: "Student",
    type: "Form",
    fields: [
      {
        name: "fullname",
        type: "text",
        component: "text",
      },
      {
        name: "additionalStudentFullname",
        type: "array_text",
        component: "text",
      },
      {
        name: "class",
        type: "enum",
        default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        component: "dropdown",
      },
      {
        name: "schoolName",
        type: "text",
        component: "text",
      },
      {
        name: "stuPhoneNumber",
        type: "text",
        component: "text",
      },
      {
        name: "stuEmail",
        type: "text",
        component: "text",
      },
      {
        name: "parentName",
        type: "text",
        component: "text"
      },
      {
        name: "parentPhoneNumber",
        type: "text",
        component: "text",
      },
      {
        name: "parentEmail",
        type: "text",
        component: "text",
      },
      /*
      Custom ProvinceCityAddress
      {
        name: "addressProvince",
        type: "text",
        component: "dropdown",
        default: ["DKI Jakarta", "Banten", "Jawa Barat"],
      },
      {
        name: "addressCity",
        type: "text",
        component: "dropdown",
        default: {
          "DKI Jakarta": [
            "Jakarta Utara",
            "Jakarta Selatan",
            "Jakarta Barat",
            "Jakarta Timur",
            "Jakarta Pusat",
          ],
          Banten: ["Tangerang", "Tangerang Selatan"],
          "Jawa Barat": ["Bekasi", "Bogor", "Depok"],
        },
      },
      */
      {
        name: "addressStreet",
        type: "text",
        component: "text",
      },
      {
        name: "addressUrban",
        type: "text",
        component: "text",
      },
      {
        name: "addressSubDistrict",
        type: "text",
        component: "text",
      },
      {
        name: "subjects",
        type: "array_text",
        default: ["Matematika", "Fisika", "Kimia", "Biologi"],
        component: "checkbox",
      },
      {
        name: "schedule",
        type: "array_schedule",
        component: "schedule",
        componentType: "student",
        scheduleMin:3
      },
      {
        name: "scheduleAdditional",
        type: "text",
        component: "text",
      },
      {
        name: "teacher",
        type: "array_text",
        default: ["Laki-laki", "Wanita"],
        component: "checkbox",
      },
      {
        name: "studentNotes",
        type: "text",
        component: "textarea",
      },
      /*
      Custom Group
      {
        name: "group",
        type: "choice",
        default: ["Ya", "Tidak"],
        component: "radio",
      },
      {
        name: "groupNumber",
        type: "enum",
        component: "dropdown",
        default: [1, 2, 3, 4, 5, 6],
      },
      */
      {
        name: "studentTotalName",
        type: "enum",
        default: ["Paket 8 sesi", "Paket 24 sesi", "Paket 48 sesi"],
        component: "radio",
      },
    ],
  },
  {
    name: "Post",
    type: "content",
    fields: [
      {
        name: "title",
        type: "text",
        component: "text",
        validation: (input) => {
          return [input.length > 0, "Title must be at least 1 characters"];
        },
      },
      {
        name: "schedule",
        type: "schedule",
        component: "schedule",
        componentType: "teacher",
        scheduleMin:4,
        validation: (input) => {
          return [input.length > 0, "Title must be at least 1 characters"];
        },
      },
    ],
    afterCreate: (data) => {
      console.log(`Sent email notification new post to subscribers`);
      /*
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
      */
    },
  },
];