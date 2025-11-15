"use client";
import React, { useEffect } from 'react'
import LoginForm from '@/components/login-form'
import { authClient } from '@/lib/auth-client'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'


const page = () => {
    const { data, isPending } = authClient.useSession()
    const router = useRouter()

    useEffect(() => {
        if (data?.session && data?.user) {
            router.push("/")
        }
    }, [data, router])

    if (isPending) {
        return
        <div className="flex flex-col items-center justify-center h-screen">
            <Spinner />
        </div>
    }

    return (
        <div>
            <LoginForm></LoginForm>
        </div >
    )
}

export default page