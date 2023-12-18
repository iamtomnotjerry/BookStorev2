'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, SignInResponse } from 'next-auth/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    // Check if email and password are provided
    if (!email || !password) {
      // Display a toast notification for missing fields
      toast.error('All fields are necessary.', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
      setLoading(false); // Reset loading state on error
      return;
    }

    try {
      const res: SignInResponse | undefined = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!res) {
        // Handle the case where signIn returns undefined
        toast.error('An unexpected error occurred.', { position: toast.POSITION.TOP_CENTER });
        setLoading(false); // Reset loading state on error
        return;
      }

      if (res.error) {
        // Display a toast notification for invalid credentials
        toast.error('Invalid Credentials', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
        setLoading(false); // Reset loading state on error
      } else {
        if (res.ok) {
          toast.success('Sign-in successful!', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
          router.replace('/store');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred.', { position: toast.POSITION.TOP_CENTER });
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <div className="flex pb-5 mb-5 text-2xl text-pink-400">
            <BookOpenIcon className="w-8 h-8" />
            <p>Free4Read</p>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="YourEmail@example.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="********"
          />
        </div>

        {/* Sign In Button with conditional rendering based on loading state */}
        <button
          className="bg-indigo-500 text-white p-2 rounded-md w-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
          type="submit"
          disabled={loading} // Disable the button when loading is true
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Sign Up Link */}
        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-2 text-sm text-center">
          <Link href="/auth/reset-password/request" className="text-indigo-500 hover:underline">
            Forgot your password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
