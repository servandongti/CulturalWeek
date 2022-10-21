import { Input } from '@nextui-org/react';
import { useState } from 'react';

interface FormPost {
  name?: string
  score?: string
  phone?: string
}

const Form = () => {
  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const [state, setState] = useState<FormPost>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...state })
    })
      .then(() => console.log("Success!"))
      .catch(error => console.log(error));

    event.preventDefault();
    setSubmitted(true);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <div className='flex justify-center items-center mt-8'>
      {(!submitted) && <form action='/api/form' className='block p-6 rounded-lg shadow-lg bg-white max-w-sm' name="contact" method="post" data-netlify="true" onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <div className='m-4'>
          <div>
            <input className='mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              type="text" id="name" name="name" placeholder="Nombre"
              onChange={handleChange} />
          </div>
          <div className='mb-4'>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" id="score" name="score" placeholder="Puntuacion"
              onChange={handleChange} />
          </div>
          <div>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" name="phone" id="phone" placeholder="phone"
              onChange={handleChange} />
          </div>
        </div>
        <div className='flex justify-center'>
          <button type="submit" className='rounded px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
            Enviar
          </button>
        </div>
      </form>}
      {submitted &&
        <h5>Gracias por participar!</h5>
      }
    </div>
  )

}

export { Form };
