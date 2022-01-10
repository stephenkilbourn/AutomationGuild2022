import * as React from 'react'
import {savePost} from './api'
import './App.css';



function App() {

  // const [formComplete, setformComplete] = React.useState(false)
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardHolder, setCardHolder] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('')
  const [cvv, setCvv] = React.useState('')

  const [isSaving, setIsSaving] = React.useState(false)

  let formComplete = cardNumber.length  && cardHolder && cvv.length && month.length && year.length

  function handleSubmit(e) {
    e.preventDefault()
    const {cardNumber, cardHolder, expirationMonth, expirationYear, cvv} = e.target.elements
    const newPost = {
      cardNumber: cardNumber.value,
      cardHolder: cardHolder.value,
      month: expirationMonth.value,
      year: expirationYear.value,
      cvv: cvv.value,
    }
    setIsSaving(true)
    savePost(newPost)
  }

  return (
<div className="wrapper">
    <div className="credit-card__wrapper visa">
      <div className="credit-card__inner">
        <div className="credit-card--front">
          <div className="card-number">
            <div className="card-number__shadow shadow">4242 4242 4242 4242</div>
            <div className="card-number__emboss emboss">4242 4242 4242 4242</div>
          </div>
          <div className="card-holder">
            <div className="card-holder__shadow shadow">Stephen Kilbourn</div>
            <div className="card-holder__emboss emboss">Stephen Kilbourn</div>
          </div>
          <div className="expiration-date">
            <div className="expiration-date__shadow shadow">12/2022</div>
            <div className="expiration-date__emboss emboss">12/2022</div>
          </div>
        </div>
        <div className="credit-card--back">
          <div className="signature">Sign Here</div>
          <div className="cvv">456</div>
        </div>
      </div>
    </div>

    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="field">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              name="card-number"
              id="cardNumber"
              value={cardNumber}
              onChange={ e => setCardNumber(e.target.value)}
              />
          </div>

          <div className="field">
            <label htmlFor="cardHolder">Card Holder</label>
            <input
              type="text"
              name="card-holder"
              id="cardHolder"
              value={cardHolder}
              onChange={ e => setCardHolder(e.target.value)} 
              />
          </div>
        </div>

        <div className="row">
          <div className="field option__wrapper">
          
            <label htmlFor='expirationMonth'>Expiration Month</label>
            <div className="field__options">

              <select
                name="expiration-date-month" 
                id="expirationMonth"
                data-testid="month-dropdown"
                value={month}
                onChange={ e => setMonth(e.target.value)}
                >
                <option>Month</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <label htmlFor='expirationYear'>Expiration Year</label>
              <select
                name="expiration-date-year"
                id="expirationYear"
                data-testid="year-dropdown"
                value={year}
                onChange={ e => setYear(e.target.value)}
                >
                <option>Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="cvv">CVV</label>
            <input 
              type="number"
              name="cvv"
              id="cvv"
              value={cvv}
              onChange={ e => setCvv(e.target.value)}
              />
          </div>
        </div>

        <div className="row">
          <button type="submit" disabled={!formComplete || isSaving}>
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default App;
