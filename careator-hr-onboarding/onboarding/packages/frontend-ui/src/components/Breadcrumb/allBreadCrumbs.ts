const admin_breadcrumbs = [
  { path: "/admin/workspace", name: "My Workspace" },
  { path: "/admin/dashboard", name: "Dashboard" },
  { path: "/admin/manage-employees", name: "Manage Employees" },
  { path: "/admin/delete-employee", name: "Delete Employee" },
  { path: "/createuser", name: "Create Employee" },
];

const recruiter_breadcrumbs = [
  { path: "/recruiter/workspace", name: "My Workspace" },
  { path: "/recruiter/dashboard", name: "Dashboard" },
  { path: "/recruiter/manage-clients", name: "Manage Clients" },
  { path: "/recruiter/manage-candidates", name: "Manage Candidates" },
];

const hr_breadcrumbs = [
  { path: "/hr/workspace", name: "My Workspace" },
  { path: "/hr/dashboard", name: "Dashboard" },
  { path: "/hr/candidateList", name: "Manage Candidates" },
  { path: "/hr/renegotiate" , name2:"Renegotiate" },
];

const account_manager_breadcrumbs = [
  { path: "/account-manager/workspace", name: "My Workspace" },
  { path: "/account-manager/submenu1", name: "Dashboard" },
  { path: "/account-manager/manage-candidates", name: "Manage Candidates" },
  {
    path: "/account-manager/offer-request-initiated",
    name: "Initiate Offer Request",
  },
  { path: "/am/renegotiate" , name2:"Renegotiate" },
];

const leader_breadcrumbs = [
  { path: "/leader/workspace", name: "My Workspace" },
  { path: "/leader/dashboard", name: "Dashboard" },
  { path: "/leader/manage-candidates", name: "Manage Candidates" },
];

const candidate_breadcrumbs = [
  { path: "/candidate/workspace", name: "My Workspace" },
  { path: "/candidate/manage-documents", name: "Manage Documents" },
  { path: "/candidate/offer", name: "Offer" },
];

const viewprofile_breadcrumbs = [
  { path: "/admin/workspace", name: "My Workspace" },
  { path: "/recruiter/workspace", name: "My Workspace" },
  { path: "/hr/workspace", name: "My Workspace" },
  { path: "/account-manager/workspace", name: "My Workspace" },
  { path: "/leader/workspace", name: "My Workspace" },
  { path: "/candidate/workspace", name: "My Workspace" },
];

export {
  admin_breadcrumbs,
  recruiter_breadcrumbs,
  hr_breadcrumbs,
  account_manager_breadcrumbs,
  leader_breadcrumbs,
  candidate_breadcrumbs,
  viewprofile_breadcrumbs,
};
