import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SideBar from '../../ui/sidebar/SideBar';
import StoreProvider from '../../provider';
import Head from 'next/head'; // Import Head component from Next.js

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StoreProvider>
        <div className="flex flex-col md:flex-row">
          <SideBar />
          <div className="flex flex-col p-2 w-full">{children}</div>
        </div>
      </StoreProvider>
    </>
  );
}
