import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SideBar from '../../ui/sidebar/SideBar';
import StoreProvider from '../../provider';


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
  