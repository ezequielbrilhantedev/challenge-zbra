'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ser um número de 6 dígitos.')
    .max(6, 'A senha deve ser no máximo 6 dígitos.')
    .refine((password) => {
      const isInRange =
        parseInt(password) >= 184759 &&
        parseInt(password) <= 856920;
      const hasAdjacentDuplicates = /(\d)\1/.test(password);
      const neverDecreases = password
        .split('')
        .every(
          (digit, index, array) =>
            index === 0 || digit >= array[index - 1]
        );
      return (
        isInRange && hasAdjacentDuplicates && neverDecreases
      );
    }, 'A senha deve estar entre 184759-856920, conter dígitos adjacentes iguais e nunca diminuir em valor.'),
});

type createUserFormData = z.infer<typeof formSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<createUserFormData>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);

  const formValues = watch();

  const allFieldsFilled = Object.values(formValues).every(
    (field) => field !== ''
  );
  const hasValidationErrors =
    Object.keys(errors).length > 0;

  const isSubmitDisabled =
    !allFieldsFilled || hasValidationErrors || formDisabled;

  const onSubmit = async (data: createUserFormData) => {
    setFormDisabled(true);
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/loginFetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar requisição');
      }

      setMessage('Resultado enviado com sucesso!');
    } catch (error) {
      console.error(error);
      setMessage(
        'Falha ao enviar reusltado. Tente novamente.'
      );
    } finally {
      setLoading(false);
      reset();
      setFormDisabled(false);
    }
  };

  return (
    <div className="h-screen lg:h-[40rem] sm:px-12 sm:py-20 flex justify-center">
      <div className="bg-white sm:border p-12 sm:max-w-[51rem] w-full grid gap-4">
        <h1 className="text-4xl text-center">
          Valide sua senha
        </h1>
        <form>
          <div className="grid gap-4">
            <div>
              <input
                type="text"
                placeholder="Nome"
                className="border border-black bg-white h-8 sm:w-[45rem] w-full rounded pl-4"
                {...register('name')}
              />
              {errors.name && (
                <span className="text-red-700">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="border border-black bg-white h-8 sm:w-[45rem] w-full rounded pl-4"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-700">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Senha"
                className="border border-black bg-white h-8 sm:w-[45rem] w-full rounded pl-4 "
                {...register('password')}
              />
              {errors.password && (
                <span className="text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex sm:justify-end justify-center items-center gap-8 sm:mt-8 mt-60">
            {isSubmitDisabled ? '' : <span>{message}</span>}
            <button
              onClick={handleSubmit(onSubmit)}
              className={`border rounded p-3 sm:w-32 w-56 bg-teal-400 text-slate-50 font-medium text-lg
              ${
                isSubmitDisabled
                  ? 'cursor-not-allowed bg-gray-500'
                  : 'cursor-pointer'
              }`}
              disabled={isSubmitDisabled}
            >
              {loading ? (
                <ClipLoader color="#fff" />
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
