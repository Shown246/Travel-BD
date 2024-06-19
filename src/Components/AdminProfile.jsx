import { useContext } from 'react';
import { AuthContext } from '../AuthContextProvider';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex items-center p-16 space-x-32">
        <img src={user.photoURL} className="h-40 object-cover" />
        <div>
          <p className="mb-6 text-2xl font-semibold">{user.displayName}</p>
          <p className="text-2xl font-semibold">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile