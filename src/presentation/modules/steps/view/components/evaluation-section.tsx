"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/presentation/external/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/external/components/ui/card";
import { Textarea } from "@/presentation/external/components/ui/textarea";

export function EvaluationSection({ stepId }: { stepId: number }) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // aqui você pode fazer um kyClient.post("/step-evaluation", { stepId, rating, description })
    console.log({ stepId, rating, description });
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Avaliação da etapa
        </CardTitle>
        <p className="text-sm text-slate-500">
          Como foi essa etapa para você? Avalie de 1 a 5 estrelas e, se quiser,
          deixe um comentário.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <RatingStars value={rating} onChange={setRating} />
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="">
              Comentário (opcional)
            </label>
            <Textarea
              placeholder="Ex.: conteúdo claro, horário bom, poderia ter mais exemplos..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#5127FF] hover:bg-[#4220d0] text-white"
            disabled={rating === 0}
          >
            Enviar avaliação
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function RatingStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="group"
        >
          <Star
            className={
              star <= value
                ? "w-6 h-6 text-[#F4DA02] fill-[#F4DA02]"
                : "w-6 h-6 text-slate-300 group-hover:text-[#F4DA02]"
            }
          />
        </button>
      ))}
    </div>
  );
}
