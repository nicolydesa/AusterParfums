"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { User } from "lucide-react"

type Mode = "login" | "register"

type SessionUser = {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function PerfilPage() {
  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const [session, setSession] = useState<SessionUser | null>(null)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [authSubmitting, setAuthSubmitting] = useState(false)

  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [saveProfileLoading, setSaveProfileLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const loadSession = useCallback(async () => {
    setSessionLoading(true)
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" })
      const data = await res.json()
      if (data.user) {
        setSession(data.user)
        setEditName(data.user.name)
        setEditEmail(data.user.email)
      } else {
        setSession(null)
      }
    } catch {
      setSession(null)
    } finally {
      setSessionLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSession()
  }, [loadSession])

  const resetForm = () => {
    setName("")
    setEmail("")
    setPassword("")
  }

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")

    if (!email.trim() || !password.trim() || (mode === "register" && !name.trim())) {
      setMessage("Preencha todos os campos obrigatórios.")
      return
    }

    setAuthSubmitting(true)
    try {
      if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (!res.ok) {
          setMessage(data.error ?? "Não foi possível cadastrar.")
          return
        }
        setSession(data.user)
        setEditName(data.user.name)
        setEditEmail(data.user.email)
        setMessage("Cadastro realizado com sucesso.")
        resetForm()
        return
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error ?? "Não foi possível entrar.")
        return
      }
      setSession(data.user)
      setEditName(data.user.name)
      setEditEmail(data.user.email)
      setMessage("Login realizado com sucesso.")
      resetForm()
    } catch {
      setMessage("Falha de rede. Tente novamente.")
    } finally {
      setAuthSubmitting(false)
    }
  }

  const handleLogout = async () => {
    setMessage("")
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    } catch {
      /* still clear UI */
    }
    setSession(null)
    setCurrentPassword("")
    setNewPassword("")
    setMessage("Você saiu da sua conta.")
  }

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")

    const emailChanged = editEmail.trim().toLowerCase() !== session?.email
    const passwordChangeRequested = newPassword.trim().length > 0

    if (passwordChangeRequested && newPassword.length < 8) {
      setMessage("A nova senha deve ter no mínimo 8 caracteres.")
      return
    }

    if ((emailChanged || passwordChangeRequested) && !currentPassword) {
      setMessage("Informe a senha atual para alterar e-mail ou senha.")
      return
    }

    setSaveProfileLoading(true)
    try {
      const body: Record<string, string> = {
        name: editName.trim(),
        email: editEmail.trim().toLowerCase(),
      }
      if (currentPassword) body.currentPassword = currentPassword
      if (passwordChangeRequested) body.newPassword = newPassword

      const res = await fetch("/api/user", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error ?? "Não foi possível salvar.")
        return
      }
      setSession(data.user)
      setEditName(data.user.name)
      setEditEmail(data.user.email)
      setCurrentPassword("")
      setNewPassword("")
      setMessage("Perfil atualizado.")
    } catch {
      setMessage("Falha de rede. Tente novamente.")
    } finally {
      setSaveProfileLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    setMessage("")
    try {
      const res = await fetch("/api/user", { method: "DELETE", credentials: "include" })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error ?? "Não foi possível excluir a conta.")
        setDeleteOpen(false)
        return
      }
      setSession(null)
      setDeleteOpen(false)
      setMessage("Sua conta foi excluída.")
    } catch {
      setMessage("Falha de rede. Tente novamente.")
      setDeleteOpen(false)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">Perfil</h1>
            </div>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Entre na sua conta para acompanhar seus favoritos e continuar sua jornada olfativa.
            </p>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            {sessionLoading ? (
              <p className="text-sm text-muted-foreground">Carregando…</p>
            ) : session ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conta conectada</CardTitle>
                    <CardDescription>
                      Atualize seus dados. Para alterar e-mail ou senha, informe a senha atual.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={handleSaveProfile}>
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Nome</Label>
                        <Input
                          id="edit-name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">E-mail</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Conta criada em {new Date(session.createdAt).toLocaleDateString("pt-BR")}
                      </p>

                      <Separator className="my-2" />

                      <div className="space-y-2">
                        <Label htmlFor="new-pass">Nova senha (opcional)</Label>
                        <Input
                          id="new-pass"
                          type="password"
                          autoComplete="new-password"
                          placeholder="Mín. 8 caracteres"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="current-pass">Senha atual</Label>
                        <Input
                          id="current-pass"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Obrigatória se alterar e-mail ou senha"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>

                      <Button className="w-full" type="submit" disabled={saveProfileLoading}>
                        {saveProfileLoading ? "Salvando…" : "Salvar alterações"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="w-full sm:flex-1" onClick={handleLogout}>
                    Sair
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={() => setDeleteOpen(true)}
                  >
                    Excluir conta
                  </Button>
                </div>

                {message && <p className="text-sm text-muted-foreground">{message}</p>}

                <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir conta</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Todos os seus dados de perfil serão removidos do banco de
                        dados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={deleteLoading}>Cancelar</AlertDialogCancel>
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={deleteLoading}
                        onClick={() => void handleDeleteAccount()}
                      >
                        {deleteLoading ? "Excluindo…" : "Excluir definitivamente"}
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{mode === "login" ? "Entrar" : "Criar conta"}</CardTitle>
                  <CardDescription>
                    {mode === "login"
                      ? "Use seu e-mail e senha para acessar sua conta."
                      : "Cadastre-se em poucos segundos para salvar seus perfumes favoritos."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-2 gap-2">
                    <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")}>
                      Login
                    </Button>
                    <Button variant={mode === "register" ? "default" : "outline"} onClick={() => setMode("register")}>
                      Registro
                    </Button>
                  </div>

                  <form className="space-y-4" onSubmit={handleAuthSubmit}>
                    {mode === "register" && (
                      <Input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                    <Input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder={mode === "register" ? "Senha (mín. 8 caracteres)" : "Sua senha"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className="w-full" type="submit" disabled={authSubmitting}>
                      {authSubmitting ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
                    </Button>
                  </form>

                  {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
