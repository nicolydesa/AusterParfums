"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare, HelpCircle, Building } from "lucide-react"

const contactOptions = [
  {
    icon: HelpCircle,
    title: "Suporte geral",
    description: "Dúvidas sobre como usar a Verdara? Estamos aqui para ajudar.",
    email: "support@verdara.com"
  },
  {
    icon: Building,
    title: "Negócios",
    description: "Parcerias, imprensa e colaborações com marcas.",
    email: "business@verdara.com"
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "Ideias para melhorar a Verdara? A gente adoraria ouvir você.",
    email: "feedback@verdara.com"
  },
]

const faqs = [
  {
    question: "Como adiciono um perfume à minha coleção?",
    answer: "Entre em qualquer página de perfume e clique em “Adicionar à lista de desejos”. Você pode gerenciar sua coleção pelo seu perfil."
  },
  {
    question: "Posso enviar um novo perfume para o banco de dados?",
    answer: "Sim! Membros da comunidade podem sugerir fragrâncias por um formulário. Nosso time revisa tudo para manter a qualidade."
  },
  {
    question: "Como funciona o algoritmo de similaridade?",
    answer: "Ele analisa notas, acordes e preferências para sugerir perfumes parecidos. Quanto mais você usa a plataforma, melhores ficam as recomendações."
  },
  {
    question: "A Verdara é gratuita?",
    answer: "Sim, a Verdara é gratuita. Podemos adicionar recursos premium no futuro, mas as funções principais continuarão gratuitas."
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em producao, aqui enviaria os dados para uma API
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
                Fale com a gente
              </h1>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Tem uma dúvida, sugestão ou só quer dizer oi? A gente adoraria ouvir você.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-6">
              {contactOptions.map((option) => (
                <div key={option.title} className="bg-card rounded-xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{option.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
                  <a
                    href={`mailto:${option.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {option.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Enviar mensagem
                </h2>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-emerald-900">Mensagem enviada!</h3>
                    <p className="mt-2 text-emerald-700">
                      Obrigado por entrar em contato. Vamos responder em até 24–48 horas.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: "", email: "", subject: "", message: "" })
                      }}
                    >
                      Enviar outra mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nome
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="voce@exemplo.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Assunto
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Sobre o que é?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Conte mais..."
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Enviar mensagem
                    </Button>
                  </form>
                )}
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Perguntas frequentes
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border">
                      <h3 className="font-medium text-foreground">{faq.question}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
