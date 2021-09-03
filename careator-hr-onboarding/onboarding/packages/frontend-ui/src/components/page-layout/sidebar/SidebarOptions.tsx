import {
  DashboardOutlined,
  LaptopOutlined,
  ClockCircleOutlined,
  UsergroupDeleteOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  admin_routes,
  recruiter_routes,
  hr_routes,
  account_manager_routes,
  leader_routes,
  candidate_routes,
} from "../../../Routes";
import { SidebarOptionsType } from "../../../types";

const sidebarOptions: SidebarOptionsType[] = [
  {
    role: "Admin",
    routes: [
      {
        option: "My Workspace",
        icon: <LaptopOutlined />,
        route: admin_routes[0],
      },
      {
        option: "Dashboard",
        icon: <DashboardOutlined />,
        route: admin_routes[1],
      },
      {
        option: "Manage Employees",
        icon: <LaptopOutlined />,
        route: admin_routes[2],
      },
    ],
  },
  {
    role: "Recruiter",
    routes: [
      {
        option: "My Workspace",
        icon: <LaptopOutlined />,
        route: recruiter_routes[0],
      },
      {
        option: "Dashboard",
        icon: <DashboardOutlined />,
        route: recruiter_routes[1],
      },
      {
        option: "Manage Clients",
        icon: <ClockCircleOutlined />,
        route: recruiter_routes[2],
      },
      {
        option: "Manage Candidates",
        icon: <UsergroupDeleteOutlined />,
        route: recruiter_routes[3],
      },
    ],
  },
  {
    role: "HR",
    routes: [
      {
        option: "My Workspace",
        icon: <LaptopOutlined />,
        route: hr_routes[0],
      },
      {
        option: "Dashboard",
        icon: <DashboardOutlined />,
        route: hr_routes[1],
      },
      {
        option: "Manage Candidate",
        icon: <LaptopOutlined />,
        route: hr_routes[2],
      },
    ],
  },
  {
    role: "AM",
    routes: [
      {
        option: "My Workspace",
        icon: <LaptopOutlined />,
        route: account_manager_routes[0],
      },
      {
        option: "Dashboard",
        icon: <DashboardOutlined />,
        route: account_manager_routes[1],
      },
      {
        option: "Manage Candidates",
        icon: <UsergroupDeleteOutlined />,
        route: account_manager_routes[2],
      },

    ],
  },
  {
    role: "Leader",
    routes: [
      {
        option: "My Workspace",
        icon: <LaptopOutlined />,
        route: leader_routes[0],
      },
      {
        option: "Dashboard",
        icon: <DashboardOutlined />,
        route: leader_routes[1],
      },
      {
        option: "Manage Candidates",
        icon: <LaptopOutlined />,
        route: leader_routes[2],
      },
    ],
  },
  {
    role: "Candidate",
    routes: [
      {
        option: "My Workspace",
        icon: <LaptopOutlined />,
        route: candidate_routes[0],
      },
      {
        option: "Manage Documents",
        icon: <UserOutlined />,
        route: candidate_routes[1],
      },

      {
        option: "Offer",
        icon: <FileDoneOutlined />,
        route: candidate_routes[2],
      },
    ],
  },
];

export default sidebarOptions;
