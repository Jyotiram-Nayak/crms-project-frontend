import React from 'react'
import Link from "next/link";

interface Props {
  path: string;
  text: string;
}

const Addbutton: React.FC<Props> = ({ path, text }) => {
  return (
    <>
      <Link
        href={path}
        className="bg-primary font-medium gap-2.5 hover:bg-opacity-90 inline-flex items-center px-2 py-2 text-white">
        {text}
      </Link>
    </>
  )
}

export default Addbutton;

