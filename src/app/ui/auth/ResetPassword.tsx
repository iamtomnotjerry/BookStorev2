'use client'
// Import necessary modules and components
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { useSession } from 'next-auth/react';

// ResetPassword component definition
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Function to handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      if (!isCodeSent) {
        // If the reset code is not sent yet, send the reset email
        const response = await fetch('/api/auth/reset-password/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setIsCodeSent(true); // Set isCodeSent to true when the code is sent
          toast.success('Password reset link sent successfully!', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
        } else {
          const data = await response.json();
          if (data.error === 'User not found') {
            toast.error('User not found. Please check your email address.', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
          } else {
            toast.error(data.error || 'An unexpected error occurred.', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
          }
        }
      } else {
        // If the reset code is sent, handle the reset code and new password
        const response = await fetch('/api/auth/reset-password/comfirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resetToken: resetCode, newPassword }),
        });

        if (response.ok) {
          toast.success('Password reset successful!', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
          router.replace('/auth/signin');
        } else {
          const data = await response.json();
          toast.error(data.error || 'An unexpected error occurred.', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred.', { position: toast.POSITION.TOP_CENTER });
    }
  };

  // JSX structure for the component
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
          <div className="flex pb-5 mb-5 text-2xl text-pink-400">
            <BookOpenIcon  className="w-8 h-8" />
            <p>Free2Read</p>
          </div>
        </div>

        <div className="mb-6">
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

        {isCodeSent && (
          <>
            <div className="mb-6">
              <label htmlFor="resetCode" className="block text-sm font-medium text-gray-600">
                Reset Code
              </label>
              <input
                onChange={(e) => setResetCode(e.target.value)}
                type="text"
                id="resetCode"
                name="resetCode"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter Reset Code"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                id="newPassword"
                name="newPassword"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter New Password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Confirm New Password"
              />
            </div>
          </>
        )}

        <button
          className="bg-indigo-500 text-white p-2 rounded-md w-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
          type="submit"
          
        >
          {isCodeSent ? 'Reset Password' : 'Send Reset Code'}
        </button>

        <p className="mt-4 text-sm text-center">
          Remember your password?{' '}
          <span
            onClick={() => router.replace('/auth/signin')}
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

// Export the ResetPassword component
export default ResetPassword;
