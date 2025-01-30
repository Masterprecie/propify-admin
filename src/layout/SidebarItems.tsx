import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

import { memo } from "react";
import { NavLink } from "react-router-dom";

const SidebarItems = memo(function SidebarItems({ link }) {
  return (
    <div className="w-[85%] m-auto  ">
      <ListItem
        disablePadding
        disableGutters
        sx={{
          mt: ".5em",
          borderRadius: "10px",
        }}
      >
        <ListItemButton
          component={NavLink}
          to={link.url}
          className=""
          sx={{
            color: "#121212 !important",
            background: "transparent",
            borderRadius: "10px",
            "&.active": {
              background: "#E6F9EF",
              color: "#121212",
            },
            "&:hover": {
              background: "#E6F9EF",
              color: "#121212",
            },
          }}
          style={({ isActive }) => ({
            background: isActive ? "#E6F9EF" : "transparent",
            color: isActive ? "#121212" : "#121212",
          })}
        >
          <ListItemIcon
            className="text-[#0B3140]"
            sx={{
              minWidth: "25px",
            }}
          >
            {<link.icon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography>{link.name}</Typography>}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
});

SidebarItems.displayName = "SidebarItems";

export default SidebarItems;
