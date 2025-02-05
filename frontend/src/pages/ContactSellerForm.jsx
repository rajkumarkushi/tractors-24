import React, { useState ,useMemo} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
  Grid,
  Divider,
  CircularProgress,
  Slide,
  Alert,
  styled,
} from "@mui/material";
import {
  Close as CloseIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import axios from "axios";
import tractor1 from "../images/Tractor_listing1.png";
import tractor2 from "../images/Tractor_listing2.png";
import tractor3 from "../images/Tractor_listing3.png";
import tractor4 from "../images/Tractor4.png";
const tractorImages = [tractor1, tractor2, tractor3, tractor4];

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    padding: theme.spacing(2),
    maxWidth: 500,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ContactSellerForm = ({ open, onClose, tractor }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pincode: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const randomTractor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * tractorImages.length);
    return tractorImages[randomIndex];
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/inquiries/add",
        {
          tractorId: tractor.id,
          ...formData,
        }
      );

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          pincode: "",
          message: "",
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={loading ? null : onClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      fullWidth
    >
      <Box sx={{ position: "relative" }}>
        {/* Header */}
        <DialogTitle sx={{ pb: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="bold">
              Contact Seller
            </Typography>
            {!loading && (
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>

        {/* Tractor Details */}
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <img
                  src={
                    tractor?.randomTractor?.[0] || "/tractor-placeholder.png"
                  }
                  alt={tractor?.name}
                  style={{
                    width: "100%",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" gutterBottom>
                  {tractor?.brand} {tractor?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tractor?.district}, {tractor?.state}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹ {tractor?.sellPrice} Lakh*
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Enquiry submitted successfully!
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Email Address (Optional)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <LocationIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Message (Optional)"
                  name="message"
                  multiline
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <SecurityIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Your information is safe with us
              </Typography>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "View Seller Details"
                )}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </StyledDialog>
  );
};

export default ContactSellerForm;
