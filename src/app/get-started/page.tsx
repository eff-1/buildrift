'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GetStartedPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const wallets = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Most popular Web3 wallet',
      color: 'bg-orange-100 border-orange-200 hover:border-orange-300'
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect any mobile wallet',
      color: 'bg-blue-100 border-blue-200 hover:border-blue-300'
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Easy and secure',
      color: 'bg-blue-100 border-blue-200 hover:border-blue-300'
    }
  ]

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true)
    setSelectedWallet(walletType)
    
    try {
      if (walletType === 'MetaMask') {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          }
        } else {
          alert('Please install MetaMask to continue')
        }
      } else {
        // For demo purposes, simulate other wallet connections
        setTimeout(() => {
          setWalletAddress('0x1234...5678') // Demo address
        }, 2000)
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
      setSelectedWallet(null)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
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

          {/* Why Connect Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 mb-12">
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
          {!walletAddress ? (
            /* Wallet Selection */
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Wallet</h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting}
                    className={`${wallet.color} border-2 rounded-xl p-6 text-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedWallet === wallet.name ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="text-4xl mb-3">{wallet.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{wallet.name}</h3>
                    <p className="text-gray-600 text-sm">{wallet.description}</p>
                    {selectedWallet === wallet.name && isConnecting && (
                      <div className="mt-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  New to Web3? We recommend starting with MetaMask
                </p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Download MetaMask →
                </a>
              </div>
            </div>
          ) : (
            /* Connected State & Next Steps */
            <div className="space-y-8">
              {/* Success Message */}
              <div className="bg-green-50 rounded-2xl border-2 border-green-200 p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to BUILDRIFT! 🎉
                </h2>
                <p className="text-gray-600 mb-2">
                  Your verified builder identity:
                </p>
                <p className="font-mono text-lg text-gray-900 bg-white px-4 py-2 rounded-lg inline-block mb-6">
                  {formatAddress(walletAddress)}
                </p>
              </div>
              {/* Next Steps */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Next?</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1
                      </div>
                      <h3 className="font-semibold text-gray-900">Join WebZero Events</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Attend hackathons, workshops, and builder houses organized by WebZero
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full">
                      Browse Events
                    </button>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2
                      </div>
                      <h3 className="font-semibold text-gray-900">Earn Verifications</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Complete workshops, submit projects, demo your work, and mentor others
                    </p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors w-full">
                      View My Profile
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3
                      </div>
                      <h3 className="font-semibold text-gray-900">Build Reputation</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Accumulate points and build a verifiable track record of contributions
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full">
                      See Leaderboard
                    </button>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4
                      </div>
                      <h3 className="font-semibold text-gray-900">Get Recognized</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Share your verified profile with employers, sponsors, and collaborators
                    </p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors w-full">
                      Share Profile
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setWalletAddress(null)}
                    className="text-gray-500 hover:text-gray-700 font-medium"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </div>
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