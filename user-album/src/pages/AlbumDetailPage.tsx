import { Heading } from "../components/ui/heading"
import { PhotoGrid } from "../components/photos/PhotoGrig"
import { Button } from "../components/ui/button"
import { ArrowLeft, Upload } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Album, Picture, PictureDto } from "../api/client"
import { useApiClient } from "../contexts/ApiClientContext"
import { useEffect, useState } from "react"
import { AlbumDetails } from "../components/albums/AlbumDetails"

// export default function AlbumPage() {
//   const { id: albumId } = useParams<{ id: string }>()

//   // This would typically come from your database or API based on the albumId
// //   const album = {
// //     id: albumId ?? "",
// //     name:
// //       albumId === "album-1"
// //         ? "Food"
// //         : albumId === "album-2"
// //         ? "Travel"
// //         : albumId === "album-3"
// //         ? "Family"
// //         : "Nature",
// //     photoCount: 24,
// //     createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
// //   }

//   // This would typically come from your database or API
// //   const photos = Array.from({ length: 12 }).map((_, i) => ({
// //     id: `photo-${i}`,
// //     url: `/placeholder.svg?height=300&width=300&text=${album.name} ${i}`,
// //     title: `${album.name} Photo ${i}`,
// //     album: album.name,
// //     uploadedAt: new Date(Date.now() - i * 86400000).toISOString(),
// //   }))
//     const apiClient = useApiClient()
//     const token = "Bearer " + localStorage.getItem('token')
//     // const album = apiClient.albumById(7, token);
//   const photos: PictureDto[] = []
//   const [album, setAlbum] = useState<Album>()

//   useEffect(() => {
//     const fetchAlbum = async () => {
//       if (!albumId) return;
//       try {
//         const result = await apiClient.albumById(Number(albumId), token)
//         setAlbum(result)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     fetchAlbum()
//   }, [albumId])


//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex items-center gap-2">
//         <Link to="/dashboard/albums">
//           <Button variant="ghost" size="icon">
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//         </Link>
//         <Heading as="h1" size="2xl">
//           {album?.title} Album
//         </Heading>
//       </div>

//       <div className="flex items-center justify-between">
//         {/* <p className="text-muted-foreground">{album.photoCount} photos in this album</p> */}
//         <Link to="/dashboard/upload">
//           <Button>
//             <Upload className="mr-2 h-4 w-4" />
//             Add Photos
//           </Button>
//         </Link>
//       </div>

//       <PhotoGrid photos={photos} onDelete={()=>{}}/>
//     </div>
//   )
// }

// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { AlbumDetails } from "../components/albums/AlbumDetails"
// import { useApiClient } from "../contexts/ApiClientContext"
// import { Album, PictureDto } from "../api/client"

export default function AlbumPage() {
  const { id: albumId } = useParams<{ id: string }>()
  const apiClient = useApiClient()
  const token = "Bearer " + localStorage.getItem("token")

  const [album, setAlbum] = useState<Album | null>(null)
  const [photos, setPhotos] = useState<PictureDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!albumId) return

    const fetchAlbumDetails = async () => {
      try {
        const albumResponse = await apiClient.albumById(Number(albumId), token)
        // const picturesResponse = await apiClient.getPicturesByAlbumId(albumId, token)
        setAlbum(albumResponse)
        console.log(albumResponse)
        // setPhotos(albumResponse.pictures)
        setPhotos((albumResponse.pictures ?? []).map(p => {
          const dto = new PictureDto()
          dto.id = p.id
          dto.name = p.name
          dto.url = p.url
          dto.userId = p.userId
          dto.createdAt = p.createdAt
          dto.updatedAt = p.updatedAt
          dto.albumTitle = p.album?.title
          dto.base64ImageData = p.base64ImageData
          return dto
        }))
        
      } catch (error) {
        console.error("Error loading album:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbumDetails()
  }, [albumId])

//   while (loading) return <p>Loading...</p>
//   if (!album) return <p>Album not found</p>

//   return <AlbumDetails album={album} photos={photos} />
  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex items-center gap-2">
        <Link to="/dashboard/albums">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Heading as="h1" size="2xl">
          {album?.title} Album
        </Heading>
      </div>
*/}
    {/* תיאור האלבום בשורה חדשה מתחת לשם */}
    {/* {album?.description && (
      <p className="text-muted-foreground pl-9">{album.description}</p>
    )}  */}
      {/* <div className="flex items-center justify-between"> */}
        {/* <p className="text-muted-foreground">{album.photoCount} photos in this album</p> */}
        {/* <Link to="/dashboard/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Add Photos
          </Button>
        </Link> */}
      {/* </div> */}

      {/*<PhotoGrid photos={photos} onDelete={()=>{}}/>*/}
      <AlbumDetails album={album} photos={photos}/>
    </div>
  )
// return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{album.title}</h1>
//       <p className="text-muted-foreground mb-4">{album.description}</p>
  
//       <AlbumDetails album={album} photos={photos} />
//     </div>
//   )
}