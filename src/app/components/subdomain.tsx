"use client"
import { useEffect, useState } from 'react';
export default function Subdomain() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const host = window.location.hostname; // runs only on client
    const parts = host.split('.');
    console.log(host);

    if (parts.length > 2) {
      setSubdomain(parts[0]);
    } else {
      setSubdomain(null);
    }
  }, []);

  return (
    <h1>{subdomain ? `Subdomain: ${subdomain}` : 'No subdomain detected'}</h1>
  );
}
