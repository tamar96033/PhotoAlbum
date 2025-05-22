import { Heading } from "../components/ui/heading"
import { PhotoGrid } from "../components/photos/PhotoGrig"
import { Button } from "../components/ui/button"
import { Upload } from "lucide-react"
import { Link } from "react-router-dom"
import { ApiClient, PictureDto } from "../api/client"
import { useApiClient } from "../contexts/ApiClientContext"
import { useEffect, useState } from "react"

export default function PhotosPage() {
  // const photos = Array.from({ length: 20 }).map((_, i) => ({
  //   id: `photo-${i}`,
  //   url: `/placeholder.svg?height=300&width=300&text=Photo ${i}`,
  //   title: `Photo ${i}`,
  //   album: i % 3 === 0 ? "Food" : i % 3 === 1 ? "Travel" : "Nature",
  //   uploadedAt: new Date(Date.now() - i * 86400000).toISOString(),
  // }))
  const [photos, setPhotos] = useState<PictureDto[]>([]);
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient()
  const token = "Bearer " + localStorage.getItem('token')

  
  const handleDelete = async (photo: PictureDto) => {
    try {
      await apiClient.pictureDELETE(photo.id ?? 0, token);
      await fetchPhotos(); // Refresh the photo list
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  
    async function fetchPhotos() {
      try {
        const result = await apiClient.picturesByUser(2, token!);
        // const photos2: PictureDto[] = result.map((dto) => ({
        //   id: dto.id,
        //   url: dto.url,
        //   title: dto.name,
        //   // album: dto.albumName,
        //   // uploadedAt: dto.createdAt,
        // }));

        setPhotos(result);
        setPhotos(result);
      } catch (error) {
        console.error("Failed to load photos", error);
      } finally {
        setLoading(false);
      }
    }

    
  useEffect(() => {
    fetchPhotos();
  }, [token]);


  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading as="h1" size="2xl">
          All Photos
        </Heading>
        <Link to="/dashboard/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </Button>
        </Link>
      </div>
      <PhotoGrid photos={photos} onDelete={handleDelete} />
      {/* {loading ? (
  <p>Loading photos...</p>
) : (
  <PhotoGrid photos={photos} />
)} */}
    </div>
  )
}