import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, FileText, CreditCard, Shield, Calendar, Mail, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Rentify</h1>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Accedi</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Registrati</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Gestione Affitti Semplificata con Rentify</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La piattaforma ideale per gestire i tuoi affitti in modo efficiente e senza stress. Automatizza le attività,
            monitora i pagamenti e semplifica la comunicazione con gli inquilini.
          </p>
          <div className="space-x-4">
            <Link href="/auth/register">
              <Button size="lg" className="px-8 py-3">
                Inizia Gratis
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                Vedi Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Funzionalità Complete</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Gestione Coinquilini</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gestisci più affittuari per ogni proprietà con contratti individuali e responsabilità condivise.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Firme Digitali</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Contratti digitali con firme elettroniche valide legalmente e archiviazione automatica.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Email Automatiche</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Invio automatico di ricevute, promemoria di pagamento e comunicazioni programmate.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Tracking Pagamenti</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitora pagamenti, depositi cauzionali e genera report automatici per ogni inquilino.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle className="text-lg">Sicurezza 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Accesso sicuro con crittografia avanzata e backup automatici dei dati.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-teal-600 mb-2" />
                <CardTitle className="text-lg">Contabilità</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gestione completa di entrate, spese e generazione automatica del bilancio.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-lg">Manutenzioni</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Programmazione e tracking di manutenzioni, pulizie e interventi tecnici.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-8 w-8 text-pink-600 mb-2" />
                <CardTitle className="text-lg">Gestione Proprietà</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Portfolio completo con contratti precompilati e revisione automatica dei canoni.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Funzionalità Avanzate</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Ricevute Elettroniche</h4>
              <p className="text-gray-600">Visualizza, stampa e archivia ricevute digitali senza carta</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Revisione Canone ISTAT</h4>
              <p className="text-gray-600">Calcolo automatico della rivalutazione annuale e imposte</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Sincronizzazione Bancaria</h4>
              <p className="text-gray-600">Importazione automatica delle transazioni bancarie</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Sistema Prenotazioni</h4>
              <p className="text-gray-600">Gestione affitti brevi e prenotazioni vacanze</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Posta Interna</h4>
              <p className="text-gray-600">Comunicazione diretta tra proprietari e inquilini</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Archivio Digitale</h4>
              <p className="text-gray-600">Archiviazione sicura di documenti, foto e fatture</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Semplifica la Gestione dei Tuoi Affitti con Rentify</h3>
          <p className="text-xl mb-8 opacity-90">
            Unisciti a migliaia di proprietari che hanno automatizzato la gestione dei loro immobili
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Prova Gratuita per 30 Giorni
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-lg font-semibold">Rentify</span>
              </div>
              <p className="text-gray-400">La soluzione completa per la gestione professionale degli affitti.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Prodotto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features">Funzionalità</Link>
                </li>
                <li>
                  <Link href="/pricing">Prezzi</Link>
                </li>
                <li>
                  <Link href="/demo">Demo</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Supporto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help">Centro Assistenza</Link>
                </li>
                <li>
                  <Link href="/contact">Contatti</Link>
                </li>
                <li>
                  <Link href="/docs">Documentazione</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legale</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms">Termini</Link>
                </li>
                <li>
                  <Link href="/cookies">Cookie</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rentify. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
