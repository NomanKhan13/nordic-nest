// components/ModalContainer.jsx
import { X } from 'lucide-react';

const ModalContainer = ({ children, onClose }) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-end">
      <div className="bg-[#F3ECE6] w-full sm:w-96 h-full shadow-lg relative overflow-scroll">
        <X
          className="absolute top-4 right-4 cursor-pointer text-[#4B3E3E]"
          onClick={onClose}
        />
        <div className="mt-8 p-6 text-[#4B3E3E]">{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
