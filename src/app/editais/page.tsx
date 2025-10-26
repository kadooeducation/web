'use client'

import { Button } from "@/presentation/external/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/presentation/external/components/ui/sidebar";
import { HomeSideBar } from "@/presentation/shared/layout/components/sidebar";
import { Calendar, Search, Filter, ChevronDown, MapPin, Clock, Users, TrendingUp, Star } from "lucide-react";
import { Header } from "@/presentation/shared/layout/components/header/header";
import { useCallback, useEffect, useState } from "react";
import { userGatewayHttp } from "@/infra/modules/user/user-gateway-http";
import { EnumProfile, Profile } from "@/presentation/shared/layout/components/profile/profile";
import { Loading } from "@/presentation/shared/layout/components/loading/loading";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { Input } from "@/presentation/external/components/ui/input";
import { Footer } from "@/presentation/external/components/ui/footer";

const editaisData = [
  {
    id: 1,
    title: "Programa de Aceleração Tech 2024",
    description: "Programa completo para startups de tecnologia com mentoria especializada, networking e investimento de até R$ 500k",
    category: "Tecnologia",
    status: "inscrito",
    icon: "🚀",
    startDate: "2025-07-17",
    endDate: "2025-12-15",
    location: "São Paulo, SP",
    participants: 150,
    investment: "R$ 500k",
    duration: "6 meses",
    difficulty: "Intermediário"
  },
  {
    id: 2,
    title: "Aceleração de Impacto Social",
    description: "Para negócios que geram impacto social positivo. Foco em sustentabilidade e transformação social",
    category: "Impacto Social",
    status: "inscrito",
    icon: "💡",
    startDate: "2025-07-17",
    endDate: "2025-11-30",
    location: "Rio de Janeiro, RJ",
    participants: 80,
    investment: "R$ 300k",
    duration: "4 meses",
    difficulty: "Iniciante"
  },
  {
    id: 3,
    title: "Scale-up Innovation Program",
    description: "Para empresas em fase de crescimento que buscam escalar operações e expandir mercados internacionalmente",
    category: "Scale-up",
    status: "aberto",
    icon: "🎯",
    startDate: "2025-08-01",
    endDate: "2025-12-31",
    location: "Belo Horizonte, MG",
    participants: 50,
    investment: "R$ 1M",
    duration: "5 meses",
    difficulty: "Avançado"
  },
  {
    id: 4,
    title: "Fintech Accelerator",
    description: "Programa especializado para startups do setor financeiro com foco em inovação e regulamentação",
    category: "Fintech",
    status: "aberto",
    icon: "💰",
    startDate: "2025-09-01",
    endDate: "2026-02-28",
    location: "São Paulo, SP",
    participants: 30,
    investment: "R$ 750k",
    duration: "6 meses",
    difficulty: "Avançado"
  },
  {
    id: 5,
    title: "HealthTech Innovation Hub",
    description: "Aceleração focada em soluções de saúde digital, telemedicina e biotecnologia",
    category: "HealthTech",
    status: "aberto",
    icon: "🏥",
    startDate: "2025-08-15",
    endDate: "2026-01-15",
    location: "Porto Alegre, RS",
    participants: 40,
    investment: "R$ 600k",
    duration: "5 meses",
    difficulty: "Intermediário"
  },
  {
    id: 6,
    title: "AgriTech Boost Program",
    description: "Para startups que inovam no agronegócio com tecnologia sustentável e produtividade rural",
    category: "AgriTech",
    status: "aberto",
    icon: "🌱",
    startDate: "2025-09-15",
    endDate: "2026-03-15",
    location: "Cuiabá, MT",
    participants: 25,
    investment: "R$ 400k",
    duration: "6 meses",
    difficulty: "Intermediário"
  },
  {
    id: 7,
    title: "E-commerce Acceleration",
    description: "Programa para startups de e-commerce com foco em marketplace, logística e experiência do cliente",
    category: "E-commerce",
    status: "fechado",
    icon: "🛍️",
    startDate: "2025-06-01",
    endDate: "2025-11-30",
    location: "São Paulo, SP",
    participants: 60,
    investment: "R$ 350k",
    duration: "6 meses",
    difficulty: "Iniciante"
  },
  {
    id: 8,
    title: "EduTech Innovation Lab",
    description: "Focado em tecnologias educacionais, aprendizado online e ferramentas pedagógicas inovadoras",
    category: "EduTech",
    status: "aberto",
    icon: "📚",
    startDate: "2025-10-01",
    endDate: "2026-04-01",
    location: "Brasília, DF",
    participants: 35,
    investment: "R$ 450k",
    duration: "6 meses",
    difficulty: "Intermediário"
  }
];

