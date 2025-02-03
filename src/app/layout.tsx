import './globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import ReactQuery from '@/components/ReactQuery'
import NextAuthProvider from '@/components/NextAuthProvider'
import { Session } from 'next-auth'
import { ReactNode } from 'react'

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

interface NextAuthProps {
	children: ReactNode
	session: Session | null | undefined
}

export default function RootLayout({ children, session }: NextAuthProps) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>
				<NextAuthProvider session={session}>
					<ReactQuery>{children}</ReactQuery>
				</NextAuthProvider>
			</body>
		</html>
	)
}
