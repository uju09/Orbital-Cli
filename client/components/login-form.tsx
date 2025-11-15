"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth-client'

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
      });
    } catch (error) {
      console.error('GitHub login error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-dark">
      <Card className="w-full max-w-md border border-gray-700 bg-black backdrop-blur">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
              Welcome back
            </h1>
            <p className="text-sm text-slate-400">
              Sign in to continue to your account
            </p>
          </div>

          <Button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full h-11 bg-black hover:bg-slate-900 text-slate-50 border border-slate-700"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                Signing in…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
                Continue with GitHub
              </span>
            )}
          </Button>

          <p className="text-center text-xs text-slate-500">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-slate-300">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-slate-300">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
