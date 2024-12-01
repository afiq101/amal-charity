export default [
  {
    header: "",
    description: "",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Organizer",
        path: "",
        icon: "ph:files-bold",
        child: [
          {
            "title": "Campaign Organizer",
            "path": "/campaign-organizer",
            "icon": "",
            "child": []
          },
          {
            "title": "Project Organizer",
            "path": "/campaign-organizer/campaign-detail/1",
            "icon": "",
            "child": []
          },
        ],
        meta: {},
      },
      {
        title: "Volunteer",
        path: "/volunteer",
        icon: "ic:outline-support-agent",
        child: [],
        meta: {},
      },
      {
        title: "Contributor",
        path: "/contributor",
        icon: "streamline:give-gift",
        child: [],
        meta: {},
      },
      {
        title: "User Profile",
        path: "/user-profile",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Recipient",
        path: "/recipient",
        icon: "ic:outline-dashboard",
        child: [],
      },
    ],
  },
];
