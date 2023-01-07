import { PlusCircleIcon, CogIcon, LogoutIcon, BriefcaseIcon, TemplateIcon } from "@heroicons/react/outline";

export const navLinks = [
  {
    id: 0,
    title: "Dashboard",
    icon: <TemplateIcon className="nav-icon" />,
    link:"/signin"
  },
  {
    id: 1,
    title: "Your Jobs",
    icon: <BriefcaseIcon className="nav-icon" />,
    link:"/signin/yourjobs"
  },
  {
    id: 2,
    title: "Your Internships",
    icon: <BriefcaseIcon className="nav-icon" />,
    link:"/signin/yourinternships"
  },
  {
    id: 3,
    title: "Add Job",
    icon: <PlusCircleIcon className="nav-icon" />,
    link:"/signin/addjob"
  },
  {
    id: 4,
    title: "Settings",
    icon: <CogIcon className="nav-icon" />,
    link:"/signin/dashboard"
  },
  {
    id: 5,
    title: "LogOut",
    icon: <LogoutIcon className="nav-icon" />,
    link:"/"
  },
];