'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "@/presentation/external/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/presentation/external/components/ui/sidebar";
import { HomeSideBar } from "@/presentation/shared/layout/components/sidebar";
import { Header } from "@/presentation/shared/layout/components/header/header";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/presentation/external/components/ui/avatar";
import { Badge } from "@/presentation/external/components/ui/badge";
import { Input } from "@/presentation/external/components/ui/input";
import { 
  Star, 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  ChevronDown,
  Clock,
  Award,
  Briefcase,
  MessageSquare
} from "lucide-react";

const mentores = [
  {
    id: 1,
    name: "Ana Silva",
    area: "Marketing Digital",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    sessions: 120,
    specialty: "Growth Marketing",
    location: "São Paulo, SP",
    experience: "8 anos",
    price: "R$ 150/h",
    status: "online",
    description: "Especialista em marketing digital com foco em growth hacking e aquisição de usuários. Já ajudou mais de 50 startups a crescer exponencialmente.",
    skills: ["Growth Hacking", "Google Ads", "Facebook Ads", "SEO", "Analytics"],
    availability: "Segunda a Sexta, 9h-17h"
  },
  {
    id: 2,
    name: "Carlos Santos",
    area: "Desenvolvimento de Produto",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    sessions: 95,
    specialty: "Product Strategy",
    location: "Rio de Janeiro, RJ",
    experience: "10 anos",
    price: "R$ 200/h",
    status: "busy",
    description: "Product Manager sênior com experiência em empresas de tecnologia. Especializado em estratégia de produto e metodologias ágeis.",
    skills: ["Product Strategy", "UX/UI", "Agile", "Scrum", "Design Thinking"],
    availability: "Terça e Quinta, 14h-18h"
  },
  {
    id: 3,
    name: "Maria Oliveira",
    area: "Finanças e Investimentos",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 5.0,
    sessions: 87,
    specialty: "Investment Analysis",
    location: "Brasília, DF",
    experience: "12 anos",
    price: "R$ 250/h",
    status: "online",
    description: "CFO experiente com histórico em captação de recursos e gestão financeira de startups em crescimento.",
    skills: ["Captação de Recursos", "Due Diligence"],
    availability: "Segunda a Sexta, 8h-12h"
  },
  {
    id: 4,
    name: "Pedro Henrique",
    area: "Música e Filantropia",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 5.0,
    sessions: 28,
    specialty: "Social Impact",
    location: "Salvador, BA",
    experience: "6 anos",
    price: "R$ 120/h",
    status: "online",
    description: "Empreendedor social com foco em projetos de impacto. Especializado em negócios com propósito social.",
    skills: ["Impact Business", "Fundraising", "Social Media", "Storytelling", "Community"],
    availability: "Quarta a Sábado, 15h-19h"
  },
  {
    id: 5,
    name: "Juliana Costa",
    area: "Tecnologia e IA",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    sessions: 156,
    specialty: "AI & Machine Learning",
    location: "São Paulo, SP",
    experience: "9 anos",
    price: "R$ 300/h",
    status: "online",
    description: "Tech Lead com expertise em inteligência artificial e machine learning. Mentora em transformação digital.",
    skills: ["AI/ML", "Python", "Data Science", "Cloud Computing", "Tech Strategy"],
    availability: "Segunda a Quarta, 19h-22h"
  },
  {
    id: 6,
    name: "Roberto Lima",
    area: "Vendas e Negociação",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 4.7,
    sessions: 203,
    specialty: "Sales Strategy",
    location: "Belo Horizonte, MG",
    experience: "15 anos",
    price: "R$ 180/h",
    status: "busy",
    description: "Diretor comercial com vasta experiência em vendas B2B e estruturação de times comerciais de alta performance.",
    skills: ["Sales Strategy", "B2B Sales", "CRM", "Negotiation", "Team Building"],
    availability: "Terça a Quinta, 16h-20h"
  },
  {
    id: 7,
    name: "Fernanda Alves",
    area: "Design e UX",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    sessions: 89,
    specialty: "Product Design",
    location: "Florianópolis, SC",
    experience: "7 anos",
    price: "R$ 160/h",
    status: "online",
    description: "UX Designer sênior especializada em design de produtos digitais e research. Foco em experiência do usuário.",
    skills: ["UX Design", "UI Design", "User Research", "Figma", "Prototyping"],
    availability: "Segunda a Sexta, 10h-14h"
  },
  {
    id: 8,
    name: "Thiago Mendes",
    area: "Recursos Humanos",
    avatar: "/placeholder.svg?height=120&width=120",
    rating: 4.6,
    sessions: 67,
    specialty: "People Management",
    location: "Recife, PE",
    experience: "11 anos",
    price: "R$ 140/h",
    status: "online",
    description: "Head of People com experiência em estruturação de times e cultura organizacional em startups e scale-ups.",
    skills: ["People Management", "Culture", "Hiring", "Performance", "Leadership"],
    availability: "Quarta a Sexta, 13h-17h"
  }
];

const areas = [
  "Todas as Áreas",
  "Marketing Digital",
  "Desenvolvimento de Produto",
  "Finanças e Investimentos",
  "Tecnologia e IA",
  "Vendas e Negociação",
  "Design e UX",
  "Recursos Humanos",
  "Música e Filantropia"
];

const statusColors = {
  online: "bg-green-500",
  busy: "bg-yellow-500",
  offline: "bg-gray-500"
};

