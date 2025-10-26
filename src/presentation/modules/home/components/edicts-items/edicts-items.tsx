"use client"
import { Button } from "@/presentation/external/components/ui/button";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface EdictItemsProps {
  edict: {
    id: number
    status: string
    categories: string[]
    title: string
    description: string
    startDate: Date
    endDate: Date

  }
}

export function EdictItems({ edict }: EdictItemsProps) {

  const { push } = useRouter()

  return (
    <Card
      key={edict.id}
      className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white hover:cursor-pointer"
      onClick={() => push(`/edital/${edict.id}`)}
    >
      <CardContent className="px-6 pt-6 relative z-10">
        <div className="space-y-4">


          <div className="space-y-1">
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300">
              {edict.title}
            </h3>
            <p
              className="text-gray-600 text-sm leading-relaxed truncate max-w-[60ch]"
              title={edict.description}
            >
              {edict.description}
            </p>

            <div className="flex flex-row mt-3 gap-3" >
              {edict?.categories?.map((category, index) => (
                <div key={index} className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300 mb-5">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-[#5127FF]" />
              <span className="font-medium">{new Date(edict.startDate).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">até</span>
              <span className="font-medium">{new Date(edict.endDate).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}</span>
            </div>
          </div>

          {edict.status === "Ativo" ? (
            <Button className="w-full bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg mt-auto">
              Saiba mais
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}