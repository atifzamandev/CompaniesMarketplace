'use client'

import { login, signUp } from '@/app/lib/actions/auth'
import { FolderGit2, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { loginWithProvider } from '../app/lib/authActions'
import SubmitButton from './SubmitButton'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const initialState = {
  message: '',
  errors: {},
  success: false,
}

interface LoginButtonProps {
  onLoginSuccess?: () => void
}

export default function LoginButton({ onLoginSuccess }: LoginButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [signupState, signupAction] = useActionState(signUp, initialState)
  const [loginState, loginAction] = useActionState(login, initialState)

  useEffect(() => {
    if (loginState.success) {
      setIsOpen(false)
      onLoginSuccess?.()
      router.refresh()
    }

    if (signupState.success) {
      setTimeout(() => {
        setIsOpen(false)
        router.refresh()
      }, 3000)
    }
  }, [loginState.success, signupState.success, router, onLoginSuccess])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='px-4 py-2 bg-white text-blue-900 rounded'
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-gray-100'>
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Choose how you would like to continue
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue='social'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger
              value='social'
              className=' bg-green-400 text-black rounded-lg hover:bg-gree-500'
            >
              Social Login
            </TabsTrigger>
            <TabsTrigger
              value='email'
              className=' bg-blue-400 text-white rounded-lg hover:bg-blue-500'
            >
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value='social' className='space-y-4'>
            <Button
              variant='outline'
              className='w-full py-2 mb-3 bg-red-500 text-white rounded-lg hover:bg-red-600'
              onClick={() => loginWithProvider('google')}
            >
              <Mail className='size-12 text-white' />
              Continue with Google
            </Button>
            <Button
              variant='outline'
              className='w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900'
              onClick={() => loginWithProvider('github')}
            >
              <FolderGit2 className='size-12 text-white' />
              Continue with GitHub
            </Button>
          </TabsContent>

          <TabsContent value='email' className='space-y-4'>
            <Tabs defaultValue='login'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger
                  value='login'
                  className=' bg-blue-900 text-white rounded-lg hover:bg-blue-500'
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value='signup'
                  className=' bg-blue-900 text-white rounded-lg hover:bg-blue-500'
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value='login' className='space-y-4'>
                <form action={loginAction} className='space-y-4'>
                  {loginState?.message && (
                    <p
                      className={`text-sm ${
                        loginState.success ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {loginState.message}
                    </p>
                  )}

                  <div className='space-y-2'>
                    <Label htmlFor='login-email'>Email</Label>
                    <Input
                      id='login-email'
                      name='email'
                      type='email'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='login-password'>Password</Label>
                    <Input
                      id='login-password'
                      name='password'
                      type='password'
                      required
                    />
                  </div>

                  <SubmitButton>Login</SubmitButton>
                </form>
              </TabsContent>

              <TabsContent value='signup' className='space-y-4'>
                <form action={signupAction} className='space-y-4'>
                  {signupState?.message && (
                    <div
                      className={`p-3 rounded-md ${
                        signupState.success
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      {signupState.message}
                    </div>
                  )}

                  <div className='space-y-2'>
                    <Label htmlFor='signup-name'>Full Name</Label>
                    <Input id='signup-name' name='name' required />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='signup-email'>Email</Label>
                    <Input
                      id='signup-email'
                      name='email'
                      type='email'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='signup-password'>Password</Label>
                    <Input
                      id='signup-password'
                      name='password'
                      type='password'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='signup-phone'>Phone</Label>
                    <Input id='signup-phone' name='phone' type='tel' required />
                  </div>

                  <SubmitButton>Create Account</SubmitButton>
                </form>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
