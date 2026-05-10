import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "Aceitação dos termos",
    content: `Ao acessar ou usar a Verdara ("Plataforma"), você concorda com estes Termos de Serviço e com a legislação aplicável.

Se não concordar, não deve utilizar este site. Estes termos se aplicam a visitantes, usuários e qualquer pessoa que acesse a Plataforma.`
  },
  {
    title: "Descrição do serviço",
    content: `A Verdara é uma plataforma de descoberta de fragrâncias que oferece:

- Banco de dados de fragrâncias e informações de perfumes
- Avaliações, notas e discussões da comunidade
- Recomendações personalizadas e ferramentas de descoberta
- Recursos de coleção e lista de desejos
- Conteúdo educativo sobre perfumaria

Podemos modificar, suspender ou encerrar qualquer parte da Plataforma a qualquer momento, sem aviso prévio.`
  },
  {
    title: "Contas de usuário",
    content: `Para acessar alguns recursos, você pode precisar criar uma conta. Você concorda em:

- Fornecer informações corretas e atualizadas
- Manter a segurança da senha e da conta
- Assumir responsabilidade pelas atividades da conta
- Informar uso não autorizado imediatamente

Podemos suspender ou encerrar contas que violem estes termos ou pratiquem atividade fraudulenta/prejudicial.`
  },
  {
    title: "Conteúdo do usuário",
    content: `Você mantém a titularidade do conteúdo enviado (avaliações, comentários, notas e coleções). Ao enviar conteúdo, concede à Verdara licença mundial, não exclusiva e sem royalties para uso no contexto da Plataforma.

Seu conteúdo não pode:
- Violar propriedade intelectual de terceiros
- Conter informações falsas, enganosas ou difamatórias
- Incluir spam, publicidade ou promoção indevida
- Violar leis e regulamentos aplicáveis
- Conter material ofensivo ou inadequado`
  },
  {
    title: "Propriedade intelectual",
    content: `A Plataforma e seu conteúdo original (exceto conteúdo de usuário) pertencem à Verdara e são protegidos por leis de propriedade intelectual.

Você não pode:
- Copiar, modificar ou distribuir conteúdo sem permissão
- Usar nome, logo ou marcas da Verdara sem autorização
- Fazer engenharia reversa ou tentar extrair código-fonte
- Usar sistemas automatizados sem permissão`
  },
  {
    title: "Atividades proibidas",
    content: `Você concorda em não praticar:

- Violação de leis e regulamentos
- Falsidade de identidade
- Interferência no funcionamento da Plataforma
- Tentativa de acesso não autorizado
- Uso comercial sem autorização
- Coleta de dados sem consentimento
- Envio de vírus, malware ou código malicioso
- Conduta que limite o uso da Plataforma por terceiros`
  },
  {
    title: "Links de terceiros",
    content: `A Plataforma pode conter links para sites e serviços de terceiros. A Verdara não controla e não se responsabiliza por conteúdo, políticas ou práticas desses terceiros.`
  },
  {
    title: "Isenção de garantias",
    content: `A PLATAFORMA É OFERECIDA "NO ESTADO EM QUE SE ENCONTRA" E "CONFORME DISPONIBILIDADE". A VERDARA NÃO OFERECE GARANTIAS EXPRESSAS OU IMPLÍCITAS.

Não garantimos que:
- A Plataforma funcione sem interrupções ou erros
- Os resultados sejam sempre precisos
- Todas as falhas sejam corrigidas`
  },
  {
    title: "Limitação de responsabilidade",
    content: `EM NENHUMA HIPÓTESE A VERDARA SERÁ RESPONSÁVEL POR DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS OU CONSEQUENCIAIS DECORRENTES DE:

- Uso ou impossibilidade de uso da Plataforma
- Conduta ou conteúdo de terceiros
- Conteúdo obtido na Plataforma
- Acesso não autorizado aos seus dados ou transmissões`
  },
  {
    title: "Indenização",
    content: `Você concorda em indenizar a Verdara por reclamações, danos, perdas e custos decorrentes de:

- Seu uso da Plataforma
- Violação destes Termos
- Violação de direitos de terceiros
- Reclamações relacionadas ao conteúdo enviado por você`
  },
  {
    title: "Lei aplicável",
    content: `Estes Termos são regidos pelas leis do Estado da Califórnia, Estados Unidos.

Se qualquer disposição for considerada inválida, as demais permanecem em vigor.`
  },
  {
    title: "Alterações nos termos",
    content: `Podemos atualizar estes Termos a qualquer momento. Em caso de alterações relevantes, publicaremos um aviso com antecedência razoável.

Ao continuar usando a Plataforma após as alterações, você concorda com os novos termos.`
  },
  {
    title: "Contato",
    content: `Se tiver dúvidas sobre estes Termos, entre em contato:

E-mail: legal@verdara.com
Endereço: 123 Fragrance Way, San Francisco, CA 94102`
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              Termos de Serviço
            </h1>
            <p className="mt-4 text-muted-foreground">
              Última atualização: 26 de abril de 2026
            </p>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Leia estes Termos de Serviço com atenção antes de usar a Verdara. Seu acesso e uso dependem da sua concordância com estas regras.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm text-muted-foreground whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}