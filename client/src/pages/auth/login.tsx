import { LockClosedIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signIn(data);
  }

  return (
    <div className="min-h-screen flex gap-1 items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nomeDeUsuario" className="sr-only">
                Nome de usuário
              </label>
              <input
                {...register('nomeDeUsuario')}
                id="nomeDeUsuario"
                name="nomeDeUsuario"
                type="text"
                autoComplete="nomeDeUsuario"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome de Usuário"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Endereço de E-mail
              </label>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Endereço de E-mail"
              />
            </div>

            <div>
              <label htmlFor="senha" className="sr-only">
                Senha
              </label>
              <input
                {...register('senha')}
                id="senha"
                name="senha"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Lembre-se de mim...
              </label>

            </div>
            <div className='flex-col'>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

          </div>
          <div className=''>
            <Link className="text-sm" href="/auth/registro">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Não possuí conta?
              </span>
            </Link>
          </div>


          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