const statusLabels = {
  online: "Disponível",
  busy: "Ocupado",
  offline: "Offline"
};

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas as Áreas");
  const [sortBy, setSortBy] = useState("rating");
  const [filteredMentors, setFilteredMentors] = useState(mentores);

  const filterAndSortMentors = useCallback(() => {
    let filtered = mentores.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesArea = selectedArea === "Todas as Áreas" || mentor.area === selectedArea;
      
      return matchesSearch && matchesArea;
    });

    // Sort mentors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "sessions":
          return b.sessions - a.sessions;
        case "price":
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredMentors(filtered);
  }, [searchTerm, selectedArea, sortBy]);

  useEffect(() => {
    filterAndSortMentors();
  }, [filterAndSortMentors]);

  return (
    <SidebarProvider>
      <HomeSideBar />
      <SidebarInset>
        <Header />
        <div className="bg-gray-50 min-h-screen">
          <main className="p-6 space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Nossos Mentores</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Conecte-se com especialistas que vão acelerar sua jornada empreendedora. 
                  Mais de 50+ mentores experientes prontos para compartilhar conhecimento.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center shadow-lg mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">50+</div>
                    <div className="text-sm text-gray-600">Mentores Ativos</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-[#F4DA02] to-[#F4DA02]/80 rounded-xl flex items-center justify-center shadow-lg mb-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
                    <div className="text-sm text-gray-600">Avaliação Média</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-green-500/80 rounded-xl flex items-center justify-center shadow-lg mb-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">1,2K+</div>
                    <div className="text-sm text-gray-600">Mentorias Realizadas</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500 to-purple-500/80 rounded-xl flex items-center justify-center shadow-lg mb-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">15</div>
                    <div className="text-sm text-gray-600">Áreas de Expertise</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Filters and Search */}
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar mentores..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 focus:border-[#5127FF] rounded-xl"
                    />
                  </div>

                  {/* Area Filter */}
                  <div className="relative">
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-10 focus:border-[#5127FF] focus:outline-none"
                    >
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-10 focus:border-[#5127FF] focus:outline-none"
                    >
                      <option value="rating">Maior Avaliação</option>
                      <option value="sessions">Mais Experiente</option>
                      <option value="price">Menor Preço</option>
                      <option value="name">Nome A-Z</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>

                  <Button
                    variant="outline"
                    className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white px-6"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold">{filteredMentors.length}</span> mentores
                {selectedArea !== "Todas as Áreas" && (
                  <span> em <span className="font-semibold">{selectedArea}</span></span>
                )}
              </p>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[mentor.status]}`}></div>
                    <span className="text-xs font-medium text-gray-600">{statusLabels[mentor.status]}</span>
                  </div>
                  
                  <CardContent className="p-6 relative z-10">
                    {/* Avatar e Info Principal */}
                    <div className="text-center mb-6">
                      <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:ring-[#5127FF]/20 transition-all duration-300">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white text-lg font-bold">
                          {mentor.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                      <Badge className="bg-[#5127FF]/10 text-[#5127FF] hover:bg-[#5127FF]/20 mb-2">
                        {mentor.area}
                      </Badge>
                      <p className="text-sm text-gray-600">{mentor.specialty}</p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 text-center mb-4 line-clamp-2">
                      {mentor.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-1">
                          <Star className="w-3 h-3 fill-[#F4DA02] text-[#F4DA02]" />
                          <span className="font-bold text-sm text-gray-900">{mentor.rating}</span>
                        </div>
                        <span className="text-xs text-gray-600">Rating</span>
                      </div>
                      <div className="w-px h-6 bg-gray-300" />
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-1">
                          <MessageSquare className="w-3 h-3 text-[#5127FF]" />
                          <span className="font-bold text-sm text-gray-900">{mentor.sessions}</span>
                        </div>
                        <span className="text-xs text-gray-600">Sessões</span>
                      </div>
                    </div>

                    {/* Info adicional */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{mentor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Briefcase className="w-3 h-3" />
                        <span>{mentor.experience} de experiência</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{mentor.availability}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {mentor.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-1 border-gray-200 text-gray-600">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-1 border-gray-200 text-gray-600">
                            +{mentor.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-4">
                      <span className="text-lg font-bold text-[#5127FF]">{mentor.price}</span>
                    </div>

                    {/* Botões de Ação */}
                    <div className="space-y-2">
                      <Button
                        className="w-full bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold py-2 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Agendar Mentoria
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-200 hover:border-[#5127FF] hover:text-[#5127FF] text-gray-600 py-2 rounded-xl transition-all duration-300"
                      >
                        Ver Perfil
                      </Button>
                    </div>
                  </CardContent>

                  {/* Badge de Destaque */}
                  {mentor.rating === 5.0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#F4DA02] to-[#F4DA02]/80 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg z-20">
                      ⭐ TOP
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredMentors.length === 0 && (
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum mentor encontrado</h3>
                  <p className="text-gray-600 mb-6">Tente ajustar seus filtros ou termo de busca</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedArea("Todas as Áreas");
                    }}
                    className="bg-[#5127FF] hover:bg-[#5127FF]/90"
                  >
                    Limpar Filtros
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* CTA Section */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-[#5127FF]/10 to-[#F4DA02]/10 border-[#5127FF]/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quer se tornar um mentor?</h3>
                <p className="text-gray-600 text-lg mb-6">
                  Compartilhe sua experiência e ajude a próxima geração de empreendedores a crescer
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Candidatar-se como Mentor
                </Button>
              </CardContent>
            </Card>
          </main>

          {/* Footer */}
          <footer className="mt-12 p-6 bg-white border-t">
            <div className="text-center text-sm text-gray-600 max-w-7xl mx-auto">
              <p>© 2025 Kadoo - Acelerando startups para transformar vidas</p>
              <p className="mt-1">Uma iniciativa para democratizar o empreendedorismo</p>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}