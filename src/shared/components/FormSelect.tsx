// src/shared/components/FormSelect.tsx
import styled from 'styled-components';

const FormSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  select {
    height: 38px;
    padding: 0 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.grey[200]};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: inherit;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};

    &:hover { border-color: ${({ theme }) => theme.colors.grey[300]}; }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary[400]};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
    }
  }
`;

interface FormSelectProps {
  name:          string;
  value:         string;
  handleChange:  React.ChangeEventHandler<HTMLSelectElement>;
  list:          string[];
  labelText?:    string;
}

const FormSelect = ({ name, value, handleChange, list, labelText }: FormSelectProps) => (
  <FormSelectWrapper>
    <label htmlFor={name}>{labelText ?? name}</label>
    <select id={name} name={name} value={value} onChange={handleChange}>
      {list.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  </FormSelectWrapper>
);

export default FormSelect;