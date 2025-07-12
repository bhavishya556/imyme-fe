import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAdmin } from '@/lib/actions/AdminActions/validateAdmin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const cookieStore = cookies()
  // const usertoken = cookieStore.get('usertoken')

  // // if (usertoken) {
  // //   const res = await validateAdmin(usertoken.value);
  // //   if (res?.success) {
  // //     redirect(`/en/admin/dashboard`);
  // //   }
  // // }

  return (
    <section>
      {children}
    </section>
  )
}