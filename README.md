# BUILDRIFT

**Proof of real builders. Not just attendance.**

BUILDRIFT transforms Web3 events into verifiable builder reputation that sponsors and employers actually trust.

## 🎯 The Problem

WebZero cannot reliably prove who actually contributed, learned, shipped, or mentored during events — which weakens sponsor ROI, hiring pipelines, and long-term community value.

## 🚀 The Solution

- **Wallet-Based Identity**: One wallet = one identity across all events
- **Organizer Verification**: Only event organizers can verify contributions  
- **Enterprise Analytics**: Sponsor-grade data and metrics

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Auth**: SIWE (Sign-In With Ethereum)
- **Storage**: IPFS for attestations
- **Hosting**: Vercel

## 🏃‍♂️ Getting Started

```bash
# Clone the repository
git clone https://github.com/eff-1/buildrift.git
cd buildrift

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and WalletConnect credentials

# Run development server
npm run dev
```

## 🌐 Live Demo

Visit: [buildrift.vercel.app](https://buildrift.vercel.app)

## 📊 Features

### For Builders
- Connect wallet to create verified identity
- Earn reputation through event participation
- Public profile showcasing verified contributions
- Portable reputation across all events

### For Organizers (WebZero)
- Create and manage events
- Define custom actions and point values
- Verify builder contributions
- Access comprehensive analytics dashboard
- Export sponsor-ready reports

### For Sponsors
- View real engagement metrics
- Identify top contributors
- Track completion rates
- Measure actual ROI

## 🏗 Architecture

```
Frontend (Next.js) → Supabase (Database) → IPFS (Attestations)
```

## 🔐 Security

- Wallet-based authentication prevents identity fraud
- Organizer-only verification prevents self-claiming
- Cryptographic attestations stored on IPFS
- Complete audit trails for all verifications

## 📈 Roadmap

- [x] Landing page and branding
- [ ] Wallet authentication (SIWE)
- [ ] Event creation and management
- [ ] Action definition system
- [ ] Verification workflow
- [ ] Builder profiles
- [ ] Analytics dashboard
- [ ] Demo data population

## 🤝 Contributing

Built for WebZero events. Enterprise-grade event infrastructure.

## 📄 License

MIT License - see LICENSE file for details.

---

© 2026 BUILDRIFT. Enterprise-grade event infrastructure.





