// data.js — Portal content. Add/edit categories and links here; nothing else needs to change.
const PORTAL_DATA = [
  {
    id: "courses",
    name: "Courses & Timetable",
    description: "Enrolment, timetables, unit outlines.",
    tileImage: "assets/icons/courses-tile.png",
    links: [
      { name: "Sydney Student", url: "https://sydneystudent.sydney.edu.au", description: "Enrol, view timetable, results.", icon: "assets/icons/sydney-student.png" },
      { name: "Class Timetables", url: "https://timetable.sydney.edu.au", description: "Search unit of study timetables.", icon: "assets/icons/timetable.png" },
      { name: "Unit of Study Outlines", url: "https://www.sydney.edu.au/units", description: "Official outlines for every unit.", icon: "assets/icons/outlines.png" }
    ]
  },
  {
    id: "lms",
    name: "Learning (LMS)",
    description: "Course content, submissions, grades.",
    tileImage: "assets/icons/lms-tile.png",
    links: [
      { name: "Canvas", url: "https://canvas.sydney.edu.au", description: "Unit of study sites, assignments, grades.", icon: "assets/icons/canvas.png" },
      { name: "Turnitin", url: "https://www.turnitin.com", description: "Assignment originality checking.", icon: "assets/icons/turnitin.png" }
    ]
  },
  {
    id: "library",
    name: "Library & Resources",
    description: "Search, study spaces, resources.",
    tileImage: "assets/icons/library-tile.png",
    links: [
      { name: "Library Home", url: "https://www.library.sydney.edu.au", description: "Catalogue, databases, guides.", icon: "assets/icons/library.png" },
      { name: "Study Spaces", url: "https://www.library.sydney.edu.au/study", description: "Book a room or find a quiet desk.", icon: "assets/icons/study.png" }
    ]
  },
  {
    id: "email",
    name: "Email & Calendar",
    description: "Webmail and your class timetable calendar.",
    tileImage: "assets/icons/email-tile.png",
    links: [
      { name: "Outlook Webmail", url: "https://outlook.office.com/mail", description: "Student email inbox.", icon: "assets/icons/outlook.png" },
      { name: "Outlook Calendar", url: "https://outlook.office.com/calendar", description: "Opens your Outlook calendar in a new tab.", icon: "assets/icons/calendar.png" }
    ]
  },
  {
    id: "clubs",
    name: "Clubs & Events",
    description: "Societies, events, campus life.",
    tileImage: "assets/icons/clubs-tile.png",
    links: [
      { name: "USU Clubs", url: "https://usu.edu.au/clubs", description: "Find and join student societies.", icon: "assets/icons/clubs.png" },
      { name: "What's On", url: "https://www.sydney.edu.au/whats-on", description: "Upcoming university events.", icon: "assets/icons/events.png" }
    ]
  },
  {
    id: "commute",
    name: "Campus & Commute",
    description: "Getting to campus and finding your way.",
    tileImage: "assets/icons/commute-tile.png",
    links: [
      { name: "Campus Maps", url: "https://www.sydney.edu.au/campus-life/campus-map.html", description: "Interactive campus map.", icon: "assets/icons/maps.png" },
      { name: "Opal Card", url: "https://transportnsw.info/tickets-opal/opal", description: "Manage your transport fare card.", icon: "assets/icons/opal.png" },
      { name: "University Bus", url: "https://transportnsw.info", description: "Bus routes and live timetables.", icon: "assets/icons/bus.png" }
    ]
  },
  {
    id: "support",
    name: "Student Support",
    description: "Wellbeing, careers, and financial help.",
    tileImage: "assets/icons/support-tile.png",
    links: [
      { name: "Student Wellbeing", url: "https://www.sydney.edu.au/students/student-support-services.html", description: "Counselling and support services.", icon: "assets/icons/wellbeing.png" },
      { name: "Careers Centre", url: "https://www.sydney.edu.au/careers", description: "Jobs, internships, and career advice.", icon: "assets/icons/careers.png" }
    ]
  }
];
