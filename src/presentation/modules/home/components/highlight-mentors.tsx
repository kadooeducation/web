
import { Button } from "@/presentation/external/components/ui/button";
import { Star, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/presentation/external/components/ui/avatar";
import { Card, CardContent } from "@/presentation/external/components/ui/card";

const mentores = [
  {
    id: 1,
    name: "Ana Silva",
    area: "Marketing Digital",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    sessions: 120,
    specialty: "Growth Marketing",
  },
  {
    id: 2,
    name: "Carlos Santos",
    area: "Desenvolvimento de Produto",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    sessions: 95,
    specialty: "Product Strategy",
  },
  {
    id: 3,
    name: "Maria Oliveira",
    area: "Finanças e Investimentos",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5.0,
    sessions: 87,
    specialty: "Investment Analysis",
  },
  {
    id: 4,
    name: "Pedro Henrique",
    area: "Música e Filantropia",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5.0,
    sessions: 28,
    specialty: "Social Impact",
  },
]
export async function HighlightMentors() {

  await new Promise(resolve => setTimeout(resolve, 5000))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mentores.map((mentor) => (
        <Card key={mentor.id} className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <CardContent className="p-6 relative z-10">
            <div className="text-center mb-6">
              <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:ring-[#5127FF]/20 transition-all duration-300">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white text-xl font-bold">
                  {mentor.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{mentor.name}</h3>
              <p className="text-[#5127FF] font-medium text-sm bg-[#5127FF]/10 px-3 py-1 rounded-full inline-block mb-1">
                {mentor.area}
              </p>
              {mentor.specialty && (
                <p className="text-xs text-gray-500 mt-1">{mentor.specialty}</p>
              )}
            </div>

            <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Star className="w-4 h-4 fill-[#F4DA02] text-[#F4DA02]" />
                  <span className="font-bold text-gray-900">{mentor.rating}</span>
                </div>
                <span className="text-xs text-gray-600">Avaliação</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Users className="w-4 h-4 text-[#5127FF]" />
                  <span className="font-bold text-gray-900">{mentor.sessions}</span>
                </div>
                <span className="text-xs text-gray-600">Sessões</span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg"
            >
              Agendar Mentoria
            </Button>
          </CardContent>

          {mentor.rating === 5.0 && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#F4DA02] to-[#F4DA02]/80 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg z-20">
              ⭐ TOP
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}