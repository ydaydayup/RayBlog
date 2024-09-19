import Link from "@docusaurus/Link";
import React from "react";

export const ShowHtml = ({href, name = ""}) => {
  return (
    <div style={{
      position: "relative",
      // height: "auto",
      height: "100%",
      width: "100%"
    }}>
      <div>
        <Link href={href}>{name}</Link>
      </div>
      <iframe
        width="100%"
        height="100%"
        src={href}
        style={{height: "100%", width: "100%", display: "block"}}
      ></iframe>
    </div>
  )
};
