<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Web3 DApp Project Instructions

This is a modern Web3 frontend application built with:

## Tech Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wagmi** for Web3 interactions
- **RainbowKit** for wallet connections
- **Tailwind CSS** for styling
- **TanStack Query** for data fetching

## Project Structure
- `src/components/` - Reusable UI and Web3 components
  - `ui/` - Generic UI components (Button, Card, etc.)
  - `web3/` - Web3-specific components (ConnectWallet, WalletInfo, etc.)
- `src/config/` - Configuration files for Wagmi, constants, etc.
- `src/hooks/` - Custom React hooks
- `src/pages/` - Page components
- `src/services/` - External API services
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions

## Coding Guidelines
1. Use TypeScript for all files
2. Follow React functional components with hooks
3. Use Tailwind CSS for styling
4. Implement proper error handling for Web3 interactions
5. Use the custom utility functions from `src/utils/`
6. Follow the established component patterns in `ui/` folder
7. Use Wagmi hooks for all Web3 operations
8. Maintain consistent file naming (PascalCase for components, camelCase for utilities)

## Web3 Patterns
- Always check wallet connection status before Web3 operations
- Handle network switching gracefully
- Provide loading states for blockchain interactions
- Display user-friendly error messages
- Format addresses and balances consistently

## UI/UX Guidelines
- Use the established design system from `components/ui/`
- Maintain responsive design principles
- Provide clear feedback for user actions
- Follow accessibility best practices
