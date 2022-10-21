import { useState } from 'react';

export const Form = () => {
  const [name, setName] = useState('')

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </form>
  )
}
