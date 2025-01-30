import { SlHome } from "react-icons/sl";
import { MdOutlineExplore } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoNotificationsCircleOutline } from "react-icons/io5";

export const links = [
  {
    name: "Home",
    url: "/dashboard/home",
    icon: SlHome,
  },
  {
    name: "Users",
    url: "/dashboard/users",
    icon: FaUsers,
  },
  {
    name: "Properties",
    url: "/dashboard/properties",
    icon: MdOutlineExplore,
  },

  {
    name: "Bookings",
    url: "/dashboard/bookings",
    icon: SlCalender,
  },
  {
    name: "Profile",
    url: "/dashboard/profile",
    icon: CgProfile,
  },

  {
    name: "Notifications",
    url: "/dashboard/notifications",
    icon: IoNotificationsCircleOutline,
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
    icon: IoSettingsOutline,
  },
  {
    name: "Supports",
    url: "/dashboard/supports",
    icon: BiSupport,
  },
];
