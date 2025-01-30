"use server";

import { signIn } from '@/auth/config';
import { AuthError } from 'next-auth';

export const login = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("local-credentials", {
      ...Object.fromEntries(formData),
      redirect: false
    })

    return 'success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export const authenticate = async (email: string, password: string) => {
  try {
    await signIn("local-credentials", {email, password, redirect: false})
    
    return 'success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}