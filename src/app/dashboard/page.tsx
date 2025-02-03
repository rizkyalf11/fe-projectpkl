"use client"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Dashboard() {
	const { data: session, status } = useSession()

	return (
		<div>
			<Button onClick={() => signOut()}>Logout</Button>
		</div>
	)
}
