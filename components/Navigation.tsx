'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import DecryptText from './DecryptText'

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'DEVELOPMENT', path: '/development' },
  { name: 'CONCEPT_ART', path: '/concept-art' },
  { name: 'CONTACT', path: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-crimson/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-crimson-bright font-bold text-xl tracking-wider hover:text-glow transition-all code-font">
            <DecryptText
              text="SYNTHETIX.world"
              as="span"
              speed={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium tracking-wider transition-all relative group code-font
                    ${pathname === item.path
                      ? 'text-crimson-bright'
                      : 'text-gray-400 hover:text-crimson-bright'
                    }`}
                >
                  <DecryptText
                    text={item.name}
                    as="span"
                    speed={35}
                  />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-crimson-bright transform origin-left transition-transform duration-300
                    ${pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-crimson-bright hover:bg-dark-card focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-crimson/30`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-card/90 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 text-base font-medium tracking-wider transition-all code-font
                ${pathname === item.path
                  ? 'text-crimson-bright bg-dark-bg'
                  : 'text-gray-400 hover:text-crimson-bright hover:bg-dark-bg'
                }`}
            >
              <DecryptText
                text={item.name}
                as="span"
                speed={30}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
