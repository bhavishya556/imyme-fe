import { Poppins } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image' 

const poppins = Poppins({
    weight: ['400', '500', '900', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})


export default function Page() {
    return (
        <div className="flex justify-center items-center w-full h-full flex-col gap-2">
            <p className={`text-2xl text-purple-600 text-center font-[600] tracking-wide uppercase ${poppins.className} `}>
                Admin Dashboard
            </p>

            <Link href="/">
            <Image
              src="/images/Biz_logo.svg"
              alt="img"
              height={500}
              width={500}
            //   className="rounded-full"
            />
        </Link>
        </div>
    )
}