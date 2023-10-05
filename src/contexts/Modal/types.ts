type TModal = {
  id: number;
  heading?: string | JSX.Element;
  body?: string | JSX.Element;
  isPersistent?: boolean;
  onClose?: () => void;
};

export type { TModal };
