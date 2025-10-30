import { Button } from '@/presentation/external/components/ui/button'
import { Card, CardContent } from '@/presentation/external/components/ui/card'

import { Form } from '../form/form'

export function CreateEdictSection() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Criar Novo Edital
          </h1>
          <p className="text-gray-600 text-lg">
            Defina os detalhes da oportunidade que ajudará a transformar novas
            ideias em startups reais.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <Form />
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="/" className="hover:text-[#5127FF] transition-colors">
                Suporte
              </a>
              <a href="/" className="hover:text-[#5127FF] transition-colors">
                Política de Privacidade
              </a>
              <a href="/" className="hover:text-[#5127FF] transition-colors">
                Termos de Uso
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Siga-nos:</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-[#5127FF]"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-[#5127FF]"
                >
                  Instagram
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-[#5127FF]"
                >
                  Twitter
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t">
            © 2025 Kadoo - Acelerando startups para transformar vidas
          </div>
        </div>
      </footer>
    </div>
  )
}
