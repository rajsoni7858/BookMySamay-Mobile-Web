import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ items, path }) => {
  return (
    <Breadcrumb
      separator=">"
      items={items}
      style={{ marginBottom: "1rem" }}
      itemRender={(route, params, routes, paths) => {
        const isFirst = routes.indexOf(route) === 0;
        const isLast = routes.indexOf(route) === routes.length - 1;
        return isFirst ? (
          <Link to={path}>{route.title}</Link>
        ) : (
          <span style={{ color: isLast && "#1c4792" }}>{route.title}</span>
        );
      }}
    />
  );
};

export default CustomBreadcrumb;
