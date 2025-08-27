'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api'; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type CalculationMode = 'totalDays' | 'chaptersPerday';

export default function HomePage() {
  // Pega o estado e as ações do nosso store de autenticação
  const { isAuthenticated, user, setUser, logout } = useAuthStore();
  
  // Estados específicos da calculadora
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('totalDays');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efeito que roda ao carregar a página para buscar os dados do usuário
  useEffect(() => {
    // Se o estado diz que estamos autenticados, mas ainda não temos os dados do usuário...
    if (isAuthenticated && !user) {
      const fetchUser = async () => {
        try {
          // Usamos nosso serviço `api` para chamar a rota protegida
          const userData = await api('/api/me');
          // Salvamos os dados do usuário (id, email) no nosso estado global
          setUser(userData);
        } catch (error) {
          console.error("Sessão inválida. Deslogando...", error);
          // Se o token for inválido (expirado, etc.), o erro será capturado e deslogamos o usuário
          logout();
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, user, setUser, logout]);

  // Funções da calculadora (sem alterações na lógica)
  const handleModeChange = (mode: CalculationMode) => {
    if (mode) {
      setCalculationMode(mode);
      setInputValue('');
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericValue = parseInt(inputValue, 10);
    if (isNaN(numericValue) || numericValue <= 0) {
      setError('Por favor, insira um número inteiro e positivo.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);

    const endpoint = calculationMode === 'totalDays' ? '/api/calculate-total-days' : '/api/calculate-chapters-per-day';
    const body = {
      [calculationMode === 'totalDays' ? 'chaptersPerDay' : 'totalDays']: numericValue
    };

    try {
      // Usamos nosso serviço `api` aqui também. Se o usuário estiver logado, o token será enviado.
      const data = await api(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const resultValue = data.totalDays || data.chaptersPerDay;
      setResult(resultValue);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 font-sans relative">
      
      {/* Cabeçalho que muda dependendo se o usuário está logado ou não */}
      <header className="absolute top-4 right-4 flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-sm text-muted-foreground">Olá, {user.email}</span>
            <Button onClick={logout} variant="outline">Sair</Button>
          </>
        ) : (
          <div className="space-x-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        )}
      </header>

      {/* Conteúdo principal que também muda */}
      {isAuthenticated ? (
        // Se estiver logado, mostra a calculadora
        <Card className="w-full max-w-md animate-in fade-in-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl tracking-tight">Calculadora de Leitura da Bíblia</CardTitle>
            <CardDescription>Planeje sua jornada de leitura por capítulos.</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={calculationMode}
              onValueChange={(value) => handleModeChange(value as CalculationMode)}
              className="grid grid-cols-2 mb-6"
            >
              <ToggleGroupItem value="totalDays">Calcular Dias</ToggleGroupItem>
              <ToggleGroupItem value="chaptersPerDay">Calcular Capítulos/Dia</ToggleGroupItem>
            </ToggleGroup>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inputValue">
                  {calculationMode === 'totalDays'
                    ? 'Quantos capítulos você lerá por dia?'
                    : 'Em quantos dias você quer ler a Bíblia?'}
                </Label>
                <Input 
                  id="inputValue"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite um número"
                  min="1"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Calculando...' : 'Calcular'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="mt-4 h-16 flex items-center justify-center">
            {error && <p className="text-destructive font-semibold">{error}</p>}
            {result !== null && (
              <p className="text-green-500 text-lg font-semibold text-center">
                {calculationMode === 'totalDays'
                  ? `Você levará ${result} dias para ler a Bíblia toda.`
                  : `Você precisará ler ${result} capítulos por dia.`}
              </p>
            )}
          </CardFooter>
        </Card>
      ) : (
        // Se não estiver logado, mostra a tela de boas-vindas
        <div className="text-center animate-in fade-in-50">
            <h1 className="text-4xl font-bold">Bem-vindo à Calculadora Bíblica</h1>
            <p className="text-lg mt-2 text-muted-foreground">Faça login ou cadastre-se para começar a planejar.</p>
        </div>
      )}
      
    </main>
  );
}