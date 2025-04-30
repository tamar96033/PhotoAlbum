import { Box, Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        bgcolor: '#f5f7fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 10,
        px: 2,
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h3" fontWeight="bold" color="primary" mb={2}>
          ברוכה הבאה ל־MomentsAI
        </Typography>
        <Typography variant="h6" mb={4}>
          ניהול ושיתוף אלבומי משפחה עם עיבוד תמונות חכם
        </Typography>

        {!isLoggedIn ? (
          <Stack spacing={2} alignItems="center">
            <KeyboardArrowUpIcon
  sx={{
    fontSize: 40,
    color: 'gray',
    animation: 'bounce 2s infinite',
    '@keyframes bounce': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    }
  }}
/>
            <Typography variant="body1" color="text.secondary">
              להתחברות או הרשמה השתמשי בתפריט למעלה
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={2} justifyContent="center">
            <Button variant="contained" onClick={() => navigate('/albums')}>
              הצג את האלבומים שלי
            </Button>
            <Button variant="outlined" onClick={() => navigate('/pictures')}>
              תמונות אחרונות
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

// import { Box, Typography, Stack, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// const HomePage = () => {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false)

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsLoggedIn(Boolean(token));
//     }, []);

//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 minHeight: '100%',
//                 bgcolor: '#f5f7fa',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 py: 10,
//                 px: 2,
//                 textAlign: 'center',
//             }}
//         >
//             <Box>
//                 <Typography variant="h3" fontWeight="bold" color="primary" mb={2}>
//                     ברוכה הבאה ל־MomentsAI
//                 </Typography>
//                 <Typography variant="h6" mb={4}>
//                     ניהול ושיתוף אלבומי משפחה עם עיבוד תמונות חכם
//                 </Typography>
//                 {!isLoggedIn ? (
//                     <Stack spacing={2} alignItems="center">
//                         <KeyboardArrowUpIcon sx={{ fontSize: 40, color: 'gray' }} />
//                         <Typography variant="body1" color="text.secondary">
//                             להתחברות או הרשמה השתמשי בתפריט למעלה
//                         </Typography>
//                         ) : (
//                         <Stack spacing={2} justifyContent="center">
//                             <Button variant="contained" onClick={() => navigate('/albums')}>
//                                 הצג את האלבומים שלי
//                             </Button>
//                             <Button variant="outlined" onClick={() => navigate('/pictures')}>
//                                 תמונות אחרונות
//                             </Button>
//                         </Stack>)}
//         )}

//                     </Box>
//       </Box>
//             );
// }
//             export default HomePage