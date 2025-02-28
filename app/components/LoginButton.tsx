'use client'

import { useState } from 'react'
import { loginWithProvider } from '../lib/authActions'

const LoginButton = () => {
  const [isLoginCardOpen, setIsLoginCardOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsLoginCardOpen(true)}
        className='px-4 py-2 bg-white text-blue-900 rounded'
      >
        Login
      </button>

      {isLoginCardOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
            <h2 className='text-lg font-bold text-center text-gray-600  mb-4'>Login</h2>

            <button
              onClick={() => loginWithProvider('google')}
              className='w-full py-2 mb-3 bg-red-500 text-white rounded-lg hover:bg-red-600'
            >
              Login with Google
            </button>

            <button
              onClick={() => loginWithProvider('github')}
              className='w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900'
            >
              Login with GitHub
            </button>

            <button
              onClick={() => setIsLoginCardOpen(false)}
              className='w-full mt-4 text-sm text-gray-500 hover:underline'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginButton
