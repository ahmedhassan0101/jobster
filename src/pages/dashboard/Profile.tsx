// src/pages/dashboard/Profile.tsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import FormRow from '@/shared/components/FormRow';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux';
import { updateUser } from '@/store/user/userSlice';
import { FormPageWrapper } from './AddJob';
import type { User } from '@/shared/types/api';

type ProfileFormData = Pick<User, 'name' | 'email' | 'lastName' | 'location'>;

const Profile = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<ProfileFormData>({
    name:     user?.name     ?? '',
    email:    user?.email    ?? '',
    lastName: user?.lastName ?? '',
    location: user?.location ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, lastName, location } = formData;

    if (!name || !email || !lastName || !location) {
      toast.error('Please fill out all fields');
      return;
    }

    dispatch(updateUser(formData));
  };

  return (
    <FormPageWrapper>
      <h3 className="page-title">Profile</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <FormRow
            type="text"
            name="name"
            value={formData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last name"
            value={formData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={formData.location}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
            style={{ gridColumn: '1 / -1', maxWidth: '200px', justifySelf: 'end' }}
          >
            {isLoading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </FormPageWrapper>
  );
};

export default Profile;