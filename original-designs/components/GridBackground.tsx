'use client'

export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg" />
    </div>
  )
}
