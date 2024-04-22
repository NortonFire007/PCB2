import { FaPencil } from 'react-icons/fa6';

const WriteReviewButton = ({ toggleWriteComent }) => {
  return (
    <li
      className="flex items-center gap-1 hover:underline text-gray-500"
      onClick={toggleWriteComent}
    >
      <FaPencil size={14} />
      <p>Написати відгук</p>
    </li>
  );
};

export default WriteReviewButton;
