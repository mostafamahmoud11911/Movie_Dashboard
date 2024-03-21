import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



export default function Chart() {

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  // get data chart
  const getStats = async () => {
    try {
      const { data } = await axios.get(`https://api-cmuv.onrender.com/api/users/stats`);
      const sortData = data.sort((a, b) => a._id - b._id);
      sortData.map(item => setUserStats((prev)=>[...prev,{name: MONTHS[item._id -1], "NEW USER": item.total}]))
    } catch (error) {
      console.log("first");
    }
  };

  useEffect(() => {
    getStats();
  }, [MONTHS]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">Chart</Typography>
      <Box
        sx={{ p: 2, bgcolor: "#fff", borderRadius: "5px", marginTop: "10px" }}
      >
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart
            width={500}
            height={300}
            data={userStats}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />

            <Line type="monotone" dataKey="NEW USER" stroke="#3F4D67" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
