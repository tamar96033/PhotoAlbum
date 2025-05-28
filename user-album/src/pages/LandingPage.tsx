import { Button } from "../components/ui/button"
import { Heading } from "../components/ui/heading"
import { Link } from "react-router-dom"  // Change here
import { ArrowRight, Cloud, ImageIcon, Layers } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6" />
            <span className="text-xl font-bold">PhotoCloud</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/login">  {/* changed from href to to */}
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Heading as="h1" size="4xl" className="font-bold tracking-tighter">
                    AI-Powered Photo Albums in the Cloud
                  </Heading>
                  <p className="text-muted-foreground md:text-xl">
                    Upload your photos and let our AI automatically organize them into meaningful albums.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/albums/demo">
                    <Button size="lg" variant="outline">
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute left-0 top-0 h-72 w-72 rotate-6 rounded-2xl bg-gray-200 dark:bg-gray-800"></div>
                  <div className="absolute left-20 top-6 h-72 w-72 -rotate-6 rounded-2xl bg-gray-300 dark:bg-gray-700"></div>
                  <div className="absolute left-12 top-12 h-72 w-72 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <ImageIcon className="h-32 w-32 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted-foreground/20 px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need for Your Photos
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides a seamless experience for storing, organizing, and sharing your photos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <Cloud className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Cloud Storage</h3>
                <p className="text-center text-muted-foreground">
                  Securely store your photos in the cloud with AWS S3 technology.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <Layers className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI Categorization</h3>
                <p className="text-center text-muted-foreground">
                  Let our AI automatically organize your photos into meaningful albums.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <ImageIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="text-center text-muted-foreground">
                  Share your albums with friends and family with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6" />
            <span className="text-lg font-semibold">PhotoCloud</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PhotoCloud. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/terms" target="_blank" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link to="/privacy" target="_blank" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}