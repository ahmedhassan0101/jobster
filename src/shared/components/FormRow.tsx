// src/shared/components/FormRow.tsx
import styled from 'styled-components';

const FormRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  input {
    height: 38px;
    padding: 0 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.grey[200]};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: inherit;
    font-size: 0.9375rem;
    transition: ${({ theme }) => theme.transition};

    &:hover { border-color: ${({ theme }) => theme.colors.grey[300]}; }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary[400]};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
    }

    &::placeholder { color: ${({ theme }) => theme.colors.grey[400]}; }
  }
`;

interface FormRowProps {
  type:          string;
  name:          string;
  value:         string;
  handleChange:  React.ChangeEventHandler<HTMLInputElement>;
  labelText?:    string;
}

const FormRow = ({ type, name, value, handleChange, labelText }: FormRowProps) => (
  <FormRowWrapper>
    <label htmlFor={name}>{labelText ?? name}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
    />
  </FormRowWrapper>
);

export default FormRow;