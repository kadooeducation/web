import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { Form } from "../form/form";
import { EdictDTO } from "@/infra/modules/edict/dto/edict-dto";

interface EditEdictSectonProps {
  edict: EdictDTO
}

export async function EditEdictSection({ edict }: EditEdictSectonProps) {

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edite aqui o edital</h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <Form edict={edict} />
          </CardContent>
        </Card>
      </main>


    </div>
  )
}