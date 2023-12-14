import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SideBar from '../../ui/sidebar/SideBar';
import StoreProvider from '../../provider';
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight

 

export default async function StoreLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await getServerSession();
        if(!session){
        redirect("/")
    }
    return (
        <StoreProvider>
        <div className="flex flex-col md:flex-row">
          <SideBar />
          <div className='flex flex-col p-2'>
            {children}
          </div>
        </div>
        </StoreProvider>
    );
  }
  