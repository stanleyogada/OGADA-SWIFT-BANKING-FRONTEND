import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

const ModalTestShowButton = () => {
  const { handleAdd } = useModalConsumer();

  const handleAdModal = () => {
    handleAdd({
      heading: <p>Header</p>,
      body: <p>Body</p>,
    });
  };

  const handlePersistAdModal = () => {
    handleAdd({
      heading: <p>Header</p>,
      body: <p>Body</p>,
      isPersistent: true,
    });
  };

  return (
    <>
      <button onClick={handleAdModal}>Show Modal</button>

      <button onClick={handlePersistAdModal}>Persist Modal</button>
    </>
  );
};

export default ModalTestShowButton;
