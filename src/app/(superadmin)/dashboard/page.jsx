import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div><Link href={"/dashboard/create-scheme"}>Create Scheme</Link></div>
  )
}

export default page