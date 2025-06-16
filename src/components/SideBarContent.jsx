import React from "react";
import {
  List, ListSubheader,
  ListItemButton, ListItemIcon, ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import {
  IHome, IDownload, ISettings,
  IChevron, IChevronRight
} from "../icons";
import IceHoverIcon from "./IceHoverIcon";

const nav = [
  { label: "Dashboard",  path: "/",        icon: IHome },
  { label: "Data scraper", path: "/scraper", icon: IDownload },
  {
    label: "Instellingen",
    icon: ISettings,
    children: [
      { label: "Profiel",  path: "/profile" },
      { label: "Systeem",  path: "/settings" },
    ],
  },
];

export default function SidebarContent({ expanded, onNavigate }) {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState({});

  const toggle = (label) =>
    setOpen((s) => ({ ...s, [label]: !s[label] }));

  const renderItem = (item, depth = 0) => {
    const active = pathname === item.path;
    const IconCmp = item.icon;

    return (
      <Tooltip
        key={item.label}
        title={!expanded ? item.label : ""}
        placement="right"
        arrow
      >
        <ListItemButton
          component={item.path ? Link : "button"}
          to={item.path}
          onClick={item.children ? () => toggle(item.label) : onNavigate}
          selected={active}
          sx={{
            pl: 2 + depth * 2,
            borderRadius: 2,
            my: 0.5,
            ...(active && {
              bgcolor: "rgba(0,207,255,.1)",
            }),
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
              {IconCmp && (
                <IceHoverIcon active={active} size={20}>
                  <IconCmp size={18} />
                </IceHoverIcon>
              )}
          </ListItemIcon>

          {expanded && (
            <>
              <ListItemText primary={item.label} sx={{ fontSize: 14 }} />
              {item.children &&
                (open[item.label] ? (
                  <IChevron size={16} />
                ) : (
                  <IChevronRight size={16} />
                ))}
            </>
          )}
        </ListItemButton>
      </Tooltip>
    );
  };

  return (
    <List
      disablePadding
      subheader={
        expanded && (
          <ListSubheader
            component="div"
            sx={{ lineHeight: "32px", fontWeight: 700 }}
          >
            Care First
          </ListSubheader>
        )
      }
    >
      {nav.map((item) =>
        item.children ? (
          <React.Fragment key={item.label}>
            {renderItem(item)}
            <Collapse in={open[item.label] && expanded} timeout="auto">
              {item.children.map((sub) => renderItem(sub, 1))}
            </Collapse>
          </React.Fragment>
        ) : (
          renderItem(item)
        )
      )}
    </List>
  );
}
