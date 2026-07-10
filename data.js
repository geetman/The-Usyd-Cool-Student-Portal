// data.js — Portal content. Add/edit categories and links here; nothing else needs to change.
const PORTAL_DATA = [
  {
    id: "courses",
    name: "Courses & Timetable",
    description: "Enrolment, timetables, unit outlines.",
    tileImage: "assets/courses-tile.png",
    links: [
      { name: "Sydney Student", url: "https://sydneystudent.sydney.edu.au", description: "Enrol, view timetable, results.", icon: "assets/sydney-student.png" },
      { name: "Class Timetables", url: "https://timetable.sydney.edu.au", description: "Search unit of study timetables.", icon: "assets/timetable.png" },
      { name: "Unit of Study Outlines", url: "https://www.sydney.edu.au/units", description: "Official outlines for every unit.", icon: "assets/outlines.png" }
    ]
  },
  {
    id: "lms",
    name: "Learning (LMS)",
    description: "Course content, submissions, grades.",
    tileImage: "assets/lms-tile.png",
    links: [
      { name: "Canvas", url: "https://canvas.sydney.edu.au", description: "Unit of study sites, assignments, grades.", icon: "assets/canvas.png" },
      { name: "Turnitin", url: "https://www.turnitin.com", description: "Assignment originality checking.", icon: "assets/turnitin.png" }
    ]
  },
  {
    id: "library",
    name: "Library & Resources",
    description: "Search, study spaces, resources.",
    tileImage: "assets/library-tile.png",
    links: [
      { name: "Library Home", url: "https://www.library.sydney.edu.au", description: "Catalogue, databases, guides.", icon: "assets/library.png" },
      { name: "Study Spaces", url: "https://www.library.sydney.edu.au/study", description: "Book a room or find a quiet desk.", icon: "assets/study.png" }
    ]
  },
  {
    id: "email",
    name: "Email & Calendar",
    description: "Webmail and your class timetable calendar.",
    tileImage: "assets/email-tile.png",
    links: [
      { name: "Outlook Webmail", url: "https://outlook.office.com/mail", description: "Student email inbox.", icon: "assets/outlook.png" },
      { name: "Outlook Calendar", url: "https://outlook.office.com/calendar", description: "Opens your Outlook calendar in a new tab.", icon: "assets/calendar.png" }
    ]
  },
  {
    id: "clubs",
    name: "Clubs & Events",
    description: "Societies, events, campus life.",
    tileImage: "assets/clubs-tile.png",
    links: [
      { name: "USU Clubs", url: "https://usu.edu.au/clubs", description: "Find and join student societies.", icon: "assets/clubs.png" },
      { name: "What's On", url: "https://www.sydney.edu.au/whats-on", description: "Upcoming university events.", icon: "assets/events.png" }
    ]
  },
  {
    id: "commute",
    name: "Campus & Commute",
    description: "Getting to campus and finding your way.",
    tileImage: "assets/commute-tile.png",
    links: [
      { name: "Campus Maps", url: "https://www.sydney.edu.au/campus-life/campus-map.html", description: "Interactive campus map.", icon: "assets/maps.png" },
      { name: "Opal Card", url: "https://transportnsw.info/tickets-opal/opal", description: "Manage your transport fare card.", icon: "assets/opal.png" },
      { name: "University Bus", url: "https://transportnsw.info", description: "Bus routes and live timetables.", icon: "assets/bus.png" }
    ]
  },
  {
    id: "support",
    name: "Student Support",
    description: "Wellbeing, careers, and financial help.",
    tileImage: "assets/support-tile.png",
    links: [
      { name: "Student Wellbeing", url: "https://www.sydney.edu.au/students/student-support-services.html", description: "Counselling and support services.", icon: "assets/wellbeing.png" },
      { name: "Careers Centre", url: "https://www.sydney.edu.au/careers", description: "Jobs, internships, and career advice.", icon: "assets/careers.png" }
    ]
  }
];
