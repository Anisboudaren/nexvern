/* eslint-disable @next/next/no-img-element */

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex  flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex flex-col items-center gap-2 self-center font-medium">
          <div className=" text-primary-foreground flex size-20 items-center justify-center rounded-md">
            <img src="/logo-purple.png" alt="" />
          </div>
         
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
