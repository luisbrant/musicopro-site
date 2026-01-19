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
    
    if (!name.trim() || !email.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

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

    // Fechar modal após sucesso
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      onClose();
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#1B4965]">
                📥 Baixar App Grátis
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                Preencha seus dados para receber o MusicoPro App e dicas exclusivas sobre gestão fiscal.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-[#1B4965]">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="border-[#D4A574] focus:border-[#1B4965]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-[#1B4965]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-[#D4A574] focus:border-[#1B4965]"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#E07856] hover:bg-[#D06846] text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Baixar App Grátis
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                ✓ Seu email está seguro. Nunca compartilhamos dados.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle2 size={48} className="text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1B4965]">Sucesso! 🎉</h3>
              <p className="text-sm text-gray-600 mt-2">
                Seu download começou. Verifique sua pasta de downloads.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Também enviamos um email com dicas exclusivas para {email}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
