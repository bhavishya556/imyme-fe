import dynamic from 'next/dynamic';

const Subdomain = dynamic(() => import('../../components/subdomain/subdomain'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Subdomain />
      hi main page
    </main>
  );
}
