import React, { useState } from "react";
import { Box, Typography, Button, TextField, Grid, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"; // For Profile Icon
import PolicyIcon from "@mui/icons-material/Policy"; // For Policies Icon
import CameraAltIcon from "@mui/icons-material/CameraAlt"; // For the camera icon

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile"); // Active tab state
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Display the selected image
    }
  };

  // Tabs List with Icons
  const tabs = [
    { name: "Profile", icon: <PersonIcon sx={{ fontSize: 20, marginRight: 1 }} /> },
    { name: "Policies", icon: <PolicyIcon sx={{ fontSize: 20, marginRight: 1 }} /> },
  ];

  // Render dynamic content based on active tab
  const renderContent = () => {
    if (activeTab === "Profile") {
      return (
        <Box>
          {/* Profile Section */}
          <Box display="flex" alignItems="center" mb={3}>
            <Box position="relative" mr={2}>
              <Box
                sx={{
                  width: 120, // Fixed width
                  height: 120, // Fixed height
                  borderRadius: "50%", // Circular frame
                  overflow: "hidden", // Ensure image doesn't overflow the frame
                  border: "2px solid #116978", // Optional border around the profile picture
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Ensures the image fills the frame without distortion
                    }}
                  />
                ) : (
                  <PersonIcon sx={{ fontSize: 60, color: "#116978", marginLeft: "29px", marginTop: "29px" }} />
                )}
              </Box>
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#116978",
                  color: "#000",
                }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                />
                <CameraAltIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: "bold" }}>
              Update Your Profile
            </Typography>
          </Box>

          {/* Profile Form */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                required
                type="tel"
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                required
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                required
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                required
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                required
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pin Code"
                variant="outlined"
                fullWidth
                required
                sx={{
                  backgroundColor: "#fff",
                  input: { color: "#1e293b" },
                  label: { color: "#64748b" },
                }}
              />
            </Grid>
          </Grid>

          {/* Update Profile Button */}
          <Box mt={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#116978",
                color: "white",
                "&:hover": {
                  backgroundColor: '#168d91',
                },
              }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      );
    } else if (activeTab === "Policies") {
        return (
          <Box>
            <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: "bold", mb: 2 }}>
              Policies
            </Typography>
      
            <Box mb={3}>
              <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: "bold" }}>
                Privacy Policy
              </Typography>
              <Typography sx={{ color: "#1e293b", marginBottom: 1 }}>
                We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines the types of information we collect, how we use it, and your rights regarding that information.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                1. **Data Collection**: We collect personal information such as your name, email address, and phone number for account creation and service improvement.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                2. **Data Usage**: Your data will be used to personalize your experience, send notifications, and improve our services. We do not sell or share your data with third parties without your consent.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                3. **Data Security**: We use industry-standard security measures to protect your data from unauthorized access.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                4. **Your Rights**: You have the right to access, modify, or delete your personal data at any time. Contact us for assistance with any of these requests.
              </Typography>
            </Box>
      
            <Box mb={3}>
              <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: "bold" }}>
                Terms of Service
              </Typography>
              <Typography sx={{ color: "#1e293b", marginBottom: 1 }}>
                By using our services, you agree to abide by the following terms and conditions:
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                1. **User Responsibilities**: You agree to use the platform for lawful purposes only. Any violation of this agreement may result in account termination.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                2. **Account Security**: You are responsible for maintaining the confidentiality of your account details and for all activities under your account.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                3. **Service Availability**: We strive to provide uninterrupted service, but we do not guarantee that our platform will always be available or error-free.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                4. **Modifications**: We reserve the right to update or modify the terms of service at any time. You will be notified of any significant changes.
              </Typography>
            </Box>
      
            <Box mb={3}>
              <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: "bold" }}>
                Refund & Cancellation Policy
              </Typography>
              <Typography sx={{ color: "#1e293b", marginBottom: 1 }}>
                1. **Refund Eligibility**: Refunds are eligible only if the service is not delivered as promised or if there was an error on our part.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                2. **Cancellation**: You may cancel services at any time before delivery. After that, cancellations will not be processed.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                3. **Processing Time**: Refund requests will be processed within 10 business days after review.
              </Typography>
            </Box>
      
            <Box mb={3}>
              <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: "bold" }}>
                Cookie Policy
              </Typography>
              <Typography sx={{ color: "#1e293b", marginBottom: 1 }}>
                We use cookies to enhance user experience, analyze website traffic, and serve personalized advertisements. By using our services, you agree to our use of cookies.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                1. **What are Cookies?** Cookies are small text files stored on your device to remember your preferences and enhance your browsing experience.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                2. **How We Use Cookies**: We use cookies to remember your login details, track your preferences, and analyze site traffic to improve our services.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                3. **Managing Cookies**: You can manage your cookie preferences through your browser settings. However, disabling cookies may affect some functionality of our website.
              </Typography>
            </Box>
      
            <Box mb={3}>
              <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: "bold" }}>
                Terms for Service Providers
              </Typography>
              <Typography sx={{ color: "#1e293b", marginBottom: 1 }}>
                1. **Service Agreement**: All service providers are required to enter into a service agreement that outlines the scope of work, compensation, and timelines.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                2. **Service Standards**: Service providers must meet the agreed-upon service standards and comply with all applicable laws and regulations.
              </Typography>
              <Typography sx={{ color: "#1e293b" }}>
                3. **Non-Compete**: Service providers may not engage in activities that directly compete with the services offered by our platform during the course of the agreement.
              </Typography>
            </Box>
          </Box>
    
      );
    }
    return (
      <Typography sx={{ color: "#1e293b" }}>
        {activeTab} content will be displayed here.
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9fafb", // Light background color
        height: "100vh",
        padding: "20px",
      }}
    >
      {/* Top Navigation */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          borderBottom: "2px solid #e2e8f0", // Light border color
          pb: 2,
        }}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            sx={{
              color: activeTab === tab.name ? "#116978" : "#1e293b", // Active tab color
              fontWeight: activeTab === tab.name ? "bold" : "normal",
              textTransform: "uppercase",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#f3f4f6", // Light hover effect
              },
            }}
          >
            {tab.icon || null} {tab.name}
          </Button>
        ))}
      </Box>

      {/* Dynamic Content */}
      {renderContent()}
    </Box>
  );
};

export default Settings;
