import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";

// 1️⃣ Custom styled tooltip
const CustomTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#333", // tooltip background color
    color: "#fff", // tooltip text color
    fontSize: "14px",
    borderRadius: "8px",
    padding: "8px 12px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#333", // arrow color matches background
  },
}));

// 2️⃣ Tooltip dictionary
const tooltips: Record<string, string> = {
  API: "Active Pharmaceutical Ingredient – main component",
  Excipient: "Inactive substance used as a carrier",
  Generic: "Same active ingredients as branded medicine",
};

// 3️⃣ Convert children to plain string
function getText(children: any): string {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getText).join("");
  if (typeof children === "object" && children.props?.children)
    return getText(children.props.children);
  return "";
}

// 4️⃣ Wrap text with tooltips
function wrapTooltips(text: string) {
  if (!text) return null;
  const regex = new RegExp(`\\b(${Object.keys(tooltips).join("|")})\\b`, "g");
  return text.split(regex).map((part, i) =>
    tooltips[part] ? (
      <CustomTooltip key={i} title={tooltips[part]} arrow>
        <span
          style={{
            textDecoration: "underline dashed",
            color: "#1976d2",
            fontWeight: 500,
            cursor: "pointer",
            padding: "0 2px",
          }}
        >
          {part}
        </span>
      </CustomTooltip>
    ) : (
      part
    )
  );
}

// 5️⃣ Markdown component
export default function MarkdownWithTooltips({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p>{wrapTooltips(getText(children))}</p>,
        strong: ({ children }) => (
          <strong>{wrapTooltips(getText(children))}</strong>
        ),
        em: ({ children }) => <em>{wrapTooltips(getText(children))}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
