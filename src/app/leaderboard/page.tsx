'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LeaderboardEntry {
  rank: number
  wallet: string
  points: number
  events: number
  actions: number
  badge: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
}

export default function LeaderboardPage() {
  const [userWallet, setUserWallet] = useState<string | null>(null)

  useEffect(() => {
    const savedWallet = localStorage.getItem('buildrift_wallet')
    setUserWallet(savedWallet)
  }, [])

  // Mock leaderboard data - in production this would come from API
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, wallet: '0x1234...5678', points: 2450, events: 12, actions: 45, badge: 'Platinum' },
    { rank: 2, wallet: '0x2345...6789', points: 2100, events: 10, actions: 38, badge: 'Gold' },
    { rank: 3, wallet: '0x3456...7890', points: 1850, events: 9, actions: 32, badge: 'Gold' },
    { rank: 4, wallet: '0x4567...8901', points: 1600, events: 8, actions: 28, badge: 'Silver' },
    { rank: 5, wallet: '0x5678...9012', points: 1400, events: 7, actions: 24, badge: 'Silver' },
    { rank: 6, wallet: '0x6789...0123', points: 1200, events: 6, actions: 20, badge: 'Silver' },
    { rank: 7, wallet: '0x7890...1234', points: 1000, events: 5, actions: 18, badge: 'Bronze' },
    { rank: 8, wallet: '0x8901...2345', points: 850, events: 4, actions: 15, badge: 'Bronze' },
    { rank: 9, wallet: '0x9012...3456', points: 700, events: 3, actions: 12, badge: 'Bronze' },
    { rank: 10, wallet: '0x0123...4567', points: 550, events: 2, actions: 10, badge: 'Bronze' },
  ]

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Platinum': return 'text-purple-600 bg-purple-100'
      case 'Gold': return 'text-yellow-600 bg-yellow-100'
      case 'Silver': return 'text-gray-600 bg-gray-100'
      case 'Bronze': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
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
              {userWallet && (
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

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Builder Leaderboard 🏆
            </h1>
            <p className="text-xl text-gray-600">
              Top builders ranked by verified contributions across WebZero events
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">127</div>
              <div className="text-gray-600">Total Builders</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-green-600 mb-2">1,847</div>
              <div className="text-gray-600">Verified Actions</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
              <div className="text-gray-600">Active Events</div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Top Builders</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Builder
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Events
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Badge
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboardData.map((entry) => (
                    <tr 
                      key={entry.rank}
                      className={`hover:bg-gray-50/50 transition-colors ${
                        userWallet === entry.wallet ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-gray-900">
                          {getRankIcon(entry.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-bold text-white">
                              {entry.wallet.slice(2, 4).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <Link
                              href={`/profile/${entry.wallet}`}
                              className="font-mono text-sm text-blue-600 hover:text-blue-700"
                            >
                              {formatAddress(entry.wallet)}
                            </Link>
                            {userWallet === entry.wallet && (
                              <div className="text-xs text-blue-600 font-medium">You</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-gray-900">
                          {entry.points.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.events}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.actions}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(entry.badge)}`}>
                          {entry.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Climb the Ranks?
              </h3>
              <p className="text-gray-600 mb-6">
                Join WebZero events and start earning verified contributions to improve your ranking!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.joinwebzero.com/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse Events
                </a>
                {!userWallet && (
                  <Link
                    href="/get-started"
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors"
                  >
                    Connect Wallet
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}