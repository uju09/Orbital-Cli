"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

export default function Home() {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!data?.session && !data?.user) {
      router.push("/sign-in")
    }
  }, [data, router])

  if (isPending) {
    return
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner />
    </div>
  }

  return (
    <div className="min-h-screen w-full bg-black text-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-black/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">ORBITAL</span>
            </div>
            <div className="flex items-center gap-4 ">
              <span className="text-sm text-slate-400">{data?.user.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => authClient.signOut()}
                className="text-slate-300 hover:text-slate-50 hover:bg-slate "
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main dashboard */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-slate-400">Welcome back, {data?.user.name ?? data?.user.email}.</p>
        </div>

        {/* Quick stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:border-slate-500 bg-black">
            <CardContent className="p-6">
              <p className="text-sm text-slate-400">Account status</p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">Active</p>
            </CardContent>
          </Card>
          <Card className="hover:border-slate-500 bg-black">
            <CardContent className="p-6">
              <p className="text-sm text-slate-400">Member since</p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">
                {new Date(data?.user.createdAt ?? 0).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-slate-500 bg-black">
            <CardContent className="p-6">
              <p className="text-sm text-slate-400">User ID</p>
              <p className="mt-2 text-sm font-mono text-slate-50">{data?.user.id}</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity placeholder */}
        <Card className="mt-6 hover:border-slate-500 bg-black">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-slate-50">Recent activity</h2>
            <p className="mt-4 text-sm text-slate-400">No activity yet. Check back soon!</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
