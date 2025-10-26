import { Card, CardContent } from "@/presentation/external/components/ui/card";

export function WelcomeBanner({ name }: { name: string }) {
  return (
    <Card className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold capite">Bem-vindo, <span className="capitalize">{name}</span>! 👋</h2>
            <p className="text-xl text-white/90">Pronto para transformar sua ideia em realidade?</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}