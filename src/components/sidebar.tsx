"use client";

import { isValidUniqueSelection } from "@/utils/reactflow";
import { FC, useEffect } from "react";
import {
  Viewport,
  useOnSelectionChange,
  useOnViewportChange,
  useReactFlow,
} from "reactflow";
import NodeProperties, { NodePropertiesProps } from "./node-properties";
import Toolbar from "./toolbar";

interface SidebarProps extends NodePropertiesProps {}

const Sidebar: FC<SidebarProps> = ({ activeNode, setActiveNode }) => {
  const reactFlow = useReactFlow();

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      if (!isValidUniqueSelection({ nodes, edges })) {
        return;
      } else {
        setActiveNode(nodes[0]);
      }
    },
  });

  useOnViewportChange({
    onStart: (viewport: Viewport) => {
      console.log("viewport", viewport);
      setActiveNode(null);
    },
  });

  useEffect(() => {
    reactFlow.setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === activeNode?.id) {
          return activeNode;
        }
        return node;
      });
    });
  }, [activeNode, reactFlow]);

  return activeNode ? (
    <NodeProperties activeNode={activeNode} setActiveNode={setActiveNode} />
  ) : (
    <Toolbar />
  );
};

export default Sidebar;
