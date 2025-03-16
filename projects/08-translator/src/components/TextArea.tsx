import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { CSSProperties } from 'react'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles: CSSProperties = {
  height: '200px',
  border: '0',
  resize: 'none',
}

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType
  loading?: boolean
}) => {
  if (loading) return 'Cargando...'
  if (type === SectionType.From) return 'Introducir texto'
  return 'Traducción'
}

export const TextArea = ({ loading, value, onChange, type }: Props) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      disabled={type === SectionType.To}
      value={value}
      onChange={handleChange}
    />
  )
}
