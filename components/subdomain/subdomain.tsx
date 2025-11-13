"use client"
import { useEffect, useState } from 'react';

export default function Subdomain() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const host = window.location.hostname;
    const parts = host.split('.');

    // Handle localhost-style subdomains
    if (parts.length === 2) {
      setSubdomain(parts[0]); // hlo from hlo.localhost
    } 
    // Handle production-style e.g. a.b.com
    else if (parts.length > 2) {
      setSubdomain(parts[0]);
    } 
    else {
      setSubdomain(null);
    }
  }, []);

  return (
    <h1 className='text-red-500'>
      {subdomain ? `Subdomain: ${subdomain}` : 'No subdomain detected'}
    </h1>
  );
}
