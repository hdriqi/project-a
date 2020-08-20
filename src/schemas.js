module.exports = [
  {
    name: "Tutor",
    type: "Form",
    fields: [
      {
        name: "fullname",
        type: "text",
        component: "text",
      },
      {
        name: "dateOfBirth",
        type: "text",
        component: "text",
      },
      {
        name: "addressProvince",
        type: "text",
        component: "text",
      },
      {
        name: "addressCity",
        type: "text",
        component: "text",
      },
      {
        name: "addressDistrict",
        type: "text",
        component: "text",
      },
      {
        name: "addressDetail",
        type: "text",
        component: "text",
      },
      {
        name: "transport",
        type: "text",
        component: "text",
      },
      {
        name: "phoneNumber",
        type: "text",
        component: "text",
      },
      {
        name: "email",
        type: "text",
        component: "text",
      },
      {
        name: "eduUniversity",
        type: "text",
        component: "text",
      },
      {
        name: "eduMajor",
        type: "text",
        component: "text",
      },
      {
        name: "eduGradYear",
        type: "text",
        component: "text",
      },
      {
        name: "eduGPA",
        type: "text",
        component: "text",
      },
      {
        name: "eduExp",
        type: "text",
        component: "text",
      },
      {
        name: "eduAchievement",
        type: "text",
        component: "text",
      },
      {
        name: "attachment",
        type: "text",
        component: "upload",
      },
      {
        name: "schedules",
        type: "array_text",
        component: "multiple_text",
        componentType: "text",
        multipleTextMin: 2,
      },
      {
        name: "subjects",
        type: "array_text",
        component: "multiple_text",
        componentType: "text",
        multipleTextMin: 1,
      },
      {
        name: "areas",
        type: "array_text",
        component: "multiple_text",
        componentType: "text",
        multipleTextMin: 1,
      }
    ]
  },
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
        name: "additionalStudents",
        type: "array_text",
        component: "multiple_text",
        componentType: "text",
        multipleTextMin: 1,
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
        name: "parentTitle",
        type: "text",
        component: "text",
      },
      {
        name: "parentName",
        type: "text",
        component: "text",
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
      {
        name: "addressProvince",
        type: "text",
        component: "text"
      },
      {
        name: "addressCity",
        type: "text",
        component: "text"
      },
      {
        name: "addressDistrict",
        type: "text",
        component: "text"
      },
      {
        name: "addressDetail",
        type: "text",
        component: "text",
      },
      {
        name: "subjects",
        type: "array_text",
        component: "multiple_text",
        componentType: "text",
      },
      {
        name: "schedules",
        type: "array_text",
        component: "multiple_text",
        componentType: "text",
        multipleTextMin: 4,
      },
      {
        name: "tutorNote",
        type: "text",
        component: "text",
      },
      {
        name: "teacher",
        type: "array_text",
        component: "multiple_text",
        componentType: "text",
      },
      {
        name: "package",
        type: "enum",
        default: ["8", "24", "48"],
        component: "radio",
      },
    ],
  },
  {
    name: "Slides",
    parent: "Home",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "img",
        type: "text",
        component: "upload",
      },
      {
        name: "url",
        type: "text",
        component: "text",
      },
    ],
  },
  {
    name: "Company",
    parent: "About",
    type: "content",
    isMultiple: false,
    fields: [
      {
        name: "img",
        type: "text",
        component: "upload"
      },
      {
        name: "intro",
        type: "text",
        component: "textarea",
        validation: (input) => {
          return [input && input.length > 0, "intro must be at least 1 characters"]
        },
      },
      {
        name: "vision",
        type: "text",
        component: "textarea",
        componentType: "teacher",
        validation: (input) => {
          return [input && input.length > 0, "vision must be at least 1 characters"]
        },
      },
      {
        name: "mission",
        type: "text",
        component: "textarea",
        validation: (input) => {
          return [input && input.length > 0, "mission must be at least 1 characters"]
        },
      },
    ],
  },
  {
    name: "Why",
    parent: "Home",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "icon",
        type: "text",
        component: "upload",
      },
      {
        name: "title",
        type: "text",
        component: "text",
      },
      {
        name: "description",
        type: "text",
        component: "textarea",
      },
    ],
  },
  {
    name: "Methods",
    parent: "Home",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "name",
        type: "text",
        component: "text",
      },
      {
        name: "img",
        type: "text",
        component: "upload",
      },
      {
        name: "description",
        type: "text",
        component: "textarea",
      },
    ],
  },
  {
    name: "Testimonials",
    parent: "Home",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "name",
        type: "text",
        component: "text",
      },
      {
        name: "img",
        type: "text",
        component: "upload",
      },
      {
        name: "message",
        type: "text",
        component: "textarea",
      },
    ],
  },
  {
    name: "FAQ",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "question",
        type: "text",
        component: "textarea",
      },
      {
        name: "answer",
        type: "text",
        component: "textarea",
      },
    ],
  },
  {
    name: "News",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "title",
        type: "text",
        component: "text",
      },
      {
        name: "img",
        type: "text",
        component: "upload",
      },
      {
        name: "body",
        type: "text",
        component: "rich-text",
      },
    ],
  },
  {
    name: "Team",
    parent: "About",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "name",
        type: "text",
        component: "text",
      },
      {
        name: "img",
        type: "text",
        component: "upload",
      },
      {
        name: "position",
        type: "text",
        component: "text",
      },
      {
        name: "quotes",
        type: "text",
        component: "rich-text",
      },
    ],
  },
  {
    name: "Pricing",
    isMultiple: true,
    type: "content",
    fields: [
      {
        name: "level",
        type: "enum",
        default: ["SD", "SMP", "SMA"],
        component: "dropdown",
      },
      {
        name: "class",
        type: "text",
        component: "text"
      },
      {
        name: "session",
        type: "number",
        component: "text",
      },
      {
        name: "price",
        type: "array_number",
        component: "multiple_text",
        componentType: "number",
        multipleTextMin: 1,
      },
    ],
  },
  {
    name: "Info",
    type: "content",
    fields: [
      {
        name: "email",
        type: "text",
        component: "text",
      },
      {
        name: "phoneNumber",
        type: "text",
        component: "text",
      },
      {
        name: "officeHours",
        type: "text",
        component: "text",
      },
      {
        name: "termsAndConditionsFile",
        type: "text",
        component: "upload",
      },
      {
        name: "pricingNotes",
        type: "text",
        component: "rich-text",
      },
      {
        name: "office",
        type: "text",
        component: "textarea",
      },
      {
        name: "facebook",
        type: "text",
        component: "text",
      },
      {
        name: "twitter",
        type: "text",
        component: "text",
      },
      {
        name: "instagram",
        type: "text",
        component: "text",
      },
      {
        name: "tiktok",
        type: "text",
        component: "text",
      },
    ],
  },
]