import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Loader2, CheckCircle2 } from 'lucide-react';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  fileName: string;
}

export function EmailCaptureModal({ isOpen, onClose, downloadUrl, fileName }: EmailCaptureModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio para API de marketing (Mailchimp, ActiveCampaign, etc.)
    // Aqui você integraria com seu backend ou serviço de email
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsLoading(false);
    setIsSuccess(true);

    // Fechar modal após sucesso (opcional, ou deixar usuário ver a msg de sucesso)
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      onClose();
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1B4965] flex items-center gap-2">
            {isSuccess ? <CheckCircle2 className="text-green-500" /> : <Download className="text-[#E07856]" />}
            {isSuccess ? "Download Iniciado!" : "Baixar App Grátis"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess 
              ? "Seu download começou automaticamente. Verifique sua pasta de downloads."
              : "Digite seu melhor email para receber o App MusicoPro e dicas exclusivas de economia fiscal."}
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu Nome</Label>
              <Input 
                id="name" 
                placeholder="Ex: João Silva" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu Melhor Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Ex: joao@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#E07856] hover:bg-[#D06846] text-white font-bold py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparando Download...
                </>
              ) : (
                "Liberar Download Agora"
              )}
            </Button>
            <p className="text-xs text-center text-gray-400">
              🔒 Seus dados estão seguros. Zero spam.
            </p>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <p className="text-gray-600">
              Enquanto baixa, que tal conhecer o Kit Completo com E-book e Licença PRO?
            </p>
            <Button 
              variant="outline" 
              className="w-full border-[#1B4965] text-[#1B4965] hover:bg-blue-50"
              onClick={onClose}
            >
              Continuar Navegando
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
