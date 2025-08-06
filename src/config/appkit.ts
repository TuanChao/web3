// AppKit (formerly Web3Modal) configuration
// Note: This is optional and can be used as an alternative to RainbowKit

export const projectId = process.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

// For now, we'll use Wagmi configuration instead of AppKit
// If you want to use AppKit, install the correct packages:
// npm install @reown/appkit @reown/appkit-adapter-wagmi

export const appKitConfig = {
  projectId,
  // Add your AppKit configuration here when needed
}
