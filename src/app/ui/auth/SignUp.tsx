'use client'
// Import necessary modules and components
import { BookOpenIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// SignUp component definition
const SignUp = () => {
  // State variables for form fields and error
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are necessary.", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const resUserExists = await fetch('/api/auth/check-exist', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const { user } = await resUserExists.json();
      if (user) {
        toast.error("User already exists.", {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password
        })
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        toast.success("Registration successful!", {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT
        });
        setName("");
        setEmail("");
        setPassword("");
        router.push('/auth/signin')
      } else {
        toast.error("Registration failed. Please try again.", {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } catch (error) {
      console.error('Error during registration: ', error);
      toast.error("Error during registration. Please try again.", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // JSX structure for the component
  return (
    <div className="flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md w-full md:w-96" onSubmit={handleSubmit}>
        <div className="flex">
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <div className="flex pb-5 mb-5 text-2xl text-pink-400">
            <BookOpenIcon className="w-8 h-8" />
            <p>Free2Read</p>
          </div>
        </div>

        {/* Full Name Field */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="fullName"
            name="fullName"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="John Doe"
          />
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

        {/* Sign Up Button */}
        <button
          className="bg-indigo-500 text-white p-2 rounded-md w-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
          type="submit"
          disabled={isSubmitting} // Disable the button when submitting
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* Sign In Link */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-indigo-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

// Export the SignUp component
export default SignUp;
