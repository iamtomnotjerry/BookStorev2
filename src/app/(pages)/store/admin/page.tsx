'use client'
import SellTable from '@/app/ui/UploadBook'
import { redirect } from 'next/navigation';
import React from 'react'
import { useSession } from 'next-auth/react';

export default function page() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const isAdmin = userEmail === '23560004@gm.uit.edu.vn';
  if (!isAdmin) {
    redirect("/store");
  }
  return (
    
    <div>
      <SellTable />
    </div>
  )
}