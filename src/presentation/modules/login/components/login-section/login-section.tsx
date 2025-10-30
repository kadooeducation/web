import Image from 'next/image'
import { Form } from '../form/form'

export function LoginSection() {
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

// <section className="relative min-h-screen flex items-center font-[var(--font-poppins)] text-neutral-900">

//   <Image src="/icons/purple-ball.svg" alt="vector" className="absolute top-[20%] left-[5%]" width={106} height={106} />
//   <Image alt="SVG" src="/icons/yellow-ball.svg" className="absolute top-[10%] left-[30%] " width={80} height={80} />

//   <Image alt="SVG" src="/vector6.png" className="absolute top-0 right-0" width={366} height={352} />
//   <Image alt="SVG" src="/group4.png" className="absolute top-0 left-[30%]" width={587} height={352} />
//   <Image alt="SVG" src="/group6.svg" className="absolute bottom-0 left-0 " width={379} height={238} />
//   <Image alt="SVG" src="/group7.png" className="absolute bottom-0 left-[7%]" width={379} height={238} />
//   <Image alt="SVG" src="/group8.png" className="absolute bottom-0 left-[35%]" width={353} height={212} />

//   <div className="max-w-[1324px] h-[869px] items-start mx-auto flex gap-[80px] z-50 justify-between">
//     <div className="flex flex-col max-w-[600px] gap-[100px]">
//       <header className="flex flex-col gap-2 mb-11">
//         <Image src="/logo.png" alt="Logo Kadoo" width={160} height={100} />
//         <p className="text-xl font-semi">Education</p>

//       </header>

//       <div>
//         <h2 className="text-3xl font-bold mt-16">Bem vindo!</h2>

//         <h1 className="text-4xl pt-6">Estamos aqui para transformar sua jornada na educação!</h1>

//         <div className="w-1/2 h-[2px] bg-black my-8 rounded-md" />
//         <p className="text-xl mb-6">
//           Você ainda não conhece a Kadoo?
//           <br />
//           Venha conhecer agora!
//         </p>
//         <button className="bg-[#5f2eea] text-white px-5 py-2 rounded-lg max-w-[200px]">
//           Saiba mais!
//         </button>
//       </div>
//     </div>

//     <div className="flex flex-col z-50 w-[609px] h-[700px] bg-white/80 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-white/30 gap-12 mb-auto">
//       <h2 className="text-4xl font-semibold text-center text-neutral-900">
//         Faça seu login
//       </h2>

//       <Form />

//       <p className="text-center text-sm text-neutral-700">
//         Ainda não possui uma conta?{" "}
//         <a href={APP_ROUTES.register} className="text-[#5f2eea] font-medium hover:underline">
//           Cadastre-se!
//         </a>
//       </p>
//     </div>

//   </div>
// </section>
