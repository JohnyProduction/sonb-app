import React, { useState } from 'react';
import { toastDisplay } from '../../components/toastDisplay/toastDisplay';
export default function Service () {
  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [formError, setFormError] = useState('');

  const handleChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    const checkedRadio = answers[3]; // Odpowiedź z pola radio
    e.preventDefault();
    setFormError('');
    if (!checkedRadio) {
      setFormError('Proszę wybrać odpowiedź dla czwartego pytania.');
      return;
    }else{
        try {
            const response = await fetch('http://localhost:3333/check-answers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ answers }),
            });
            if (response.ok) {
              setFormError('');
              const data = await response.json();
              console.log(data.message); // Komunikat z serwera
              toastDisplay("success", data.message);
            } else {
              toastDisplay("error", "Błąd przy sprawdzaniu odpowiedzi");
              console.error('Błąd przy sprawdzaniu odpowiedzi');
            }
          } catch (error) {
            toastDisplay("error", error);
            console.error('Błąd sieci:', error);
          }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Quiz</h2>
      <div>
        <label>
          1. Jaki jest stolica Francji?
          <input
            type="text"
            value={answers[0]}
            onChange={(e) => handleChange(e, 0)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          2. Które z tych krajów nie leży w Europie?<br/>
          <select value={answers[1]} onChange={(e) => handleChange(e, 1)}>
            <option value="">Wybierz odpowiedź</option>
            <option value="Brazylia">Brazylia</option>
            <option value="Francja">Francja</option>
            <option value="Niemcy">Niemcy</option>
            <option value="Polska">Polska</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          3. Który pierwiastek chemiczny ma symbol "H"?
          <input
            type="text"
            value={answers[2]}
            onChange={(e) => handleChange(e, 2)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          4. Kto napisał powieść "Zbrodnia i kara"?
          <div>
            <label>
              <input
                type="radio"
                value="Fiodor Dostojewski"
                checked={answers[3] === "Fiodor Dostojewski"}
                onChange={(e) => handleChange(e, 3)}
              />
              Fiodor Dostojewski
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Leo Tolstoj"
                checked={answers[3] === "Leo Tolstoj"}
                onChange={(e) => handleChange(e, 3)}
              />
              Leo Tolstoj
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Stephen King"
                checked={answers[3] === "Stephen King"}
                onChange={(e) => handleChange(e, 3)}
              />
              Stephen King
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="J.K. Rowling"
                checked={answers[3] === "J.K. Rowling"}
                onChange={(e) => handleChange(e, 3)}
              />
              J.K. Rowling
            </label>
          </div>
        </label>
      </div>
      <div>
        <label>
          5. Które morze jest największe pod względem powierzchni na Ziemi?
          <input
            type="text"
            value={answers[4]}
            onChange={(e) => handleChange(e, 4)}
            required
          />
        </label>
      </div>
      <button type="submit">Wyślij odpowiedzi</button>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
    </form>
  );
};

