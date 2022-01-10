import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {savePost as mockSavePost} from './api';
import App from './App';

jest.mock('./api')


const fakeUser = {
  cardNumber: {inputType: 'input', label: "Card Number", value: '4242 4242 4242 4242'},
  cardHolder: {inputType: 'input', label: "Card Holder", value: 'test user'},
  month: {inputType: 'dropdown', label: "Expiration Month", value: '4'},
  year: {inputType: 'dropdown', label: "Expiration Year", value: '2024'},
  cvv: {inputType: 'input', label: "CVV", value: '123'},
}


test('renders a form with card number, card holder, expiration dates, CVV, and a submit button', () => {
  render(<App />)
  screen.getByLabelText(/card number/i)
  screen.getByLabelText(/card holder/i)
  screen.getByLabelText(/expiration month/i )
  screen.getByLabelText(/expiration year/i )
  screen.getByLabelText(/cvv/i)
  screen.getByText(/submit/i)
})

test('expect submit button to be disabled by default', () => {
  render(<App/>)
  const submitButton = screen.getByText(/submit/i)
  expect(submitButton).toBeDisabled()
})

test('expect submit button to be enabled with all fields selected', () => {

  render(<App />)
  userEvent.type(screen.getByLabelText(/card number/i), fakeUser.cardNumber.value)
  userEvent.type(screen.getByLabelText(/card holder/i), fakeUser.cardHolder.value)
  
  userEvent.selectOptions(screen.getByLabelText(/expiration month/i ), fakeUser.month.value)
  userEvent.selectOptions(screen.getByLabelText(/expiration year/i ), fakeUser.year.value)

  userEvent.type(screen.getByLabelText(/cvv/i), fakeUser.cvv.value)

  const submitButton = screen.getByText(/submit/i)
  expect(submitButton).toBeEnabled()
})


test.each(Object.entries(fakeUser))("expect submit button to be disabled if %s not entered", (key) => {
  render(<App />)
  // make unique copy for each test instead of mutating
  const copiedFakeUser = {...fakeUser}
  delete copiedFakeUser[key]

    Object.keys(copiedFakeUser).forEach(input => {
      // choose userEvent interaction type based on inputType
      if(copiedFakeUser[input].inputType === 'input') {
        userEvent.type(screen.getByLabelText(copiedFakeUser[input].label), copiedFakeUser[input].value)
      } else if(copiedFakeUser[input].inputType === 'dropdown')
      userEvent.selectOptions(screen.getByLabelText(copiedFakeUser[input].label), copiedFakeUser[input].value)
    });

    const submitButton = screen.getByText(/submit/i)
    userEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
});

test('calls savePost correctly on submit', () => {
  mockSavePost.mockResolvedValueOnce()

  render(<App />)
  userEvent.type(screen.getByLabelText(/card number/i), fakeUser.cardNumber.value)
  userEvent.type(screen.getByLabelText(/card holder/i), fakeUser.cardHolder.value)
  
  userEvent.selectOptions(screen.getByLabelText(/expiration month/i ), fakeUser.month.value)
  userEvent.selectOptions(screen.getByLabelText(/expiration year/i ), fakeUser.year.value)

  userEvent.type(screen.getByLabelText(/cvv/i), fakeUser.cvv.value)

  const submitButton = screen.getByText(/submit/i)

  userEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  expect(mockSavePost).toHaveBeenCalledWith(
    {
      cardNumber: fakeUser.cardNumber.value,
      cardHolder: fakeUser.cardHolder.value,
      month: fakeUser.month.value,
      year: fakeUser.year.value,
      cvv: fakeUser.cvv.value,
    }
  )
  
});