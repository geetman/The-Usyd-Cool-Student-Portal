// data.js — Portal content. Add/edit categories and links here; nothing else needs to change.
const PORTAL_DATA = [
  {
    id: "courses",
    name: "Courses & Timetable",
    description: "Enrolment, timetables, unit outlines.",
    tileImage: "assets/courses-tile.png",
    links: [
      { name: "Sydney Student", url: "https://sydneystudent.sydney.edu.au", description: "Enrol, view timetable, results.", icon: "assets/sydney-student.png" },
      { name: "Sydney Student (Direct Login)", url: "https://sydneystudent.sydney.edu.au/sitsvision/wrd/siw_portal.url?KPKXQKQIL0HONYGTvKMF-FJu3iiKi41E5TbdiIUma9AXcbb1BId-VbUHDiR46XfXYlA8zcbZgUsi9wLYgUtCZmUI3o5Op0DFkj4KBga5EvWE4BiHvmJqGRegd8IYpCUCCwFyenv4yC3iX7xvl4gyWG6vBmlsX8D9rBtvoEzZudr-RszMa9R0w6yQZibN8aMq9CoL9eN-Ua0DBy2kS8G8w0pWIPyRd2iHDwhjvBNBlexf1KSe6bdV_Ll8PXptnkd--ixGL8b5WOOkZIAo", description: "Direct deep link into your Sydney Student session.", icon: "assets/sydney-student-direct.png" },
      { name: "Class Timetables", url: "https://timetable.sydney.edu.au", description: "Search unit of study timetables.", icon: "assets/timetable.png" },
      { name: "My Timetable", url: "https://timetable.sydney.edu.au/even/student?ss=b2aacf594063421eb80b2e7249ef80f0", description: "Your personal saved timetable view.", icon: "assets/my-timetable.png" },
      { name: "Unit of Study Outlines", url: "https://www.sydney.edu.au/units", description: "Official outlines for every unit.", icon: "assets/outlines.png" },
      { name: "Course & Unit Handbooks", url: "https://www.sydney.edu.au/handbooks", description: "Degree structures and unit handbooks.", icon: "assets/handbooks.png" }
    ]
  },
  {
    id: "lms",
    name: "Learning (LMS)",
    description: "Course content, submissions, grades.",
    tileImage: "assets/lms-tile.png",
    links: [
      { name: "Canvas", url: "https://canvas.sydney.edu.au", description: "Unit of study sites, assignments, grades.", icon: "assets/canvas.png" },
      { name: "Turnitin", url: "https://www.turnitin.com", description: "Assignment originality checking.", icon: "assets/turnitin.png" },
      { name: "Zoom", url: "https://uni-sydney.zoom.us/profile", description: "Join or manage your Zoom classes.", icon: "assets/zoom.png" },
      { name: "Microsoft Teams Chat", url: "https://m365.cloud.microsoft/chat?form=delve&origin=ProfileAboutMe&v=profile", description: "Chat and collaborate with staff and students.", icon: "assets/teams-chat.png" },
      { name: "SONIA Placements", url: "https://sonia-online.sydney.edu.au/", description: "Manage professional placements and practicums.", icon: "assets/sonia.png" },
      { name: "DashR Dashboard", url: "https://dashr-dev.sydney.edu.au/", description: "Reporting and analytics dashboard.", icon: "assets/dashr.png" }
    ]
  },
  {
    id: "library",
    name: "Library & Resources",
    description: "Search, study spaces, resources.",
    tileImage: "assets/library-tile.png",
    links: [
      { name: "Library Home", url: "https://www.library.sydney.edu.au", description: "Catalogue, databases, guides.", icon: "assets/library.png" },
      { name: "Library Catalogue (Primo)", url: "https://sydney.primo.exlibrisgroup.com/discovery/search?vid=61USYD_INST:sydney&lang=en", description: "Search books, journals, and articles.", icon: "assets/primo.png" },
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
      { name: "New Outlook (Web)", url: "https://outlook.cloud.microsoft/mail/", description: "The newer Outlook web experience.", icon: "assets/new-outlook.png" },
      { name: "Outlook Calendar", url: "https://outlook.office.com/calendar", description: "Opens your Outlook calendar in a new tab.", icon: "assets/calendar.png" },
      { name: "OneDrive & SharePoint", url: "https://unisydneyedu-my.sharepoint.com/?wa=wsignin1%2E0", description: "Your cloud files and shared documents.", icon: "assets/onedrive.png" }
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
      { name: "Careers Centre", url: "https://www.sydney.edu.au/careers", description: "Jobs, internships, and career advice.", icon: "assets/careers.png" },
      { name: "Student Surveys", url: "https://student-surveys.sydney.edu.au/students/complete/", description: "Complete your unit of study surveys.", icon: "assets/student-surveys.png" },
      { name: "Ask a Question", url: "https://www.sydney.edu.au/students/ask-a-question.html", description: "Submit an enquiry to student services.", icon: "assets/ask-question.png" }
    ]
  },
  {
    id: "accounts",
    name: "Accounts & Systems",
    description: "Single sign-on, dashboards, and IT support.",
    tileImage: "assets/accounts-tile.png",
    links: [
      { name: "Single Sign-On (SSO)", url: "https://sso.sydney.edu.au/app/UserHome", description: "Your central login dashboard.", icon: "assets/sso.png" },
      { name: "CUSP", url: "https://cusp.sydney.edu.au/", description: "Current student portal.", icon: "assets/cusp.png" },
      { name: "MyUni Dashboard", url: "https://myuni.sydney.edu.au/", description: "Your personalised student dashboard.", icon: "assets/myuni.png" },
      { name: "Student Intranet", url: "https://intranet.sydney.edu.au/", description: "Internal student resources and forms.", icon: "assets/intranet.png" },
      { name: "All System Logins", url: "https://www.sydney.edu.au/students/#all-system-logins", description: "Full directory of student system logins.", icon: "assets/all-logins.png" },
      { name: "IT & HR Service Desk", url: "https://sydneyuni.service-now.com/sm?id=emp_taxonomy_topic&topic_id=847687158768c110fb4dab0a0cbb35b4", description: "Get help with IT and admin requests.", icon: "assets/service-desk.png" }
    ]
  },
  {
    id: "finance",
    name: "Finance & Documents",
    description: "Fees, policies, procurement, and official documents.",
    tileImage: "assets/finance-tile.png",
    links: [
      { name: "SydPay (Student Accounts)", url: "https://sydpay-sp.transactcampus.com/eAccounts/AccountSummary.aspx?menu=0", description: "View fees and account balance.", icon: "assets/sydpay.png" },
      { name: "Testamurs & Certified Documents", url: "https://students.publishpartner.com.au/en-AU/", description: "Order official testamurs and transcripts.", icon: "assets/testamurs.png" },
      { name: "University Policies", url: "https://www.sydney.edu.au/policies/", description: "Official university policy register.", icon: "assets/policies.png" },
      { name: "Jaggaer (Procurement)", url: "https://rmm.jaggaer.com/uosydney/erd-client/app/secure/userpreferences/", description: "Procurement and reimbursement requests.", icon: "assets/jaggaer.png" }
    ]
  },
  {
    id: "careers",
    name: "Careers & Development",
    description: "Jobs, career tools, and professional learning.",
    tileImage: "assets/careers2-tile.png",
    links: [
      { name: "CareerHub", url: "https://careerhub.sydney.edu.au/", description: "Student job board and career events.", icon: "assets/careerhub.png" },
      { name: "GradsFirst Assessments", url: "https://app.graduatesfirst.com/SYDNEYBS#home/overview", description: "Career readiness practice assessments.", icon: "assets/gradsfirst.png" },
      { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/browse/certifications?u=2196204", description: "Free courses and certifications.", icon: "assets/linkedin-learning.png" }
    ]
  }
];
