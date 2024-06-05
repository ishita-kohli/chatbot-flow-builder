"use client";

import { isValidUniqueSelection } from "@/utils/reactflow";
import { FC, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
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

  return (
    <div className="bg-slate-50 flex flex-col gap-4 border-l border-black">
      <div className="border-b border-black p-2 flex items-center ">
        {activeNode ? (
          <>
            <button className="px-1 py-0.5" onClick={() => setActiveNode(null)}>
              <FiChevronLeft size={20} />
            </button>
            <h3 className="text-lg uppercase">Properties</h3>
          </>
        ) : (
          <h3 className="text-lg uppercase">Nodes</h3>
        )}
      </div>

      <div className="px-2">
        {activeNode ? (
          <NodeProperties
            activeNode={activeNode}
            setActiveNode={setActiveNode}
          />
        ) : (
          <Toolbar />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
