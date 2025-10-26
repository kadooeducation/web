'use client'
import { Button } from "@/presentation/external/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BackToSteps() {

  const { back } = useRouter()

  return (
    <Button
      className="inline-flex items-center gap-2 text-sm font-medium text-[#5127FF] bg-transparent hover:bg-transparent"
      variant="link"
      onClick={back}
    >
      <ArrowLeft className="w-4 h-4" />
      Voltar para trilhas
    </Button>
  )
}