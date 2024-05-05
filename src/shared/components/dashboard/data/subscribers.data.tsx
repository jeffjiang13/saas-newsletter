'use client';
import useSubscribersData from "@/shared/hooks/useSubscribersData";
import { format } from "timeago.js";
import { Box, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SubscribersData = () => {
  const { data, loading } = useSubscribersData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: isMobile },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "createdAt",
      headerName: "Subscribed At",
      flex: 1, // Increased flex or use minWidth
      minWidth: 300, // Set a minimum width for the date
    },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
  ];

  const mobileLayout = () => (
    <Box sx={{
      margin: 0,
      padding: '8px',
      overflowY: 'auto',
      height: 'calc(100vh - 90px)', // Adjusted for potential padding and toolbar height
      width: '100%'
    }}>
      {data.map((subscriber: subscribersDataTypes) => (
        <Paper key={subscriber._id} elevation={2} sx={{
          marginBottom: '4px', // consistent spacing between items
          padding: '20px'
        }}>
          <div><strong>ID:</strong> {subscriber._id}</div>
          <div><strong>Email:</strong> {subscriber.email}</div>
          <div><strong>Subscribed At:</strong> {format(subscriber.createdAt)}</div>
          <div><strong>Status:</strong> {subscriber.status}</div>
          <div><strong>Source:</strong> {subscriber.source}</div>
        </Paper>
      ))}
    </Box>
  );

  return (
    <Box sx={{
      m: 2,
      height: '100%',
      overflow: 'hidden' // Ensure the main container does not itself scroll
    }}>
      {isMobile ? (
        mobileLayout()
      ) : (
        <Box sx={{
          height: '80vh', // Consistent with desktop view
          '& .MuiDataGrid-root': { border: "none" }
        }}>
          <DataGrid
            checkboxSelection
            rows={data.map((subscriber:subscribersDataTypes) => ({
              id: subscriber._id,
              email: subscriber.email,
              createdAt: subscriber.createdAt,
              status: subscriber.status,
              source: subscriber.source,
            }))}
            columns={columns}
            autoHeight
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Box>
  );
}

export default SubscribersData;
