"use client"
import { useEffect } from "react"

export default function Dashboard() {
	useEffect(() => {
		window.location.replace('/dashboard/daftarnama')
	}, [])
	return (
		<></>
	)
}
