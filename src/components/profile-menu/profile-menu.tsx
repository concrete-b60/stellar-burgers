import { ProfileMenuUI } from '@ui';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/user/actions';
import { setUser } from '../../services/user/slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/');
      dispatch(setUser(null));
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
