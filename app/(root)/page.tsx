import dynamic from 'next/dynamic';

const Subdomain = dynamic(() => import('../../components/subdomain/subdomain'), {
  ssr: false,
});

const TokenVerification = dynamic(() => import('../../components/Auth/TokenVerification'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Subdomain />
      <TokenVerification />
    </main>
  );
}
