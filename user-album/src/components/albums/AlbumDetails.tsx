import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PhotoGrid } from "../photos/PhotoGrig"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ArrowLeft, MoreHorizontal, Edit, Trash, Download } from "lucide-react"
import { useToast } from "../ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Heading } from "../ui/heading"
import { PictureDto } from "../../api/client"

interface AlbumDetailsProps {
  album: {
    id: string
    name: string
    photoCount: number
    createdAt: string
  }
  photos: PictureDto[]
//   photos: Array<{
//     id: string
//     url: string
//     title: string
//     album: string
//     uploadedAt: string
//   }>
}

export function AlbumDetails({ album, photos }: AlbumDetailsProps) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleRename = () => {
    toast({
      title: "Album renamed",
      description: `${album.name} has been renamed.`,
    })
  }

  const handleDelete = () => {
    toast({
      title: "Album deleted",
      description: `${album.name} has been deleted.`,
    })
    navigate("/dashboard/albums")
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Downloading ${album.name} album as a ZIP file.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/albums")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Heading as="h1" size="2xl">
            {album.name}
          </Heading>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleRename}>
              <Edit className="mr-2 h-4 w-4" />
              Rename Album
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Album
            </DropdownMenuItem>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    setIsDeleteDialogOpen(true)
                  }}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Album
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the "{album.name}" album and remove it from your albums list. The
                    photos will remain in your library.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-muted-foreground">
        {album.photoCount} photos • Created {new Date(album.createdAt).toLocaleDateString()}
      </div>

      <PhotoGrid photos={photos} onDelete={()=>{handleDelete()}}/>
    </div>
  )
}