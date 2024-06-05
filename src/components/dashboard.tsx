import { FC } from "react";
import Header from "./header";
import NodeEditor from "./node-editor";
import NodeProperties from "./node-properties";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <div className="w-screen h-screen bg-white">
      <Header />
      <div className="grid grid-cols-[3fr_1fr]">
        <NodeEditor />
        <NodeProperties />
      </div>
    </div>
  );
};

export default Dashboard;
