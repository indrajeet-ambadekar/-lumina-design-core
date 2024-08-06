import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
const Tabs = ({ ...props }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  useEffect(() => {
    let _child = props.children.map((_child, i) => {
      return {
        _index: i,
        title: _child?.props?.title,
        _subTree: _child?.props?.children,
        isActive: _child?.props?.active || false,
        _id: _child?.props?.id || null
      };
    });
    setTabs(_child);
  }, []);
  const _handleTabChipClick = (index) => {
    setActiveTabIndex(index);
    let _tabs = tabs.map((_tab) => {
      return { ..._tab, isActive: _tab._index === index };
    });
    setTabs(_tabs);
  };
  return (
    <div
      className={[props.className || "", "lumina-tab-wrapper"].join(" ")}
      id={props.id || null}
    >
      <div
        className={[
          "lumina-tab-header",
          props.mode === "contained" ? "lumina-tab-header-contained" : ""
        ].join(" ")}
      >
        {tabs.map((_tab, i) => (
          <div
            key={i}
            className={[
              props.mode === "contained"
                ? "lumina-tab-chip-contained"
                : "lumina-tab-chip",
              _tab.isActive
                ? props.mode === "contained"
                  ? `lumina-active-contained-tab-chip active-tab-chip`
                  : `lumina-active-tab-chip active-tab-chip`
                : ""
            ].join(" ")}
            onClick={() => {
              _handleTabChipClick(i);
            }}
          >
            {_tab.title}
          </div>
        ))}
      </div>
      <div className="lumina-tab-cntnr">
        <div className={`lumina-tab`} id={tabs[activeTabIndex]?._id || null}>
          {tabs[activeTabIndex]?._subTree || ""}
        </div>
      </div>
    </div>
  );
};
const TabCard = ({ children }) => {
  return (
    <React.Fragment
      key={children}
      dangerouslySetInnerHTML={{ __html: children }}
    ></React.Fragment>
  );
};
export { Tabs, TabCard };
