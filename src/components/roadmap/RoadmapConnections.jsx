import React, { useEffect, useState } from "react";
import "./css/Roadmap.css";

const RoadmapConnections = ({ roadmap, blockRefs, expanded }) => {
  const [lines, setLines] = useState([]);

  const calculateLines = () => {
    const wrapper = document.querySelector(".roadmap-graph-wrapper");
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const newLines = [];

    roadmap.forEach((block) => {
      const targetEl = blockRefs.current[block.id];
      if (!targetEl) return;

      const targetRect = targetEl.getBoundingClientRect();

      block.dependsOn.forEach((depId) => {
        const sourceEl = blockRefs.current[depId];
        if (!sourceEl) return;

        const sourceRect = sourceEl.getBoundingClientRect();

        newLines.push({
          from: {
            x: sourceRect.left + sourceRect.width / 2 - wrapperRect.left,
            y: sourceRect.bottom - wrapperRect.top,
          },
          to: {
            x: targetRect.left + targetRect.width / 2 - wrapperRect.left,
            y: targetRect.top - wrapperRect.top,
          },
          optional: block.optional,
        });
      });
    });

    setLines(newLines);
  };

  useEffect(() => {
    calculateLines();

    
    window.addEventListener("resize", calculateLines);

    const observer = new ResizeObserver(() => {
      calculateLines();
    });

    const wrapper = document.querySelector(".roadmap-graph-wrapper");
    if (wrapper) observer.observe(wrapper);

    return () => {
      window.removeEventListener("resize", calculateLines);
      observer.disconnect();
    };
  }, [roadmap, blockRefs, expanded]);

  return (
    <svg className="roadmap-connections">
      {lines.map((line, idx) => (
        <path
          key={idx}
          d={`M${line.from.x},${line.from.y} C${line.from.x},${
            (line.from.y + line.to.y) / 2
          } ${line.to.x},${(line.from.y + line.to.y) / 2} ${line.to.x},${
            line.to.y
          }`}
          fill="none"
          stroke={line.optional ? "gray" : "var(--ifm-color-primary)"}
          strokeWidth="2"
          strokeDasharray={line.optional ? "4,4" : "0"}
        />
      ))}
    </svg>
  );
};

export default RoadmapConnections;
