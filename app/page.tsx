import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, FileText, CreditCard, Mail, Shield, BarChart3, Calendar } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Rentify</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Accedi</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Registrati</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Gestisci i tuoi affitti con <span className="text-blue-600">Rentify</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sistema completo e self-hosted per la gestione automatizzata degli affitti. Contratti, pagamenti, inquilini
            e molto altro in un'unica piattaforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Inizia Gratis
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Vedi Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tutto quello che ti serve</h2>
            <p className="text-xl text-gray-600">Funzionalità complete per gestire ogni aspetto dei tuoi affitti</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Gestione Inquilini</CardTitle>
                <CardDescription>Profili completi, documenti, coinquilini e storico pagamenti</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Contratti Digitali</CardTitle>
                <CardDescription>Generazione automatica, firme digitali e archiviazione sicura</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Pagamenti</CardTitle>
                <CardDescription>Tracking automatico, ricevute elettroniche e promemoria</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Automazione</CardTitle>
                <CardDescription>Email automatiche, scadenze e notifiche personalizzate</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Self-Hosted</CardTitle>
                <CardDescription>Controllo completo dei tuoi dati, nessuna dipendenza esterna</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Report & Analytics</CardTitle>
                <CardDescription>Dashboard finanziarie, statistiche e report personalizzati</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Manutenzioni</CardTitle>
                <CardDescription>Programmazione lavori, richieste inquilini e tracking costi</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Multi-Proprietà</CardTitle>
                <CardDescription>Gestisci portfolio completi con dashboard centralizzata</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto a semplificare la gestione dei tuoi affitti?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Inizia oggi stesso con Rentify e automatizza la gestione delle tue proprietà
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary">
              Inizia Gratis Ora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Building2 className="h-6 w-6" />
              <span className="text-xl font-bold">Rentify</span>
            </div>
            <div className="text-gray-400">© 2024 Rentify. Sistema self-hosted per la gestione affitti.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
