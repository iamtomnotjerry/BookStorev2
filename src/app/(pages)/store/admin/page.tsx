'use client'
import SellTable from '@/app/ui/UploadBook'
import { redirect } from 'next/navigation';
import React from 'react'
import { useSession } from 'next-auth/react';
import SettingsOption from '@/app/ui/Setting/SettingOption';
import AdminOption from '@/app/ui/admin/AdminOption';

export default function AdminPage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const isAdmin = userEmail === '23560004@gm.uit.edu.vn';
  if (!isAdmin) {
    redirect("/store");
  }
  return (
    <div className="p-2 max-w-md mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Power of admin</h2>

      <AdminOption title="Upload Book"  />

      <AdminOption title="Update&Delete Books"/>
    </div>
  )
}