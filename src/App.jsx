import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useTelegram } from "./hooks/useTelegram";

import './App.css';



function App() {
  
  const [suggestions, setSuggestions] = useState([]);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const {tg} = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      phone, 
      address
    }

    tg.sendData(JSON.stringify(data))
  }, [phone, address])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)

    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])



  const {
    register,
    formState: { errors, isValid, },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur'
  });


  useEffect(() => {
    tg.ready();

    tg.MainButton.show();
    if(!isValid) {
      tg.MainButton.disable();
    } else {
      tg.MainButton.enable();
    }

    tg.MainButton.setParams({
      text: "Отправить данные"
    })
  })

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  }
  const handlePhoneChange = async (e) => {
    const value = e.target.value;
    setPhone(value);
  }

  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 3) {
      try {
        const response = await axios.post(
          'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
          { query: value },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Token ${process.env.REACT_APP_DADATE_API_KEY}`
            }
          }
        );
        setSuggestions(response.data.suggestions);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setValue('address', suggestion.value);
    setAddress(suggestion.value);
    setSuggestions([]);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Форма закакза</h1>

        <label>
          <span>Ваш номер</span>
          <InputMask
            mask="+7 (999) 999-99-99"
            onChange={handlePhoneChange}
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
        <div>{errors?.phone && <span>{errors?.phone?.message || "Ошибка"}</span>}</div>


        <label>
          <span>Ваш адрес</span>
          <input
            {...register('address', {
              required: "Это поле обязательно для заполнения"
            })}
            value={address}
            onChange={handleAddressChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.value}
                </li>
              ))}
            </ul>
          )}
        </label>
        <div>{errors?.address && <span>{errors?.address.message || "Ошибка"}</span>}</div>

        {/* <input type='submit' disabled={!isValid} /> */}
      </form>
    </div>
  );
}

export default App;
