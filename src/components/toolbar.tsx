"use client";

import { FC } from "react";
import { nodeMetadata, nodeTypes } from "./nodes";

interface ToolbarProps {}

const Toolbar: FC<ToolbarProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4 px-2">
      <h3 className="text-2xl uppercase">Toolbar</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(nodeTypes).map((nodeType) => {
          return (
            <NodeCard
              key={nodeType}
              nodeType={nodeType}
              {...nodeMetadata[nodeType as keyof typeof nodeMetadata]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;

function NodeCard({
  nodeType,
  label,
  icon,
}: {
  nodeType: string;
  label: string;
  icon: JSX.Element;
}) {
  // fired when dragging starts
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    // updating the data to be transferred so that we can recognize the type of node being dragged
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, nodeType)}
      className="node-item flex bg-white items-center flex-col gap-2 border border-blue-600 rounded-md w-36 px-6 py-1 cursor-pointer hover:bg-gray-100"
    >
      <p className="text-2xl text-blue-600">{icon}</p>

      <p className="text-sm text-blue-600">
        {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
      </p>
    </div>
  );
}
