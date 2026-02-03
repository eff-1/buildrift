'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GetStartedPage() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)
  const [walletAvailability, setWalletAvailability] = useState({
    metamask: false,
    coinbase: false,
    walletconnect: true // Always available as it's a protocol
  })

  // Check for existing wallet connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('buildrift_wallet')
    if (savedWallet) {
      // Auto-redirect to dashboard if already connected
      router.push('/dashboard')
      return
    }

    if (typeof window !== 'undefined') {
      setWalletAvailability({
        metamask: typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask,
        coinbase: typeof window.ethereum !== 'undefined' && window.ethereum.isCoinbaseWallet,
        walletconnect: true
      })
    }
  }, [router])

  // Toast notification system
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const wallets = [
    {
      name: 'MetaMask',
      icon: '/metamask.svg',
      description: 'Most popular Web3 wallet',
      color: 'bg-orange-50 border-orange-200 hover:border-orange-300',
      installed: walletAvailability.metamask
    },
    {
      name: 'WalletConnect',
      icon: '/wallet-connect.png',
      description: 'Connect any mobile wallet',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
      installed: walletAvailability.walletconnect
    },
    {
      name: 'Coinbase Wallet',
      icon: '/coinbase.png',
      description: 'Easy and secure',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
      installed: walletAvailability.coinbase
    }
  ]

  const [securityStep, setSecurityStep] = useState('')
  const [showSecurityAnimation, setShowSecurityAnimation] = useState(false)

  const securitySteps = [
    'Establishing secure connection...',
    'Encrypting data transmission...',
    'Verifying wallet authenticity...',
    'Securing your identity...',
    'Connection established ✓'
  ]

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true)
    setSelectedWallet(walletType)
    setShowSecurityAnimation(true)
    
    // Security animation sequence
    for (let i = 0; i < securitySteps.length; i++) {
      setSecurityStep(securitySteps[i])
      await new Promise(resolve => setTimeout(resolve, 800))
    }
    
    try {
      if (walletType === 'MetaMask') {
        if (walletAvailability.metamask) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
            // Save to localStorage for persistence
            localStorage.setItem('buildrift_wallet', accounts[0])
            localStorage.setItem('buildrift_wallet_type', 'MetaMask')
            showToast('Successfully connected to MetaMask!', 'success')
            // Redirect to dashboard after short delay
            setTimeout(() => {
              router.push('/dashboard')
            }, 1500)
          }
        } else {
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          if (isMobile) {
            window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`
          } else {
            showToast('Please install MetaMask browser extension to continue', 'error')
          }
        }
      } else if (walletType === 'Coinbase Wallet') {
        if (walletAvailability.coinbase) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
            localStorage.setItem('buildrift_wallet', accounts[0])
            localStorage.setItem('buildrift_wallet_type', 'Coinbase Wallet')
            showToast('Successfully connected to Coinbase Wallet!', 'success')
            setTimeout(() => {
              router.push('/dashboard')
            }, 1500)
          }
        } else {
          showToast('Coinbase Wallet not detected. Please install the extension or app.', 'error')
        }
      } else if (walletType === 'WalletConnect') {
        // For now, simulate WalletConnect - in production you'd use @walletconnect/web3-provider
        showToast('WalletConnect integration coming soon! Use MetaMask for now.', 'info')
        // Simulate connection for demo
        await new Promise(resolve => setTimeout(resolve, 1000))
        const demoAddress = '0x1234...5678'
        setWalletAddress(demoAddress)
        localStorage.setItem('buildrift_wallet', demoAddress)
        localStorage.setItem('buildrift_wallet_type', 'WalletConnect')
        showToast('Demo connection established!', 'success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      if (error.code === 4001) {
        showToast('Connection rejected by user', 'error')
      } else {
        showToast('Connection failed. Please try again.', 'error')
      }
    } finally {
      setIsConnecting(false)
      setSelectedWallet(null)
      setShowSecurityAnimation(false)
      setSecurityStep('')
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.3), rgba(248, 250, 252, 0.5)), url('/get-started-bg.jpg')`
      }}
    >
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center gap-2">
            {toast.type === 'success' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-gray-900">
              BUILDRIFT
            </Link>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Start Your Builder
              <br />
              <span className="text-blue-600">Journey</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect your wallet to create a verified identity that proves your contributions 
              across all WebZero events and hackathons.
            </p>
          </div>

          {/* Why Connect Section - Only show when not connected */}
          {!walletAddress && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Connect Your Wallet?</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prove Your Work</h3>
                  <p className="text-gray-600 text-sm">Get verified proof of your hackathon contributions and workshop attendance</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Build Reputation</h3>
                  <p className="text-gray-600 text-sm">Earn points and build a portfolio that follows you across all events</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Recognized</h3>
                  <p className="text-gray-600 text-sm">Stand out to sponsors, employers, and other builders in the ecosystem</p>
                </div>
              </div>
            </div>
          )}

          {!walletAddress ? (
            /* Wallet Selection */
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Wallet</h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting || !wallet.installed}
                    className={`${wallet.color} border-2 rounded-xl p-6 text-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative ${
                      selectedWallet === wallet.name ? 'ring-2 ring-blue-500' : ''
                    } ${!wallet.installed ? 'grayscale' : ''}`}
                  >
                    <div className="mb-3 flex justify-center">
                      {wallet.icon.startsWith('/') ? (
                        <Image 
                          src={wallet.icon} 
                          alt={wallet.name}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="text-4xl">{wallet.icon}</div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                      {wallet.name}
                      {wallet.installed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {wallet.name === 'WalletConnect' ? 'Available' : 'Installed'}
                        </span>
                      )}
                      {!wallet.installed && wallet.name !== 'WalletConnect' && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                          Not Installed
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm">{wallet.description}</p>
                    
                    {selectedWallet === wallet.name && isConnecting && (
                      <div className="absolute inset-0 bg-white/90 rounded-xl flex flex-col items-center justify-center">
                        <div className="relative mb-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <div className="absolute inset-0 animate-ping rounded-full h-8 w-8 border border-blue-400 opacity-30"></div>
                        </div>
                        {showSecurityAnimation && (
                          <div className="text-center">
                            <div className="text-xs text-gray-600 mb-2">🔒 Secure Connection</div>
                            <div className="text-xs text-blue-600 font-medium animate-pulse">
                              {securityStep}
                            </div>
                            <div className="flex justify-center mt-2 space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-1 rounded-full ${
                                    securitySteps.indexOf(securityStep) >= i ? 'bg-blue-600' : 'bg-gray-300'
                                  } transition-colors duration-300`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 className="font-semibold text-green-800">Secure Connection</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Only your wallet address is requested</li>
                  <li>• Your funds remain completely safe</li>
                  <li>• You stay in full control</li>
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  {walletAvailability.metamask 
                    ? "MetaMask detected! Click to connect securely." 
                    : "New to Web3? We recommend starting with MetaMask"
                  }
                </p>
                {!walletAvailability.metamask && (
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Download MetaMask →
                  </a>
                )}
              </div>
            </div>
          ) : (
            /* Connected State - Simple Success Message */
            <div className="bg-green-50 rounded-2xl border-2 border-green-200 p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connection Successful! 🎉
              </h2>
              <p className="text-gray-600 mb-2">
                Redirecting to your dashboard...
              </p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}