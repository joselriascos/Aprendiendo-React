import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'
import { useState } from 'react'

export function CreateNewUser() {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'error' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return setResult('error')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }

  return (
    <Card className="mt-4 outline-none ring-gray-400 rounded-sm">
      <Title className="mb-4">Crear Nuevo Usuario</Title>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <TextInput
          name="name"
          className="rounded"
          placeholder="Aquí el nombre"
        />
        <TextInput
          name="email"
          type="email"
          className="rounded"
          placeholder="Aquí el email"
        />
        <TextInput
          name="github"
          className="rounded"
          placeholder="Aquí el usuario de GitHub"
        />

        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          <Button
            type="submit"
            className="bg-gray-200 rounded hover:bg-gray-100 transition w-1/3 min-w-min"
          >
            Crear usuario
          </Button>
          <span>
            {result === 'ok' && (
              <Badge
                onClick={() => setResult(null)}
                className="bg-green-100 rounded-lg text-white ring-0 cursor-pointer text-green-600 font-medium"
              >
                Guardado correctamente
              </Badge>
            )}
            {result === 'error' && (
              <Badge
                onClick={() => setResult(null)}
                className="bg-red-100 rounded-lg text-white ring-0 cursor-pointer text-red-600 font-medium"
              >
                Error con los campos
              </Badge>
            )}
          </span>
        </div>
      </form>
    </Card>
  )
}
