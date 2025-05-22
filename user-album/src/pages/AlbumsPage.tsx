import { Heading } from "../components/ui/heading"
import { AlbumGrid } from "../components/albums/AlbumGrid"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"
import { CreateAlbumDialog } from "../components/albums/CreateAlbumDialog"
import { useEffect, useState } from "react"
import { Album } from "../api/client"
import { useApiClient } from "../contexts/ApiClientContext"

export default function AlbumsPage() {
  // This would typically come from your database or API
//   const albums = [
//     {
//       id: "album-1",
//       name: "Food",
//       coverImage: "/placeholder.svg?height=300&width=300&text=Food",
//       photoCount: 24,
//       createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
//     },
//     {
//       id: "album-2",
//       name: "Travel",
//       coverImage: "/placeholder.svg?height=300&width=300&text=Travel",
//       photoCount: 42,
//       createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
//     },
//     {
//       id: "album-3",
//       name: "Family",
//       coverImage: "/placeholder.svg?height=300&width=300&text=Family",
//       photoCount: 18,
//       createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
//     },
//     {
//       id: "album-4",
//       name: "Nature",
//       coverImage: "/placeholder.svg?height=300&width=300&text=Nature",
//       photoCount: 31,
//       createdAt: new Date(Date.now() - 120 * 86400000).toISOString(),
//     },
//   ]

    const [albums, setAlbums] = useState<Album[]>()
    const apiClient = useApiClient()
    const token = "Bearer " + localStorage.getItem('token')

    const fetchAlbums = async () => {
        const result = await apiClient.albumsByUser(token);
        setAlbums(result);
      };
      
      useEffect(() => {
        fetchAlbums();
      }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading as="h1" size="2xl">
          Albums
        </Heading>
        <CreateAlbumDialog onAlbumCreated={fetchAlbums}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Album
          </Button>
        </CreateAlbumDialog>
      </div>
      <AlbumGrid albums={albums} onAlbumDeleted={fetchAlbums}/>
    </div>
  )
}

//from once..........
// // import UploadFolder from "../components/UploadAlbum"
// import AddAlbum from "../components/albums2/AddAlbum"

// const AlbumsPage = () => {
    
//     return(<>on albums page
//     {/* <UploadFolder/> */}
//     <AddAlbum/>
//     </>)
// }

// export default AlbumsPage