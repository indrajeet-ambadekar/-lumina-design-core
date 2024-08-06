import React from "react";
import "./index.scss";
import ChevronRightIcon from "../../assets/icons/ChevronRight";
export default ({ ...props }) => {
  const { crumbs, className, crumbClassName, style, id } = props;
  if (!Array.isArray(crumbs)) {
    throw new Error(
      `Crumbs to Breadcrumb are required in the form of an array`
    );
  }
  return (
    <div
      className={[className || "", "lumina-breadcrumb"].join(" ")}
      id={id || null}
      style={style || {}}
    >
      {crumbs.map((crumb, i) => (
        <div
          key={i}
          className={[crumbClassName || "", "lumina-breadcrumb-crumb"].join(
            " "
          )}
          onClick={crumb.onClick}
        >
          <span className={`lumina-breadcrumb-label`}>
            <span>{crumb.label}</span>
          </span>
          <span className={`lumina-breadcrumb-chevron`}>
            {i < crumbs.length - 1 ? <ChevronRightIcon /> : ""}
          </span>
        </div>
      ))}
    </div>
  );
};
