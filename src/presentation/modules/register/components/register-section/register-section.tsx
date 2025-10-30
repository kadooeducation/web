import Image from 'next/image'
import { Form } from '../form/form'

export function RegisterSection() {
  return (
    <section className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative w-full hidden h-full lg:block">
        <Image
          src="/banner.svg"
          alt="Banner de Login"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mx-auto flex h-full w-full flex-col justify-center p-8 lg:max-w-[720px] max-w-full">
        <div className="max-w-[137px] mb-8">
          <Image
            src="/logo/logo.svg"
            width={137}
            height={51}
            alt="Kadoo Academy"
            priority
            quality={100}
          />
        </div>

        <h1 className="mb-3 text-4xl font-bold">Acesse sua conta</h1>

        <Form />
      </div>
    </section>
  )
}
