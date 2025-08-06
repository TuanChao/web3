# Web3 DApp

A modern Web3 frontend application built with React, TypeScript, Vite, and Wagmi. This project provides a solid foundation for building decentralized applications with a clean, responsive UI and robust Web3 integrations.

## 🚀 Features

- **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, Optimism, Base
- **Wallet Integration**: Multiple wallet providers support
- **Modern UI**: Clean design with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Fast Development**: Vite for lightning-fast HMR
- **Responsive Design**: Mobile-first approach
- **Extensible Architecture**: Well-organized folder structure

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Web3**: Wagmi, Viem, RainbowKit
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Icons**: Heroicons, Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd web3dev
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_REOWN_PROJECT_ID=your_reown_project_id
```

5. Start the development server:
```bash
npm run dev
```

## 🏗 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Generic UI components
│   └── web3/           # Web3-specific components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── lib/                # Third-party integrations
├── pages/              # Page components
├── services/           # External API services
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## 🎯 Getting Started

### Connect Your Wallet

1. Click on "Connect Wallet" button
2. Choose your preferred wallet provider
3. Approve the connection request

### Switch Networks

1. Use the Chain Switcher component
2. Select your desired network
3. Approve the network switch in your wallet

### Add Features

1. Create new components in appropriate folders
2. Use existing hooks and utilities
3. Follow the established patterns

## 🔧 Configuration

### Wagmi Configuration

Edit `src/config/wagmi.ts` to modify:
- Supported chains
- Wallet connectors
- Transport providers

### Environment Variables

Required variables in `.env.local`:
- `VITE_WALLETCONNECT_PROJECT_ID`: Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)
- `VITE_REOWN_PROJECT_ID`: Get from [Reown](https://reown.com/)

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Use Tailwind classes for component styling

### Adding New Chains

1. Import chain from `wagmi/chains`
2. Add to `chains` array in `wagmi.ts`
3. Add transport configuration
4. Update chain switcher component

### Adding New Components

1. Create in appropriate folder (`ui/` or `web3/`)
2. Export from `index.ts`
3. Use TypeScript interfaces
4. Follow existing patterns

## 🔗 Useful Links

- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [RainbowKit Documentation](https://rainbowkit.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)

## 📄 License

MIT License - see LICENSE file for details
