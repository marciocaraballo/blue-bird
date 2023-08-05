'use client';

import { useRouter, useParams } from 'next/navigation'
 
export default function Page() {
  const params = useParams()
  return <p className='text-gray-400'>Tweet to view: {params.tweet} </p>
}