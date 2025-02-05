// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import SearchIcon from '@mui/icons-material/Search';
// import {
//   AppBar,
//   Button,
//   FormControl,
//   IconButton,
//   Menu,
//   MenuItem,
//   Select,
//   Toolbar,
//   Typography
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const StyledAppBar = styled(AppBar)({
//   backgroundColor: '#003B8F',
//   boxShadow: 'none',
// });

// const NavButton = styled(Button)({
//   color: 'white',
//   marginLeft: '16px',
//   '&:hover': {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
// });

// // Language mapping

// const languageCodes = {
//   'English': 'en',
//   'Hindi': 'hi',
//   'Gujarati': 'gu',
//   'Tamil': 'ta',
//   'Spanish': 'es'
// };

// // Initial translations object
// const initialTranslations = {
//   home: 'Home',
//   about: 'About',
//   services: 'Services',
//   products: 'Products',
//   contact: 'Contact',
//   loginSignup: 'Login/Signup'
// };

// // Translation service
// const translationService = {
//   async translateText(text, targetLanguage) {
//     const encodedParams = new URLSearchParams();
//     encodedParams.set('source_language', 'en');
//     encodedParams.set('target_language', targetLanguage);
//     encodedParams.set('text', text);

//     const options = {
//       method: 'POST',
//       url: 'https://text-translator2.p.rapidapi.com/translate',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'X-RapidAPI-Key': '49151666camsh662703b072bcb65p1ca7efjsn7eb32beb0162',
//         'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
//       },
//       data: encodedParams,
//     };

//     try {
//       const response = await axios.request(options);
//       return response.data.data.translatedText;
//     } catch (error) {
//       console.error('Translation error:', error);
//       throw error;
//     }
//   },

//   async translateTexts({ texts, targetLanguage }) {
//     try {
//       // Translate each text individually
//       const promises = texts.map(text =>
//         this.translateText(text, targetLanguage)
//       );

//       return await Promise.all(promises);
//     } catch (error) {
//       console.error('Error translating texts:', error);
//       throw error;
//     }
//   }
// };

// function Navbar() {
//   const [location, setLocation] = useState('Chennai');
//   const [language, setLanguage] = useState('English');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [translations, setTranslations] = useState(initialTranslations);
//   const [isTranslating, setIsTranslating] = useState(false);

//   const navigate = useNavigate();

//   const translateContent = async (newLanguage) => {
//     if (newLanguage === 'English') {
//       setTranslations(initialTranslations);
//       return;
//     }

//     setIsTranslating(true);
//     try {
//       // Extract the text values to translate
//       const textsToTranslate = Object.values(initialTranslations);
//       console.log('Texts to translate:', textsToTranslate);

//       const translatedTexts = await translationService.translateTexts({
//         texts: textsToTranslate,
//         targetLanguage: languageCodes[newLanguage]
//       });

//       console.log('Received translations:', translatedTexts);

//       if (translatedTexts) {
//         // Map the translated texts back to their original keys
//         const keys = Object.keys(initialTranslations);
//         const newTranslations = {};

//         translatedTexts.forEach((translation, index) => {
//           newTranslations[keys[index]] = translation || initialTranslations[keys[index]];
//         });

//         console.log('Final translations:', newTranslations);
//         setTranslations(newTranslations);
//       }
//     } catch (error) {
//       console.error('Translation failed:', error);
//       setTranslations(initialTranslations);
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   const handleLanguageChange = async (event) => {
//     const newLanguage = event.target.value;
//     setLanguage(newLanguage);
//     await translateContent(newLanguage);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogin = () => {
//     setAnchorEl(null);
//     navigate('/login');
//   };

//   const handleSignup = () => {
//     setAnchorEl(null);
//     navigate('/signup');
//   };

//   const getTranslatedText = (key) => {
//     return translations[key] || initialTranslations[key];
//   };

//   return (
//     <StyledAppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           <img src="/tractor-logo.png" alt="Tractors-24" height="40" />
//         </Typography>

//         <NavButton>{getTranslatedText('home')}</NavButton>
//         <NavButton>{getTranslatedText('about')}</NavButton>
//         <NavButton>{getTranslatedText('services')}</NavButton>
//         <NavButton>{getTranslatedText('products')}</NavButton>
//         <NavButton>{getTranslatedText('contact')}</NavButton>

//         <IconButton color="inherit">
//           <SearchIcon />
//         </IconButton>

//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <Select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             displayEmpty
//             sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
//           >
//             <MenuItem value="Chennai">Chennai</MenuItem>
//             <MenuItem value="Mumbai">Mumbai</MenuItem>
//             <MenuItem value="Delhi">Delhi</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <Select
//             value={language}
//             onChange={handleLanguageChange}
//             displayEmpty
//             disabled={isTranslating}
//             sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
//           >
//             <MenuItem value="Spanish">Spanish</MenuItem>
//             <MenuItem value="English">English</MenuItem>
//             <MenuItem value="Hindi">Hindi</MenuItem>
//             <MenuItem value="Tamil">Tamil</MenuItem>
//             <MenuItem value="Gujarati">Gujarati</MenuItem>
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           color="inherit"
//           startIcon={<PersonOutlineIcon />}
//           endIcon={<KeyboardArrowDownIcon />}
//           onClick={handleMenu}
//           sx={{
//             bgcolor: 'white',
//             color: '#003B8F',
//             borderRadius: '20px',
//             '&:hover': { bgcolor: '#f5f5f5' },
//           }}
//         >
//           {getTranslatedText('loginSignup')}
//         </Button>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleLogin}>Login</MenuItem>
//           <MenuItem onClick={handleSignup}>Sign Up</MenuItem>
//         </Menu>
//       </Toolbar>
//     </StyledAppBar>
//   );
// }

// export default Navbar;

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import SearchIcon from '@mui/icons-material/Search';
// import {
//   AppBar,
//   Button,
//   CircularProgress,
//   FormControl,
//   IconButton,
//   Menu,
//   MenuItem,
//   Select,
//   Toolbar,
//   Typography
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLanguage } from '../utils/langaugeContext';

// const StyledAppBar = styled(AppBar)({
//   backgroundColor: '#003B8F',
//   boxShadow: 'none',
// });

// const NavButton = styled(Button)({
//   color: 'white',
//   marginLeft: '16px',
//   '&:hover': {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
// });

// // Language mapping
// const languageCodes = {
//   'English': 'en',
//   'Hindi': 'hi',
//   'Gujarati': 'gu',
//   'Tamil': 'ta',
//   'Spanish': 'es'
// };

// function Navbar() {
//   const [location, setLocation] = useState('Chennai');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();

//   // Use the language context
//   const { language, changeLanguage, isTranslating } = useLanguage();

//   const handleLanguageChange = async (event) => {
//     const newLanguage = event.target.value;
//     await changeLanguage(newLanguage);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogin = () => {
//     setAnchorEl(null);
//     navigate('/login');
//   };

//   const handleSignup = () => {
//     setAnchorEl(null);
//     navigate('/signup');
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   return (
//     <StyledAppBar position="static">
//       <Toolbar>
//         {/* Logo */}
//         <Typography
//           variant="h6"
//           sx={{
//             flexGrow: 1,
//             cursor: 'pointer'
//           }}
//           onClick={() => handleNavigate('/')}
//         >
//           <img src="/tractor-logo.png" alt="Tractors-24" height="40" />
//         </Typography>

//         {/* Navigation Buttons */}
//         <NavButton onClick={() => handleNavigate('/')}>Home</NavButton>
//         <NavButton onClick={() => handleNavigate('/about')}>About</NavButton>
//         <NavButton onClick={() => handleNavigate('/services')}>Services</NavButton>
//         <NavButton onClick={() => handleNavigate('/products')}>Products</NavButton>
//         <NavButton onClick={() => handleNavigate('/contact')}>Contact</NavButton>

//         {/* Search Icon */}
//         <IconButton color="inherit">
//           <SearchIcon />
//         </IconButton>

//         {/* Location Selector */}
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <Select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             displayEmpty
//             sx={{
//               color: 'white',
//               '& .MuiSelect-icon': { color: 'white' },
//               '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
//               '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
//             }}
//           >
//             <MenuItem value="Chennai">Chennai</MenuItem>
//             <MenuItem value="Mumbai">Mumbai</MenuItem>
//             <MenuItem value="Delhi">Delhi</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Language Selector */}
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <Select
//             value={language}
//             onChange={handleLanguageChange}
//             displayEmpty
//             disabled={isTranslating}
//             sx={{
//               color: 'white',
//               '& .MuiSelect-icon': { color: 'white' },
//               '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
//               '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
//             }}
//           >
//             <MenuItem value="English">English</MenuItem>
//             <MenuItem value="Hindi">Hindi</MenuItem>
//             <MenuItem value="Tamil">Tamil</MenuItem>
//             <MenuItem value="Gujarati">Gujarati</MenuItem>
//             <MenuItem value="Spanish">Spanish</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Loading Indicator */}
//         {isTranslating && (
//           <CircularProgress
//             size={20}
//             sx={{ ml: 1, color: 'white' }}
//           />
//         )}

//         {/* Login/Signup Button */}
//         <Button
//           variant="contained"
//           color="inherit"
//           startIcon={<PersonOutlineIcon />}
//           endIcon={<KeyboardArrowDownIcon />}
//           onClick={handleMenu}
//           sx={{
//             bgcolor: 'white',
//             color: '#003B8F',
//             borderRadius: '20px',
//             ml: 2,
//             '&:hover': { bgcolor: '#f5f5f5' },
//           }}
//         >
//           Login/Signup
//         </Button>

//         {/* Login/Signup Menu */}
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleLogin}>Login</MenuItem>
//           <MenuItem onClick={handleSignup}>Sign Up</MenuItem>
//         </Menu>
//       </Toolbar>
//     </StyledAppBar>
//   );
// }

// export default Navbar;

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/langaugeContext';
import EMICalculator from './EmiCalculator';
import ReferralDashboard from './Referral';
import SellerForm from './user/SellerForm';
import LoanInquiry from './user/LoanInquiry';
import InsuranceInquiry from './user/InsuranceInquiry';
import logo from '../images/LOGOT.png';

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#116978",
  boxShadow: "none",
});

