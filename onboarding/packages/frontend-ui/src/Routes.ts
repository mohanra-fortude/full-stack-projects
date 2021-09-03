var pathname = window.location.pathname;
var path = pathname.split("/");
var adminUpdatePath = path.slice(2);
var recruiterUpdatePath = path.slice(3);
var hrUpdatePath = path.slice(3);
var offerpath = path.slice(2);

const admin_routes = [
  "/admin/workspace",
  "/admin/dashboard",
  "/admin/manage-employees",
  "/admin/delete-employee",
  "/createuser",
  `/update/${adminUpdatePath}`,
];

const recruiter_routes = [
  "/recruiter/workspace",
  "/recruiter/dashboard",
  "/recruiter/manage-clients",
  "/recruiter/manage-candidates",
  "/recruiter/candidate-info",
  `/Recruiter/updatecandidatemain/${recruiterUpdatePath}`,
  `/recruiter/candidate-details/${recruiterUpdatePath}`,
  "/manage-candidates",
  "/recruiter/createcandidatemain",
];

const hr_routes = [
  "/hr/workspace",
  "/hr/dashboard",
  "/hr/manage-candidates",
  `/hr/candidate-details/${hrUpdatePath}`,
  "/hr/candidate-details",
  "/hr/renegotiate",
  `/offer/${offerpath}`,
  "/manage-candidates",
];

const account_manager_routes = [
  "/account-manager/workspace",
  "/account-manager/dashboard",
  "/account-manager/manage-candidates",
  "/account-manager/offer-request-initiated",
  "/manage-candidates",
];

const leader_routes = [
  "/leader/workspace",
  "/leader/dashboard",
  "/leader/manage-candidates",
  "/leader/offer-request-initiated",
  "/manage-candidates",
];

const candidate_routes = [
  "/candidate/workspace",
  "/candidate/manage-documents",
  "/candidate/offer",
];

export {
  admin_routes,
  recruiter_routes,
  hr_routes,
  account_manager_routes,
  leader_routes,
  candidate_routes,
};
