import { Camera, Folder, Plus, Search, Settings, Upload, Eye } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold text-gray-900">PhotoAlbum</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-gray-900">
                Dashboard
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Albums
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Photos
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search photos..."
                className="w-64 pl-9 border-gray-200 focus:border-gray-400 focus:ring-0"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-1">Welcome back, John</h2>
          <p className="text-gray-600">Here's your photo collection overview</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-gray-200 hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Photos</p>
                  <p className="text-2xl font-semibold text-gray-900">1,247</p>
                </div>
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Albums</p>
                  <p className="text-2xl font-semibold text-gray-900">18</p>
                </div>
                <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Folder className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Storage Used</p>
                  <p className="text-2xl font-semibold text-gray-900">4.2 GB</p>
                </div>
                <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <div className="h-5 w-5 rounded bg-purple-600"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-2xl font-semibold text-gray-900">89</p>
                </div>
                <div className="h-10 w-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Upload className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Upload */}
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Photos</h3>
                  <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                    Drag and drop your photos here or click to browse your files
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">Choose Files</Button>
                    <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                      Create Album
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Albums */}
            <Card className="border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-900">Recent Albums</CardTitle>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Summer Vacation 2024", count: 127, updated: "2 days ago", color: "bg-blue-100" },
                    { name: "Wedding Photography", count: 89, updated: "1 week ago", color: "bg-pink-100" },
                    { name: "Nature Collection", count: 156, updated: "2 weeks ago", color: "bg-green-100" },
                    { name: "City Landscapes", count: 73, updated: "3 weeks ago", color: "bg-purple-100" },
                  ].map((album, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 ${album.color} rounded-xl flex items-center justify-center`}>
                          <Folder className="h-6 w-6 text-gray-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{album.name}</p>
                          <p className="text-sm text-gray-600">
                            {album.count} photos • {album.updated}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Storage Overview */}
            <Card className="border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900 mb-1">4.2 GB</div>
                    <div className="text-sm text-gray-600">of 15 GB used</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-900 h-2 rounded-full transition-all" style={{ width: "28%" }}></div>
                  </div>
                  <div className="text-center">
                    <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-50">
                  <Plus className="h-4 w-4 mr-3" />
                  New Album
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-50">
                  <Upload className="h-4 w-4 mr-3" />
                  Bulk Upload
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-50">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Uploaded 12 photos", time: "2 hours ago" },
                    { action: "Created new album", time: "1 day ago" },
                    { action: "Shared album", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-gray-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}








































// import { Heading } from "../components/ui/heading"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
// import { Button } from "../components/ui/button"
// import { Upload, ImageIcon, FolderOpen } from "lucide-react"
// import { Link } from "react-router-dom"

// export default function DashboardPage() {
//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex items-center justify-between">
//         <Heading as="h1" size="2xl">
//           Dashboard
//         </Heading>
//         <Link to="/dashboard/upload">
//           <Button>
//             <Upload className="mr-2 h-4 w-4" />
//             Upload Photos
//           </Button>
//         </Link>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
//             <ImageIcon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">127</div>
//             <p className="text-xs text-muted-foreground">+5 in the last 24 hours</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Albums</CardTitle>
//             <FolderOpen className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">8</div>
//             <p className="text-xs text-muted-foreground">Food, Travel, Family, and 5 more</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1.2 GB</div>
//             <p className="text-xs text-muted-foreground">of 5 GB (24% used)</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Recent Photos</CardTitle>
//             <CardDescription>Your most recently uploaded photos</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-2">
//               {[1, 2, 3, 4, 5, 6].map((i) => (
//                 <div key={i} className="overflow-hidden rounded-md">
//                   <img
//                     src={`/placeholder.svg?height=100&width=100&text=Photo ${i}`}
//                     alt={`Recent photo ${i}`}
//                     className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 text-center">
//               <Link to="/dashboard/photos">
//                 <Button variant="outline">View All Photos</Button>
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Your Albums</CardTitle>
//             <CardDescription>AI-categorized photo collections</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {["Food", "Travel", "Family", "Nature"].map((album) => (
//                 <div key={album} className="flex items-center justify-between rounded-md border p-2">
//                   <div className="flex items-center gap-2">
//                     <FolderOpen className="h-4 w-4" />
//                     <span>{album}</span>
//                   </div>
//                   <span className="text-xs text-muted-foreground">
//                     {Math.floor(Math.random() * 30) + 5} photos
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 text-center">
//               <Link to="/dashboard/albums">
//                 <Button variant="outline">Manage Albums</Button>
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }



















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


