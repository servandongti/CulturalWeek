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

    fetch("/", {
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
    <div>
      {(!submitted) && <form name="contact" method="POST" data-netlify="true" onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <div>
            <input type="text" id="name" name="name" placeholder="Nombre"
              onChange={handleChange} />
          </div>
          <div>
            <input type="text" id="score" name="score" placeholder="Puntuación"
              onChange={handleChange} />
          </div>
        </div>
        <div>
          <input type="text" name="phone" id="phone" placeholder="Celular"
            onChange={handleChange} />
        </div>
        <div>
          <button type="submit">
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

export { Form }
