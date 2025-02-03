'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import useAuthModule from '../lib'

const formSchema = z.object({
	username: z.string().nonempty({ message: 'Harap di isi' }),
	password: z.string().nonempty({ message: 'Harap di isi' }),
})

export default function Login() {
	const { useLogin } = useAuthModule()
	const { mutate, isPending } = useLogin()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values)
	}

	return (
		<div className="w-screen px-2 min-h-screen flex items-center justify-center">
			<div className="py-5 sm:py-10 w-full sm:w-[400px] px-4 sm:px-8 border-2 border-border rounded-md">
				<Image width={80} height={80} className="mx-auto mb-10" src="/fscm.png" alt="FSCM LOGO" />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="admin" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="*******" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isPending} className="mt-4 w-full" type="submit">
							{isPending ? <Loader2 className="animate-spin" /> : 'Masuk'}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
