import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;


function App() {

  useEffect(() => {
    tg.ready();
  })

  const onClose = () => {
    tg.close()
  }

  return (
    <div className="App">
      <form action="">
        <h1>Форма закакза</h1>
        <input name="tel" type="text" placeholder='Введите свой телефон' />
        <input name="adress" type="text" placeholder='Введите свой адресс' />
        <button type='submit'>Отправить</button>
      </form>
    </div>
  );
}

export default App;
