/* eslint-disable @typescript-eslint/no-explicit-any */
import { AX } from '@/lib/axiosClient'
import { LoginAdminPayload, LoginAdminResponse } from '../interface'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const useAuthModule = () => {
	const router = useRouter()
	const login = async (payload: LoginAdminPayload): Promise<LoginAdminResponse> => {
		return AX.post('/auth/loginAdmin', payload).then((res) => res.data)
	}

	const useLogin = () => {
		const { mutate, isPending } = useMutation({
			mutationFn: (payload: LoginAdminPayload) => login(payload),
			onSuccess: async(response) => {
        console.log(response.data._id)
        await signIn("credentials", {
          id: response.data._id,
          username: response.data.username,
          access_token: response.data.access_token,
          redirect: false,
        });
        router.push('/dashboard')
      },
			onError: (error: any) => {
				if (error.response.status == 422) {
					alert(error.response.data.message)
				} else {
					alert('error')
				}
			},
		})

    return { mutate, isPending }
	}

	return { useLogin }
}

export default useAuthModule
