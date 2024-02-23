import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background md:p-10 md:shadow-md">
      <div className="h-full rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <div className="container relative grid h-full flex-col items-center justify-center rounded-l-lg lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 flex items-center justify-center rounded-l-lg bg-zinc-900" />
            <div className="relative z-20 my-auto flex items-center justify-center text-lg font-medium">
              <Image
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                width={600}
                height={600}
                alt="Sample image"
              />
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
