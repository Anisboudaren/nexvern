

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex flex-col items-center gap-2 self-center font-medium">
          <div className=" text-primary-foreground flex size-20 items-center justify-center rounded-md">
            <img src="/logo-purple.png" alt="" />
          </div>
         
        </a>
        <h1 className="text-3xl font-bold text-center mt-8">You are logged in</h1>  
      </div>
    </div>
  )
}
