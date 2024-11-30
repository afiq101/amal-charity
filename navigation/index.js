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
        title: "User Profile",
        path: "/user-profile",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
    ],
  },
  {
    header: "Administration",
    description: "Manage your application",
    child: [
      {
        title: "Configuration",
        icon: "ic:outline-settings",
        child: [
          {
            title: "Environment",
            path: "/devtool/config/environment",
          },
        ],
      },
      {
        title: "Menu Editor",
        icon: "ci:menu-alt-03",
        path: "/devtool/menu-editor",
        child: [],
      },
      {
        title: "Manage Users",
        path: "/devtool/user-management",
        icon: "ph:user-circle-gear",
        child: [
          {
            title: "User List",
            path: "/devtool/user-management/user",
            icon: "",
            child: [],
          },
          {
            title: "Role List",
            path: "/devtool/user-management/role",
            icon: "",
            child: [],
          },
        ],
      },
      {
        title: "Content",
        icon: "mdi:pencil-ruler",
        child: [
          {
            title: "Editor",
            path: "/devtool/content-editor",
          },
          {
            title: "Template",
            path: "/devtool/content-editor/template",
          },
        ],
      },
      {
        title: "Campaign Organizer",
        path: "/campaign-organizer",
        icon: "ph:files-bold",
        child: [],
      },
      {
        title: "Volunteer",
        path: "/volunteer",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
    ],
  },
];
