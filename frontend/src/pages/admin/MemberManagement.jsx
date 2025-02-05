// components/Admin/MemberManagement.jsx
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';
import AddMemberForm from './AddMember';
import UpdateMemberForm from './UpdateMemberForm';

const MemberManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Member Management
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Add New Member" />
          <Tab label="Update Existing Member" />
        </Tabs>
      </Paper>

      {activeTab === 0 ? <AddMemberForm /> : <UpdateMemberForm />}
    </Box>
  );
};

export default MemberManagement;