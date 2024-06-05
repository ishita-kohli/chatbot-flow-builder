import { AiOutlineMessage } from "react-icons/ai";
import type { NodeTypes } from "reactflow";
import MessageNode from "./message-node";

export const nodeTypes = {
  message: MessageNode,
} satisfies NodeTypes;

export const nodeMetadata = {
  message: {
    label: "Message",
    icon: <AiOutlineMessage />,
  },
};
