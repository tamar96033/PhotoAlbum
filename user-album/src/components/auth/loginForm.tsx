import * as React from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"
import { useApiClient } from "../../contexts/ApiClientContext"
import { LoginUserDto } from "../../api/client"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be null.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
})

export function LoginForm() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const apiClient = useApiClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      console.log(values)
      const body = new LoginUserDto();
      body.name = values.name ?? "";
      body.password = values.password ?? "";

      const result = await apiClient.login(body);
      console.log('result', result)
      localStorage.setItem('token', result.token)

      toast({
        title: "Success",
        description: "You have successfully logged in.",
      })

      navigate("/dashboard")
    } catch (error) {
      console.log(error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  )
}
