import { Link } from "react-router-dom"
import { Card, CardContent } from "../ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal, Edit, Trash, FolderOpen } from "lucide-react"
import { useToast } from "../ui/use-toast"
// import { formatDistanceToNow } from "date-fns"
import { Album } from "../../api/client"
import { useApiClient } from "../../contexts/ApiClientContext"

// interface Album {
//   id: string
//   name: string
//   coverImage: string
//   photoCount: number
//   createdAt: string
// }

interface AlbumGridProps {
    albums: Album[] | undefined,
    onAlbumDeleted :  () => void 
}

export function AlbumGrid({ albums, onAlbumDeleted }: AlbumGridProps) {
    const { toast } = useToast()
    const apiClient = useApiClient()
    const token = "Bearer " + localStorage.getItem('token')

    const handleRename = (album: Album) => {
        toast({
            title: "Album renamed",
            description: `${album.title} has been renamed.`,
        })
    }

    const handleDelete = async (album: Album) => {
        try {
            const response = await apiClient.deleteAlbumById(album.id ?? 0, token)
            console.log(response)
            onAlbumDeleted()
        } catch (error) {
            console.error(error)
        }
        toast({
            title: "Album deleted",
            description: `${album.title} has been deleted.`,
        })
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {albums?.map((album) => (
                <Card key={album.id} className="overflow-hidden">
                    <CardContent className="p-0">
                        <Link to={`/dashboard/albums/${album.id}`}>
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={"/placeholder.svg"}//album.coverImage ||album.pictures?[0].url ||
                                    alt={album.title}
                                    className="object-cover w-full h-full transition-all hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3">
                                    <h3 className="text-lg font-bold text-white">{album.title}</h3>
                                    {/* <p className="text-sm text-white/80">{album.photoCount} photos</p> */}
                                </div>
                            </div>
                        </Link>
                        <div className="flex items-center justify-between p-3">
                            <span className="text-xs text-muted-foreground">
                                {/* Created {formatDistanceToNow(new Date(album.createdAt), { addSuffix: true })} */}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link to={`/dashboard/albums/${album.id}`} className="flex items-center">
                                            <FolderOpen className="mr-2 h-4 w-4" />
                                            Open Album
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRename(album)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Rename
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(album)} className="text-red-500 focus:text-red-500">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}