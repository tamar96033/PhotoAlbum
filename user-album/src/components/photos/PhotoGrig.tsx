import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal, Download, Trash } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { PictureDto } from "../../api/client"
import { useApiClient } from "../../contexts/ApiClientContext"
// async function downloadFile(url: string, fileName: string) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Network response was not ok');
//     const blob = await response.blob();

//     downloadFile(blob, fileName);
//   } catch (error) {
//     console.error('Download failed:', error);
//   }
//   // try {
//   //   const response = await fetch(url);

//   //   if (!response.ok) {
//   //     throw new Error('Failed to fetch file from S3');
//   //   }

//     // const blob = await response.blob();
//     // const downloadUrl = window.URL.createObjectURL(blob);

//     // const a = document.createElement('a');
//     // a.href = downloadUrl;
//     // a.download = fileName;
//     // document.body.appendChild(a);
//     // a.click();
//     // a.remove();

//     // window.URL.revokeObjectURL(downloadUrl);
//   // } catch (error) {
//   //   console.error('Download error:', error);
//   // }
// }
interface PhotoGridProps {
  photos: PictureDto[];
  onDelete: (photo: PictureDto) => void;
}

function saveBlobToFile(blob: Blob, filename: string) {
  console.log('on saveBlobToFile function');
  
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

async function downloadFile(url: string, filename: string) {
  try {
    console.log('on downloadFile function')
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();

    saveBlobToFile(blob, filename);
  } catch (error) {
    console.error('Download failed:', error);
  }
}
function extractKeyFromUrl(url: string, bucketName: string): string {
  const prefix = `https://${bucketName}.s3.us-east-1.amazonaws.com/`;
  if (url.startsWith(prefix)) {
    return url.substring(prefix.length);
  }
  return url; // fallback אם כבר מפתח
}

export function PhotoGrid({ photos, onDelete }: PhotoGridProps) {
  const { toast } = useToast()
  const [selectedPhoto, setSelectedPhoto] = useState<PictureDto | null>(null)
  const apiClient = useApiClient()
  const token = "Bearer " + localStorage.getItem('token')

  const handleDownload = async (photo: PictureDto) => {
   console.log('on handledownload')
    toast({
      title: "Download started",
      description: `Downloading ${photo.name}...`,
    })

    
  // await downloadFile(photo.url!, photo?.name ?? "");
  const key = extractKeyFromUrl(photo.url ?? "", "photo-alum-tamar-testpnoren");
    const response = await apiClient.presignedUrl(key, token)
    console.log(response);
    
    const url = response.url
    await downloadFile(url, photo?.name ?? "")
  }

  // const handleDelete = async (photo: PictureDto) => {
  //   toast({
  //     title: "Photo deleted",
  //     description: `${photo.name} has been deleted.`,
  //   })
  //   try {
  //     const result = await apiClient.pictureDELETE(photo.id ?? 0, token)
  //     console.log(result);      
  //   } catch (error) {
  //     console.log('there is an error');      
  //   }
  // }

  // const handleMoveToAlbum = (photo: PictureDto) => {
  //   toast({
  //     title: "Photo moved",
  //     description: `${photo.name} has been moved to a different album.`,
  //   })
  // }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.name}
                  className="object-cover w-full h-full cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedPhoto(photo)}
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 text-white hover:bg-black/70">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(photo)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem onClick={() => handleMoveToAlbum(photo)}>
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Move to Album
                      </DropdownMenuItem> */}
                      <DropdownMenuItem onClick={() => onDelete(photo)} className="text-red-500 focus:text-red-500">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="p-2">
                <div className="text-sm font-medium truncate">{photo.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">{photo.albumTitle ?? "unknown"}</span>
                  <span className="text-xs text-muted-foreground">
                    {photo.createdAt ? formatDistanceToNow(new Date(photo.createdAt), { addSuffix: true })
                    : "Unknown time"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPhoto?.name}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full">
            {selectedPhoto && (
              <img
                src={selectedPhoto.url || "/placeholder.svg"}
                alt={selectedPhoto.name}
                className="object-contain w-full h-full"
              />
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              {/* <p className="text-sm font-medium">Album: {selectedPhoto?.album}</p> */}
              <p className="text-xs text-muted-foreground">
                {/* Uploaded {selectedPhoto && formatDistanceToNow(new Date(selectedPhoto.uploadedAt), { addSuffix: true })} */}
                Uploaded 2 days ago.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => selectedPhoto && handleDownload(selectedPhoto)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (selectedPhoto) {
                    onDelete(selectedPhoto)
                    setSelectedPhoto(null)
                  }
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}