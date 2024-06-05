import { FC } from "react";
import Header from "./header";
import NodeEditor from "./node-editor";
import Toolbar from "./toolbar";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <div className="w-screen h-screen bg-white">
      <Header />
      <div className="grid grid-cols-[3fr_1fr]">
        <NodeEditor />
        <Toolbar />
      </div>
    </div>
  );
};

export default Dashboard;
