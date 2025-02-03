"use client"
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Home() {
	const { status } = useSession();

	useEffect(() => {
		if(status === "authenticated") {
			window.location.replace('/dashboard')
		}
	}, [status]);

	return (
		<></>
	)
}
