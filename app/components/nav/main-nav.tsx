"use client"
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/assets/images/Dionisio.png'

export const MainNav = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#160a2e] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
          
            <Image src={logo} alt="Dionísio" width={180} height={100} />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-violet-900 hover:bg-purple-800 px-4 py-2 rounded-full text-white font-medium"
              onClick={() => (window.location.href = 'http://dionisio-crm.web.app/')}
            >
              Entrar
            </motion.button>
          </motion.div>

          <motion.button
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </nav>
  )
} 