const NavButton = styled(Button)({
  color: "white",
  marginLeft: "16px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

function Navbar() {
  const [location, setLocation] = useState("Chennai");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEmiCalculator, setShowEmiCalculator] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showLoan, setshowLoan] = useState(false);
  const [showInsurance, setshowInsurance] = useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [showSellerForm, setShowSellerForm] = useState(false);

  const navigate = useNavigate();
  const { language, translations, changeLanguage, isTranslating } =
    useLanguage();

  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    await changeLanguage(newLanguage);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setAnchorEl(null);
    navigate("/login");
  };

  const handleSignup = () => {
    setAnchorEl(null);
    navigate("/signup");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Close all open components
  const closeAllComponents = () => {
    setShowEmiCalculator(false);
    setShowReferral(false);
    setShowSellerForm(false);
    setshowLoan(false);
    setshowInsurance(false);
  };

  // Handle component toggles
  const handleEmiCalculator = () => {
    closeAllComponents();
    setShowEmiCalculator(!showEmiCalculator);
  };

  const handleReferral = () => {
    closeAllComponents();
    setShowReferral(!showReferral);
  };

  const handleSellerForm = () => {
    closeAllComponents();
    setShowSellerForm(!showSellerForm);
  };
  const handleLoanForm = () => {
    closeAllComponents();
    setshowLoan(!showLoan);
  };

  const handleInsuranceForm = () => {
    closeAllComponents();
    setshowInsurance(!showInsurance);
  };
  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleCustomerInquiry = () => {
    setMoreAnchorEl(null);
    // Add your customer inquiry logic here
    navigate("/customer-inquiry");
  };

  const handleDealershipInquiry = () => {
    setMoreAnchorEl(null);
    // Add your dealership inquiry logic here
    navigate("/dealership-inquiry");
  };
  return (
    <Box>
      <StyledAppBar position="static">
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => handleNavigate('/')}
          >
  <img 
    src={logo} 
    alt="Tractors-24" 
    style={{ 
      maxHeight: '60px', // Adjust as per your design 
      width: 'auto',
      margin: '0 auto', // Center horizontally if needed
    }} 
  /> 
          </Typography>

          {/* Navigation Buttons
          <NavButton onClick={() => handleNavigate('/')}>
            {translations.home}
          </NavButton>
          <NavButton onClick={() => handleNavigate('/about')}>
            {translations.about}
          </NavButton>
          <NavButton onClick={() => handleNavigate('/services')}>
            {translations.services}
          </NavButton>
          <NavButton onClick={() => handleNavigate('/products')}>
            {translations.products}
          </NavButton>
          <NavButton onClick={() => handleNavigate('/contact')}>
            {translations.contact}
          </NavButton> */}

          {/* Search Icon */}
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>

          {/* Location Selector */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              displayEmpty
              sx={{
                color: 'white',
                '& .MuiSelect-icon': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              }}
            >
              <MenuItem value="Chennai">{translations.chennai}</MenuItem>
              <MenuItem value="Mumbai">{translations.mumbai}</MenuItem>
              <MenuItem value="Delhi">{translations.delhi}</MenuItem>
            </Select>
          </FormControl>

          {/* Language Selector */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              displayEmpty
              disabled={isTranslating}
              sx={{
                color: 'white',
                '& .MuiSelect-icon': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              }}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
              <MenuItem value="Tamil">Tamil</MenuItem>
              <MenuItem value="Gujarati">Gujarati</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </Select>
          </FormControl>

          {/* Loading Indicator */}
          {isTranslating && (
            <CircularProgress size={20} sx={{ ml: 1, color: "white" }} />
          )}

          {/* Login/Signup Button */}
          <Button
            variant="contained"
            color="inherit"
            startIcon={<PersonOutlineIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleMenu}
            sx={{
              bgcolor: "white",
              color: "#116978",
              borderRadius: "20px",
              ml: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            {translations.loginSignup}
          </Button>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogin}>{translations.login}</MenuItem>
            <MenuItem onClick={handleSignup}>{translations.signup}</MenuItem>
          </Menu>
        </Toolbar>

        {/* Secondary Navigation */}
        <Box
          sx={{
            bgcolor: 'white',
            py: 1,
            display: "flex",
            overflowX: "auto",
          }}
        >
          <Container>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                sx={{ color: "#116978" }}
                onClick={handleSellerForm}
              >
                {translations.sellTractor}
              </Button>
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ color:"#116978" }}
              >
                {translations.auction}
              </Button>
              <Button
                sx={{ color: "#116978" }}
                onClick={handleLoanForm}
              >
                {translations.applyLoan}
              </Button>

              <Button
                sx={{ color: "#116978" }}
                onClick={handleEmiCalculator}
              >
                {translations.emiCalculator}
              </Button>
              <Button
                sx={{ color: "#116978" }}
                onClick={handleReferral}
              >
                {translations.referCustomer}
              </Button>
              <Button
                name='insurance'
                sx={{ color: "#116978" }}
                onClick={handleInsuranceForm}
              >
                {translations.Insurance}
              </Button>
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ color:"#116978" }}
                onClick={handleMoreClick}
              >
                {translations.more}
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#116978",
                  color: 'white',
                  '&:hover': { bgcolor: '#168d91' }
                }}
              >
                {translations.payLoanEmi}
              </Button>
            </Box>
          </Container>
        </Box>
      </StyledAppBar>
      {/* Component Rendering Section */}
      <Box sx={{ position: "relative", zIndex: 1100 }}>
        {showEmiCalculator && (
          <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 3,
            mt: 0,
            width: '100%'
          }}>
            <Container maxWidth="lg">
              <EMICalculator onClose={() => setShowEmiCalculator(false)} />
            </Container>
          </Box>
        )}

        {showReferral && (
          <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 3,
            mt: 0,
            width: '100%'
          }}>
            <Container maxWidth="lg">
              <ReferralDashboard onClose={() => setShowReferral(false)} />
            </Container>
          </Box>
        )}

        {showSellerForm && (
          <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 3,
            mt: 0,
            width: '100%'
          }}>
            <Container maxWidth="lg">
              <SellerForm onClose={() => setShowSellerForm(false)} />
            </Container>
          </Box>
        )}
        {showLoan && (
          <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 3,
            mt: 0,
            width: '100%'
          }}>
            <Container maxWidth="lg">
              <LoanInquiry onClose={() => setshowLoan(false)} />
            </Container>

          </Box>
        )}
        {showInsurance && (
          <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 3,
            mt: 0,
            width: '100%'
          }}>
            <Container maxWidth="lg">
              <InsuranceInquiry onClose={() => setshowInsurance(false)} />
            </Container>

          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
