"use client"
import React from 'react'
import Link from 'next/link'

const LinkComponent = ({title,href,icon="",classname = ""}) => {
  return (
    <Link href={href} className={`${classname} flex gap-4 items-center`}>{icon}{title}</Link>
  )
}

export default LinkComponent