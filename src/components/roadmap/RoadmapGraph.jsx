import React, { useState, useRef, useEffect } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import roadmap from "./data/roadmap";
import RoadmapBlock from "./RoadmapBlock";
import RoadmapConnections from "./RoadmapConnections";
import "./css/Roadmap.css";
import { useProgress } from '../../hooks/useProgress';

function isBlockCompleted(block) {
  const progress = useProgress();
  return block.modules.every((m) => progress[m.id] === "completed");
}

function assignLevels(blocks) {
  const map = {};
  blocks.forEach((block) => {
    map[block.id] = block;
  });

  const levels = {};

  function dfs(block) {
    if (levels[block.id] !== undefined) return levels[block.id];
    if (!block.dependsOn || block.dependsOn.length === 0) {
      levels[block.id] = 0;
    } else {
      const depLevels = block.dependsOn.map((depId) => {
        if (!map[depId]) {
          console.warn(`Missing dependency: ${depId}`);
          return 0;
        }
        return dfs(map[depId]);
      });
      levels[block.id] = Math.max(...depLevels) + 1;
    }
    return levels[block.id];
  }

  blocks.forEach((b) => dfs(b));
  return levels;
}

const RoadmapGraph = () => {
  const [expanded, setExpanded] = useState(null);
  const { colorMode } = useColorMode();
  const blockRefs = useRef({});

  const containerRef = useRef(null); // 👈 roadmap-container
  const scalerRef = useRef(null); // 👈 roadmap-scaler
  const [scale, setScale] = useState(1); // 👈 scaling state

  const blockStatusMap = {};
  roadmap.forEach((block) => {
    blockStatusMap[block.id] = isBlockCompleted(block);
  });

  const levels = assignLevels(roadmap);
  const grouped = {};

  roadmap.forEach((block) => {
    const level = levels[block.id];
    if (!grouped[level]) grouped[level] = [];
    grouped[level].push(block);
  });

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !scalerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const parentWidth = scalerRef.current.offsetWidth;

      if (containerWidth > parentWidth) {
        const newScale = Math.min(1, parentWidth / containerWidth);
        setScale(newScale);
      } else {
        setScale(1); // reset
      }
    };

    handleResize(); // call once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="roadmap-graph-wrapper" style={{ position: "relative" }}>
      <div className={clsx("roadmap-container", colorMode)}>
        {Object.keys(grouped)
          .sort((a, b) => Number(a) - Number(b))
          .map((level) => (
            <div key={level} className="roadmap-row">
              {grouped[level].map((block) => (
                <RoadmapBlock
                  key={block.id}
                  block={block}
                  isExpanded={expanded === block.id}
                  toggleExpand={toggleExpand}
                  isLocked={block.dependsOn.some((dep) => !blockStatusMap[dep])}
                  blockRefs={blockRefs} // 👈 Pass this down
                />
              ))}
            </div>
          ))}
      </div>
      <RoadmapConnections
        roadmap={roadmap}
        blockRefs={blockRefs}
        expanded={expanded}
      />
    </div>
  );
};

export default RoadmapGraph;