const categories = ["Todos", "Tecnologia", "Impacto Social", "Scale-up", "Fintech", "HealthTech", "AgriTech", "E-commerce", "EduTech"];
const statusOptions = ["Todos", "aberto", "inscrito", "fechado"];
const difficultyOptions = ["Todos", "Iniciante", "Intermediário", "Avançado"];

export default function EditaisPage() {
  const [user, setUser] = useState<{ name: string, role: EnumProfile } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const getUser = useCallback(async () => {
    await userGatewayHttp.get().then(setUser);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const filteredEditais = editaisData.filter(edital => {
    const matchesSearch = edital.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edital.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || edital.category === selectedCategory;
    const matchesStatus = selectedStatus === "Todos" || edital.status === selectedStatus;
    const matchesDifficulty = selectedDifficulty === "Todos" || edital.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aberto":
        return <span className="bg-[#F4DA02] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Aberto</span>;
      case "inscrito":
        return <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Inscrito ✓</span>;
      case "fechado":
        return <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Fechado</span>;
      default:
        return <span className="bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Status</span>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Tecnologia": "bg-blue-100 text-blue-700",
      "Impacto Social": "bg-green-100 text-green-700",
      "Scale-up": "bg-purple-100 text-purple-700",
      "Fintech": "bg-yellow-100 text-yellow-700",
      "HealthTech": "bg-red-100 text-red-700",
      "AgriTech": "bg-green-100 text-green-800",
      "E-commerce": "bg-orange-100 text-orange-700",
      "EduTech": "bg-indigo-100 text-indigo-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "text-green-600";
      case "Intermediário": return "text-yellow-600";
      case "Avançado": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  if (!user) return <Loading />;

  const role = user.role;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <HomeSideBar role={role} /> */}
      {/* <Header profile={<Profile {...user} />}/> */}

      <div className="p-6">
        <Card className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">Editais Disponíveis</h1>
                <p className="text-xl text-white/90">Encontre a oportunidade perfeita para acelerar seu negócio</p>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>{editaisData.filter(e => e.status === 'aberto').length} editais abertos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{editaisData.reduce((acc, e) => acc + e.participants, 0)}+ vagas</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Pesquisar editais por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:border-[#5127FF] focus:ring-0 text-base"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {filteredEditais.length} {filteredEditais.length === 1 ? 'edital encontrado' : 'editais encontrados'}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-2 border-gray-300 hover:border-[#5127FF] hover:text-[#5127FF] transition-all duration-300"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                  <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Categoria</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#5127FF] focus:ring-0"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#5127FF] focus:ring-0"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {status === 'Todos' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Dificuldade</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#5127FF] focus:ring-0"
                    >
                      {difficultyOptions.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Editais Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEditais.map((edital) => (
            <Card key={edital.id} className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Badge de Status */}
              <div className="absolute top-4 right-4 z-10">
                {getStatusBadge(edital.status)}
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                  {/* Ícone e Tag */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">{edital.icon}</span>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(edital.category)}`}>
                      {edital.category}
                    </div>
                  </div>

                  {/* Título e Descrição */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300 line-clamp-2">
                      {edital.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {edital.description}
                    </p>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{edital.location}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{edital.duration}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Users className="w-3 h-3" />
                        <span>{edital.participants} vagas</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center gap-1 text-xs font-medium">
                        <Star className="w-3 h-3" />
                        <span className={getDifficultyColor(edital.difficulty)}>{edital.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Investment */}
                  <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="text-center">
                      <p className="text-xs text-green-700 font-medium">Investimento até</p>
                      <p className="text-lg font-bold text-green-800">{edital.investment}</p>
                    </div>
                  </div>

                  {/* Datas */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#5127FF]" />
                      <span className="font-medium">{new Date(edital.startDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">até</span>
                      <span className="font-medium">{new Date(edital.endDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {edital.status === 'aberto' && (
                    <Button
                      className="w-full bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Inscrever-se
                    </Button>
                  )}

                  {edital.status === 'inscrito' && (
                    <div className="text-center py-2">
                      <span className="text-green-600 font-semibold text-sm bg-green-50 px-4 py-2 rounded-lg">
                        Você já está inscrito nesse edital
                      </span>
                    </div>
                  )}

                  {edital.status === 'fechado' && (
                    <div className="text-center py-2">
                      <span className="text-gray-500 font-semibold text-sm bg-gray-50 px-4 py-2 rounded-lg">
                        Inscrições encerradas
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEditais.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum edital encontrado</h3>
              <p className="text-gray-600 mb-6">Tente ajustar os filtros ou o termo de pesquisa</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todos");
                  setSelectedStatus("Todos");
                  setSelectedDifficulty("Todos");
                }}
                className="bg-[#5127FF] hover:bg-[#5127FF]/90 text-white"
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>


      <Footer />
    </div>
  );
}