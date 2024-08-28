import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import ModalWrapper from "./components/common/ModalWrapper/ModalWrapper";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open modal</button>
      <ModalWrapper modalIsOpen={isModalOpen} closeModal={closeModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ipsam
        error inventore quod dolorem, assumenda quo, impedit officiis nesciunt,
        nisi dicta modi porro reprehenderit ea explicabo laborum? Beatae,
        eligendi quas?
      </ModalWrapper>
    </>

    // <Routes>
    //   <Route path="/" element={<SharedLayout />}>
    //     <Route path="/welcome" />
    //     <Route path="/home" />
    //     <Route path="/signup" />
    //     <Route path="/signin" />
    //   </Route>
    // </Routes>
  );
}

export default App;
