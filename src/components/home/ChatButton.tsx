import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover">
            <MessageCircle className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-lg font-bold mb-2">Support en ligne</h2>
          <p>Posez votre question, nous vous répondrons rapidement !</p>
          <textarea className="w-full border rounded p-2 mt-2" rows={4} placeholder="Votre message..." />
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded">Envoyer</button>
        </DialogContent>
      </Dialog>
    </div>
  );
} 