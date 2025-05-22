
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"
import { useApiClient } from "../../contexts/ApiClientContext"
import { Album } from "../../api/client"

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Album name must be at least 2 characters.",
    })
    .max(50, {
      message: "Album name must not exceed 50 characters.",
    }),
})

interface CreateAlbumDialogProps {
  children: React.ReactNode;
  onAlbumCreated: () => void; 
}

export function CreateAlbumDialog({ children, onAlbumCreated }: CreateAlbumDialogProps) {
  const [open, setOpen] = React.useState(false)
  const { toast } = useToast()
  const apiClient = useApiClient()
  const token = "Bearer " + localStorage.getItem('token')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // This would be replaced with your actual album creation logic
    console.log(values)
    var album = new Album ({title: values.name,})
            
    
    try {
        const response = await apiClient.createAlbum(token, album)
        console.log(response);
        onAlbumCreated()
    } catch (error) {
        console.log(error)
    }

    toast({
      title: "Album created",
      description: `Album "${values.name}" has been created.`,
    })

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription>Create a new album to organize your photos.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vacation 2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Album</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
