import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Link, useLocation, matchPath } from "react-router-dom";

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function Navbar() {
  const routeMatch = useRouteMatch(["/", "currencies/"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Конвертер валют" value="/" component={Link} to="/" />
      <Tab
        label="Курсы валют"
        value="currencies/"
        component={Link}
        to="currencies/"
      />
    </Tabs>
  );
}
