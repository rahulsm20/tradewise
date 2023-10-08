import React, { useRef } from "react";

const LogoutModal = ({ handleLogout }) => {
  const modalRef = useRef(null);
  console.log("modalRef:", modalRef);
  const openModal = () => {
    if (modalRef.current) {
      console.log("Modal should open now"); 
      modalRef.current.showModal();
    }
  };
  return (
    <div>
      <button
        className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm flex items-center justify-center align-middle"
        onClick={openModal}
      >
        Logout
      </button>
      <dialog ref={modalRef} className="justify-center z-10">
        <div className=" bg-zinc-900 p-8 rounded-xl">
          <p className="font-bold text-lg mb-5">
            Are you sure you want to logout?
          </p>
          <div className="flex gap-3">
            <button
              className="btn btn-transparent hover:bg-red-600 bg-red-500 normal-case text-white btn-sm text-sm"
              onClick={handleLogout}
            >
              Yes
            </button>
            <form method="dialog">
              <button className="btn btn-sm normal-case bg-blue-500 hover:bg-blue-600 text-white">
                No
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LogoutModal;
