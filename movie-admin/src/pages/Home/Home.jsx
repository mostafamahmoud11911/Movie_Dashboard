import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import Chart from "../../components/Chart/Chart";
import UserTable from "../../components/UserTable/UserTable";



export default function Home() {




  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 6 }}>
        <Navbar />
        <Box p={2}>
          <FeaturedInfo />
          <Chart />
          <UserTable />
        </Box>
      </Box>
    </Box>
  );
}
