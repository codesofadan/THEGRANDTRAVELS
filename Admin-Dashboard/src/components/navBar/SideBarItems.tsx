import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { Fragment } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const menuItems = [
  {
    items: [
      
      
      {
        title: "Invoices",
        to: "/invoices",
        icon: <ReceiptOutlinedIcon />,
      },
    ],
  },
  {
    items: [
      {
        title: "User Management",
        to: "/newUser",
        icon: <PersonOutlinedIcon />,
      },
      {
        title: "Calendar",
        to: "/calendar",
        icon: <CalendarTodayOutlinedIcon />,
      },
      {
        title: "Booking Management",
        to: "/bookings",
        icon: <CalendarTodayOutlinedIcon />,
      },
    ],
  },
  {
    items: [
      {
        title: "Popup Management",
        to: "/popups",
        icon: <TimelineOutlinedIcon />,
      },
      {
        title: "Agent Management",
        to: "/agentsmanage",
        icon: <PeopleOutlinedIcon />,
      },
      {
        title: "Client Query Management",
        to: "/CQM",
        icon: <HelpOutlineOutlinedIcon />,
      },
      {
        title: "Flight Management",
        to: "/flightsmanage",
        icon: <FlightTakeoffOutlinedIcon />,
      },
    ],
  },
];

type SideBarItemsProps = {
  open: boolean;
  handleDrawer: () => void;
};

const SideBarItems = ({ open, handleDrawer }: SideBarItemsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const drawerHandler = () => {
    if (isMobile) {
      handleDrawer();
    }
    return;
  };
  return (
    <>
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={drawerHandler}
            component={Link}
            to="/"
            selected={location.pathname === "/"}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              "&.Mui-selected": {
                background: `${theme.palette.gradient}!important`,
                color: "grey.100",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "inherit",
              }}
            >
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{
                opacity: open ? 1 : 0,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      {menuItems.map((section, sectionIndex) => (
        <Fragment key={sectionIndex}>
          <List
            subheader={null}
          >
            <ListSubheader />
            {section.items.map((item, itemIndex) => (
              <ListItem
                key={itemIndex}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={drawerHandler}
                  component={Link}
                  to={item.to}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&.Mui-selected": {
                      background: `${theme.palette.gradient}!important`,
                      color: `${grey[100]}`,
                    },
                  }}
                  selected={location.pathname === item.to}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Fragment>
      ))}
    </>
  );
};

export default SideBarItems;