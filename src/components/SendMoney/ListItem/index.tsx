import ListItemWrapper from "./ListItemWrapper";

type TProps = {
  imgSrc: string;
  text?: string;
  secondaryText?: string;
  dataTestid?: string;
  onClick?: () => void;
};

const ListItem = ({ imgSrc, text, secondaryText, dataTestid, onClick }: TProps) => {
  return (
    <ListItemWrapper data-testid={dataTestid} onClick={onClick}>
      <img className="user-image" src={imgSrc} alt="avatar" />
      <div className="text-wrapper">
        <p className="fullname">{text}</p>
        <p className="phone">{secondaryText}</p>
      </div>
    </ListItemWrapper>
  );
};

export default ListItem;
