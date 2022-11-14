import React, { useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/getError";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className='mb-4 text-2xl'>Login</h1>
        <div className='mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA_Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            type='email'
            id='email'
            className='w-full border rounded-md p-2 outline-none ring-indigo-200 focus:ring'
            autoFocus
          />
          {errors.email && (
            <div className='text-red-500 pt-1'>{errors.email.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            {...register("password", {
              required: "Please enter password",
            })}
            type='password'
            id='password'
            className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring'
            autoFocus
          />
          {errors.password && (
            <div className='text-red-500 pt-1'>{errors.password.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <button className='h-10 w-full rounded-lg bg-rose-400 font-bold text-white text-center hover:bg-rose-600'>
            Login
          </button>
        </div>
        <div>
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`}>
            <span className='text-blue-500 cursor-pointer'>Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
