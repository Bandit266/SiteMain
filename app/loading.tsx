'use client'

export default function Loading() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-neon-green/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-neon-green border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-neon-green text-lg tracking-wider animate-pulse">LOADING...</p>
      </div>
    </div>
  )
}
