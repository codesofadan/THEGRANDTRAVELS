import {
  Box,
  Stack,
  Button,
} from "@mui/material";
import StatBox from "../components/home/StatBox";
import Header from "../components/ui/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Metric {
  title: string;
  subtitle: string;
  progress: number;
  increase: string;
  chartData: { name: string; value: number }[];
}

const HomePage = () => {
  const [selectedChart, setSelectedChart] = useState<number | null>(null);

  const metricsData: Metric[] = [
    {
      title: "Today’s Queries",
      subtitle: "20",
      progress: 30,
      increase: "2%",
      chartData: [{ name: 'Today', value: 20 }, { name: 'Yesterday', value: 18 }],
    },
    {
      title: "Total Queries Received",
      subtitle: "1,200",
      progress: 80,
      increase: "15%",
      chartData: [{ name: 'Jan', value: 100 }, { name: 'Feb', value: 200 }, { name: 'Mar', value: 300 }],
    },
    {
      title: "Pending Queries",
      subtitle: "300",
      progress: 50,
      increase: "5%",
      chartData: [{ name: 'Jan', value: 50 }, { name: 'Feb', value: 60 }, { name: 'Mar', value: 70 }],
    },
    {
      title: "Assigned Queries",
      subtitle: "600",
      progress: 70,
      increase: "10%",
      chartData: [{ name: 'Jan', value: 150 }, { name: 'Feb', value: 160 }, { name: 'Mar', value: 170 }],
    },
    {
      title: "Resolved Queries",
      subtitle: "900",
      progress: 90,
      increase: "20%",
      chartData: [{ name: 'Jan', value: 200 }, { name: 'Feb', value: 220 }, { name: 'Mar', value: 240 }],
    },
    {
      title: "Total Bookings Confirmed",
      subtitle: "500",
      progress: 85,
      increase: "25%",
      chartData: [{ name: 'Jan', value: 50 }, { name: 'Feb', value: 55 }, { name: 'Mar', value: 60 }],
    },
    {
      title: "Pending Bookings",
      subtitle: "100",
      progress: 40,
      increase: "8%",
      chartData: [{ name: 'Jan', value: 10 }, { name: 'Feb', value: 12 }, { name: 'Mar', value: 14 }],
    },
    {
      title: "Total Agents",
      subtitle: "50",
      progress: 100,
      increase: "0%",
      chartData: [{ name: 'Jan', value: 5 }, { name: 'Feb', value: 5 }, { name: 'Mar', value: 5 }],
    },
    {
      title: "Client Response Rate",
      subtitle: "85%",
      progress: 85,
      increase: "5%",
      chartData: [{ name: 'Jan', value: 80 }, { name: 'Feb', value: 82 }, { name: 'Mar', value: 85 }],
    },
    {
      title: "Average Query Resolution Time",
      subtitle: "2h 30m",
      progress: 70,
      increase: "10%",
      chartData: [{ name: 'Jan', value: 2.5 }, { name: 'Feb', value: 2.4 }, { name: 'Mar', value: 2.3 }],
    },
  ];

  const handleChartToggle = (index: number) => {
    setSelectedChart(selectedChart === index ? null : index);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        mb="40px"
        alignItems="start"
      >
        <Header title="Dashboard" description="Welcome to your dashboard" />
        <Button
          size="medium"
          variant="contained"
          sx={{ alignSelf: "end" }}
          startIcon={<DownloadOutlinedIcon />}
        >
          Reports
        </Button>
      </Box>
      <Stack direction="column" spacing={1} ml={-2} mr={2} mt={-2}>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {metricsData.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StatBox
                title={metric.title}
                subtitle={metric.subtitle}
                icon={<DownloadOutlinedIcon />}
                value={metric.progress}
                increase={metric.increase}
                up={true}
              />
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleChartToggle(index)}
                sx={{ mt: 2 }}
              >
                {selectedChart === index ? "Hide Chart" : "Show Chart"}
              </Button>
              {selectedChart === index && (
                <Box mt={2} height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metric.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default HomePage;