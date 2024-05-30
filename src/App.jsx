import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';

import './App.css';

const tg = window.Telegram.WebApp;


function App() {

  useEffect(() => {
    tg.ready();
  })

  const {
    register,
    formState: { errors, isValid, },
    handleSubmit,
  } = useForm({
    mode: 'onBlur'
  });


  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Форма закакза</h1>

        <label>
          <span>Ваш номер</span>
          <InputMask
            mask="+7 (999) 999-99-99"
            {...register('phone', {
              required: "Это поле обязательно для заполнения",
              pattern: {
                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: "Введите корректный номер телефона"
              }
            })}
          >
            {(inputProps) => <input {...inputProps} type="tel" />}
          </InputMask>
        </label>

        <label>
          <span>Ваш адрес</span>
          <input {...register('address')} />
        </label>

        <input type='submit' disabled={!isValid} />
      </form>
    </div>
  );
}

export default App;
