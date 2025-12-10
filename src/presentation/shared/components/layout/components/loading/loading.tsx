'use client'

import Image from 'next/image'
import { useEffect } from 'react'

export function Loading() {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <section className="fixed w-screen h-screen inset-0 z-[9999] flex items-center justify-center bg-black backdrop-blur-[15px] overflow-hidden max-w-full">
      <div className="flex flex-col items-center">
        <Image
          src="/loading.png"
          alt="Logo da Kadoo Academy"
          height={365.63}
          width={400}
          className="animate-bounce-logo"
        />
        <p className="text-white text-2xl mt-12">Carregando...</p>
      </div>
    </section>
  )
}
