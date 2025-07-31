# Rentify - Self-Hosted

Sistema completo e automatizzato per la gestione degli affitti, completamente self-hosted senza dipendenze da servizi esterni.

## 🚀 Caratteristiche

### Gestione Completa
- ✅ Gestione proprietà e inquilini
- ✅ Contratti digitali con firme elettroniche
- ✅ Sistema di pagamenti automatizzato
- ✅ Gestione coinquilini multipli
- ✅ Depositi cauzionali e spese

### Automazione
- ✅ Invio automatico ricevute via email
- ✅ Promemoria pagamenti programmati
- ✅ Generazione automatica canoni mensili
- ✅ Notifiche scadenza contratti
- ✅ Calcolo rivalutazione ISTAT

### Funzionalità Avanzate
- ✅ Sistema di manutenzioni e lavori
- ✅ Archivio digitale documenti
- ✅ Messaggistica interna
- ✅ Report contabili automatici
- ✅ Backup automatici
- ✅ Dashboard responsive

## 📋 Requisiti

- Node.js 18 o superiore
- 2GB RAM minimo
- 10GB spazio disco
- Sistema operativo: Linux, Windows, macOS

## 🛠️ Installazione

### Installazione Rapida

\`\`\`bash
# Clona il repository
git clone <repository-url>
cd rentify

# Esegui lo script di installazione
chmod +x scripts/install.sh
./scripts/install.sh

# Avvia l'applicazione
npm start
\`\`\`

### Installazione con Docker

\`\`\`bash
# Usando Docker Compose
docker-compose up -d

# L'applicazione sarà disponibile su http://localhost:3000
\`\`\`

### Installazione Manuale

\`\`\`bash
# Installa le dipendenze
npm install

# Crea le directory necessarie
mkdir -p data/{uploads,contracts,receipts,backups}
mkdir -p config templates/email

# Configura l'ambiente
cp .env.example .env.local
# Modifica .env.local con le tue configurazioni

# Esegui il setup iniziale
npm run setup

# Avvia l'applicazione
npm start
\`\`\`

## ⚙️ Configurazione

### Variabili d'Ambiente

Crea un file `.env.local` con le seguenti configurazioni:

\`\`\`env
# Database
DATABASE_PATH=./data/rental.db

# File Storage
UPLOADS_PATH=./data/uploads
CONTRACTS_PATH=./data/contracts
RECEIPTS_PATH=./data/receipts

# JWT Secret (CAMBIA QUESTO!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# SMTP Configuration
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_FROM=noreply@rentify.local

# Application
APP_URL=http://your-domain.com
NODE_ENV=production

# Admin User
ADMIN_EMAIL=admin@rentify.local
ADMIN_PASSWORD=secure-password
\`\`\`

### Configurazione SMTP

Per l'invio automatico delle email, configura un server SMTP:

#### Opzione 1: Server SMTP Esterno
- Gmail, Outlook, SendGrid, Mailgun, etc.

#### Opzione 2: Server SMTP Locale
- Postfix, Exim, o altri server SMTP

#### Opzione 3: MailHog (per testing)
\`\`\`bash
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
\`\`\`

## 🔧 Utilizzo

### Primo Accesso

1. Apri http://localhost:3000
2. Accedi con le credenziali admin
3. Cambia la password di default
4. Configura le impostazioni SMTP
5. Aggiungi la prima proprietà

### Funzionalità Principali

#### Gestione Proprietà
- Aggiungi proprietà con foto e dettagli
- Gestisci caratteristiche e servizi
- Carica documenti e certificati

#### Gestione Inquilini
- Profili completi con documenti
- Supporto per coinquilini multipli
- Storico pagamenti e comunicazioni

#### Contratti
- Generazione automatica contratti PDF
- Firme digitali (in sviluppo)
- Gestione scadenze e rinnovi

#### Pagamenti
- Tracking automatico pagamenti
- Generazione ricevute PDF
- Promemoria automatici via email

#### Manutenzioni
- Richieste di intervento
- Programmazione lavori
- Tracking costi e fornitori

## 🔒 Sicurezza

### Backup Automatici
Il sistema crea backup automatici del database:
- Backup giornalieri in `data/backups/`
- Retention di 30 giorni
- Backup manuali disponibili

### Sicurezza Dati
- Database SQLite crittografato
- Hash delle password con bcrypt
- JWT per autenticazione
- Upload file validati

### Accesso
- Autenticazione a due fattori (opzionale)
- Controllo accessi basato su ruoli
- Log delle attività utente

## 📊 Monitoraggio

### Health Check
\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`

### Log
I log sono disponibili in:
- Console dell'applicazione
- File di log (se configurato)
- Docker logs (se usando Docker)

## 🔄 Aggiornamenti

### Aggiornamento Manuale
\`\`\`bash
# Backup dei dati
cp -r data/ data_backup/

# Aggiorna il codice
git pull origin main

# Installa nuove dipendenze
npm install

# Esegui migrazioni database
npm run db:migrate

# Riavvia l'applicazione
npm restart
\`\`\`

### Aggiornamento Docker
\`\`\`bash
docker-compose pull
docker-compose up -d
\`\`\`

## 🛠️ Sviluppo

### Ambiente di Sviluppo
\`\`\`bash
# Installa dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev

# Esegui i test
npm test

# Build per produzione
npm run build
\`\`\`

### Struttura del Progetto
\`\`\`
├── app/                 # Next.js App Router
├── lib/                 # Librerie e utilities
├── scripts/             # Script di setup e manutenzione
├── data/                # Database e file utente
├── config/              # File di configurazione
├── templates/           # Template email
└── docker/              # File Docker
\`\`\`

## 📞 Supporto

### Documentazione
- [Wiki del progetto](wiki-url)
- [FAQ](faq-url)
- [Guide video](video-url)

### Community
- [Forum](forum-url)
- [Discord](discord-url)
- [GitHub Issues](issues-url)

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🤝 Contributi

I contributi sono benvenuti! Vedi `CONTRIBUTING.md` per le linee guida.

---

**Rentify** - La soluzione completa per la gestione professionale degli affitti, completamente self-hosted e open source.
