"use client"
import dynamic from 'next/dynamic';

const Subdomain = dynamic(() => import('./components/subdomain'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Subdomain />
    </main>
  );
}
