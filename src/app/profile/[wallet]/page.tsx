'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProfilePage() {
  const params = useParams()
  const walletAddress = params.wallet as string
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  useEffect(() => {
    // Check if this is the user's own profile
    const savedWallet = localStorage.getItem('buildrift_wallet')
    setIsOwnProfile(savedWallet === walletAddress)
  }, [walletAddress])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const shareProfile = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('Profile link copied to clipboard!')
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.4), rgba(248, 250, 252, 0.6)), url('/get-started-bg.jpg')`
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-gray-900">
              BUILDRIFT
            </Link>
            <div className="flex items-center gap-4">
              {isOwnProfile && (
                <Link
                  href="/dashboard"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-200 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">
                {walletAddress.slice(2, 4).toUpperCase()}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Builder Profile
            </h1>
            <p className="font-mono text-lg text-gray-600 mb-6">
              {formatAddress(walletAddress)}
            </p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={shareProfile}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Share Profile
              </button>
              {isOwnProfile && (
                <Link
                  href="/dashboard"
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:border-gray-400 transition-colors"
                >
                  Edit Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600 text-sm">Events Joined</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-gray-600 text-sm">Verified Actions</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600 text-sm">Total Points</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-gray-600 mb-2">Bronze</div>
              <div className="text-gray-600 text-sm">Badge Level</div>
            </div>
          </div>

          {/* Verified Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Verified Actions</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Verified Actions Yet</h3>
              <p className="text-gray-600 mb-6">
                {isOwnProfile 
                  ? "Join WebZero events to start earning verified contributions!"
                  : "This builder hasn't earned any verified actions yet."
                }
              </p>
              {isOwnProfile && (
                <a
                  href="https://www.joinwebzero.com/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Find Events
                </a>
              )}
            </div>
          </div>

          {/* Event History */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event History</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Yet</h3>
              <p className="text-gray-600">
                {isOwnProfile 
                  ? "Your event participation will appear here once you join WebZero events."
                  : "This builder hasn't participated in any events yet."
                }
              </p>
            </div>
          </div>

          {/* Verification Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm border border-green-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              All actions verified by WebZero organizers
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}