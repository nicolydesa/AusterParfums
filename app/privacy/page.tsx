import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "Informações que coletamos",
    content: `Coletamos informações fornecidas diretamente por você, como ao criar uma conta, publicar avaliações ou entrar em contato:

- Nome e endereço de e-mail
- Informações de perfil e preferências
- Avaliações e notas de fragrâncias
- Dados de coleção e lista de desejos
- Comunicações com nossa equipe

Também coletamos automaticamente dados de uso, como dispositivo, IP e navegação, por meio de cookies e tecnologias semelhantes.`
  },
  {
    title: "Como usamos suas informações",
    content: `Usamos os dados coletados para:

- Fornecer, manter e melhorar os serviços
- Personalizar recomendações de fragrâncias
- Gerenciar sua conta e perfil
- Enviar novidades e comunicações de marketing (com consentimento)
- Responder a comentários, dúvidas e solicitações
- Monitorar e analisar o uso da plataforma
- Detectar e prevenir fraudes e atividades ilegais
- Cumprir obrigações legais`
  },
  {
    title: "Compartilhamento de informações",
    content: `Não vendemos seus dados pessoais. Podemos compartilhar informações nas seguintes situações:

- Com seu consentimento ou por sua solicitação
- Com prestadores de serviço que atuam em nosso nome
- Para cumprimento de obrigações legais
- Para proteger direitos, privacidade e segurança da Verdara, de você ou de terceiros
- Em operações societárias (fusão, aquisição ou venda de ativos)

Informações públicas de perfil, avaliações e notas podem ser visíveis para outros usuários.`
  },
  {
    title: "Segurança de dados",
    content: `Aplicamos medidas técnicas e organizacionais para proteger seus dados contra acesso, alteração, divulgação ou destruição não autorizados.

Usamos criptografia, servidores seguros e revisões periódicas. Ainda assim, nenhum método de transmissão ou armazenamento é 100% seguro.`
  },
  {
    title: "Seus direitos e escolhas",
    content: `Você possui direitos sobre seus dados pessoais:

- Acesso: solicitar quais dados mantemos sobre você
- Correção: atualizar dados nas configurações da conta
- Exclusão: solicitar remoção da conta e dados relacionados
- Opt-out: deixar de receber comunicações de marketing
- Portabilidade: solicitar cópia dos dados em formato portável

Para exercer esses direitos, escreva para privacy@verdara.com.`
  },
  {
    title: "Cookies e rastreamento",
    content: `Usamos cookies e tecnologias similares para entender sua navegação. Você pode gerenciar preferências no seu navegador.

Tipos de cookies:
- Essenciais: funcionamento básico do site
- Analíticos: entendimento de uso da plataforma
- Preferências: memorização de configurações
- Marketing: exibição de comunicações relevantes`
  },
  {
    title: "Privacidade de crianças",
    content: `Nossos serviços não são destinados a menores de 13 anos. Não coletamos intencionalmente dados pessoais de crianças. Se identificarmos coleta indevida, removeremos as informações.`
  },
  {
    title: "Transferências internacionais",
    content: `Seus dados podem ser transferidos e processados em outros países, cujas leis de proteção podem ser diferentes das do seu país. Adotamos salvaguardas apropriadas para manter a proteção dos dados.`
  },
  {
    title: "Alterações nesta política",
    content: `Podemos atualizar esta Política de Privacidade periodicamente. As mudanças serão publicadas nesta página com a data de última atualização revisada.`
  },
  {
    title: "Contato",
    content: `Se tiver dúvidas sobre esta Política de Privacidade, fale com a gente:

E-mail: privacy@verdara.com
Endereço: 123 Fragrance Way, San Francisco, CA 94102`
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              Política de Privacidade
            </h1>
            <p className="mt-4 text-muted-foreground">
              Última atualização: 26 de abril de 2026
            </p>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Na Verdara, levamos sua privacidade a sério. Esta política explica como coletamos, usamos, compartilhamos e protegemos suas informações.
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