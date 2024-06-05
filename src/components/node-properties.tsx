"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Node, useReactFlow } from "reactflow";

export interface NodePropertiesProps {
  activeNode: Node | null;
  setActiveNode: React.Dispatch<React.SetStateAction<Node | null>>;
}

const NodeProperties: FC<NodePropertiesProps> = ({
  activeNode,
  setActiveNode,
}) => {
  return (
    <div className="border rounded-sm py-3 px-2">
      {activeNode && (
        <>
          {activeNode.type === "message" && (
            <MessageEditor
              activeNode={activeNode}
              setActiveNode={setActiveNode}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NodeProperties;

function MessageEditor({ activeNode, setActiveNode }: NodePropertiesProps) {
  const [message, setMessage] = useState<string>(activeNode?.data.message);
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);
  const reactFlow = useReactFlow();

  const handleActiveNodeChange = (message: string) => {
    if (!activeNode) {
      return;
    }
    const latestNodeInstance = reactFlow.getNode(activeNode.id);
    const updatedNodeObj = {
      ...latestNodeInstance,
      data: {
        ...latestNodeInstance?.data,
        message,
      },
    };
    // @ts-ignore-next-line
    setActiveNode(updatedNodeObj);
  };

  useEffect(() => {
    setMessage(activeNode?.data.message);
  }, [activeNode?.data.message]);

  useEffect(() => {
    if (inputMessageRef.current) {
      inputMessageRef.current.focus();
    }
  }, [activeNode]);

  return (
    <div>
      <form className="flex flex-col gap-4">
        <label htmlFor="message-input">Message Text</label>
        <textarea
          ref={inputMessageRef}
          className="outline-none border rounded-md p-1 focus:border-blue-600"
          id="message-input"
          placeholder="Enter message"
          value={message}
          onChange={(event) => {
            handleActiveNodeChange(event.target.value); // for node in reactflow
          }}
        />
      </form>
    </div>
  );
}
