"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/courses');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectPage;
