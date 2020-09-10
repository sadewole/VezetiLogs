import { useContext } from 'react';
import AuthContext from 'src/contexts/VezetiAuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
