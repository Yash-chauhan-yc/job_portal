'use client'

import H1 from '@/components/ui/h1'
import React from 'react'

const error = () => {
  return (
    <main className='m-auto my-10 max-w-5xl space-y-5 text-center px-3'>
      <H1>Error</H1>
      <p>An unexpected error occured</p>
    </main>
  )
}

export default error