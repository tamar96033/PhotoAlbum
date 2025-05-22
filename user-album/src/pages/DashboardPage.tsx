import { Heading } from "../components/ui/heading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Upload, ImageIcon, FolderOpen } from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading as="h1" size="2xl">
          Dashboard
        </Heading>
        <Link to="/dashboard/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5 in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Albums</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Food, Travel, Family, and 5 more</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 GB</div>
            <p className="text-xs text-muted-foreground">of 5 GB (24% used)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Photos</CardTitle>
            <CardDescription>Your most recently uploaded photos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden rounded-md">
                  <img
                    src={`/placeholder.svg?height=100&width=100&text=Photo ${i}`}
                    alt={`Recent photo ${i}`}
                    className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/dashboard/photos">
                <Button variant="outline">View All Photos</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Albums</CardTitle>
            <CardDescription>AI-categorized photo collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Food", "Travel", "Family", "Nature"].map((album) => (
                <div key={album} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    <span>{album}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 30) + 5} photos
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/dashboard/albums">
                <Button variant="outline">Manage Albums</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



















// import { Box, Typography, Stack, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import DashboardLayout from "../components/dashboard/DashboardLayout";

// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const loggedIn = Boolean(token);
//     setIsLoggedIn(loggedIn);

//     // אם לא מחובר, נווט ל-login
//     // if (!loggedIn) {
//     //   navigate('/login', { replace: true });
//     // }
//   }, [navigate]);


//   return (
//     <DashboardLayout>
//       this is in the dashboard layout
//     </DashboardLayout>
//     // <Box
// //       sx={{
// //         width: '100%',
// //         minHeight: '100%',
// //         bgcolor: '#f5f7fa',
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         py: 10,
// //         px: 2,
// //         textAlign: 'center',
// //       }}
// //     >
// //       <Box>
// //         <Typography variant="h3" fontWeight="bold" color="primary" mb={2}>
// //           ברוכה הבאה ל־MomentsAI
// //         </Typography>
// //         <Typography variant="h6" mb={4}>
// //           ניהול ושיתוף אלבומי משפחה עם עיבוד תמונות חכם
// //         </Typography>

// //         {!isLoggedIn ? (
// //           <Stack spacing={2} alignItems="center">
// //             <KeyboardArrowUpIcon
// //   sx={{
// //     fontSize: 40,
// //     color: 'gray',
// //     animation: 'bounce 2s infinite',
// //     '@keyframes bounce': {
// //       '0%, 100%': { transform: 'translateY(0)' },
// //       '50%': { transform: 'translateY(-10px)' },
// //     }
// //   }}
// // />
// //             <Typography variant="body1" color="text.secondary">
// //               להתחברות או הרשמה השתמשי בתפריט למעלה
// //             </Typography>
// //           </Stack>
// //         ) : (
// //           <Stack spacing={2} justifyContent="center">
// //             <Button variant="contained" onClick={() => navigate('/albums')}>
// //               הצג את האלבומים שלי
// //             </Button>
// //             <Button variant="outlined" onClick={() => navigate('/pictures')}>
// //               תמונות אחרונות
// //             </Button>
// //           </Stack>
// //         )}
// //       </Box>
// //     </Box>
//   );
// };

// export default DashboardPage;

// // import { Box, Typography, Stack, Button } from "@mui/material";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// // const HomePage = () => {
// //     const navigate = useNavigate();
// //     const [isLoggedIn, setIsLoggedIn] = useState(false)

// //     useEffect(() => {
// //         const token = localStorage.getItem('token');
// //         setIsLoggedIn(Boolean(token));
// //     }, []);

// //     return (
// //         <Box
// //             sx={{
// //                 width: '100%',
// //                 minHeight: '100%',
// //                 bgcolor: '#f5f7fa',
// //                 display: 'flex',
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 py: 10,
// //                 px: 2,
// //                 textAlign: 'center',
// //             }}
// //         >
// //             <Box>
// //                 <Typography variant="h3" fontWeight="bold" color="primary" mb={2}>
// //                     ברוכה הבאה ל־MomentsAI
// //                 </Typography>
// //                 <Typography variant="h6" mb={4}>
// //                     ניהול ושיתוף אלבומי משפחה עם עיבוד תמונות חכם
// //                 </Typography>
// //                 {!isLoggedIn ? (
// //                     <Stack spacing={2} alignItems="center">
// //                         <KeyboardArrowUpIcon sx={{ fontSize: 40, color: 'gray' }} />
// //                         <Typography variant="body1" color="text.secondary">
// //                             להתחברות או הרשמה השתמשי בתפריט למעלה
// //                         </Typography>
// //                         ) : (
// //                         <Stack spacing={2} justifyContent="center">
// //                             <Button variant="contained" onClick={() => navigate('/albums')}>
// //                                 הצג את האלבומים שלי
// //                             </Button>
// //                             <Button variant="outlined" onClick={() => navigate('/pictures')}>
// //                                 תמונות אחרונות
// //                             </Button>
// //                         </Stack>)}
// //         )}

// //                     </Box>
// //       </Box>
// //             );
// // }
// //             export default HomePage


