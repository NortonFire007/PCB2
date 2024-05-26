import { CiLogin, CiLogout } from 'react-icons/ci';

function InOutButton({ onClick }) {
  return (
    <button
      className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center focus:outline-none focus:shadow-outline-green"
      onClick={onClick}
    >
      <div className="flex items-center">
        <CiLogin className="text-white mr-2" />
        <span>Login</span>
      </div>
    </button>
  );
}

export default InOutButton;
