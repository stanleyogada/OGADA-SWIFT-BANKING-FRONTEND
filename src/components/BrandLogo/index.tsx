import logoRoundSvg from "@assets/opay-logo-round.svg";
import logoSvg from "@assets/opay-logo.svg";

type TProps = {
  isRound?: boolean;
};

const BrandLogo = ({ isRound = true }: TProps) => {
  return <img src={isRound ? logoRoundSvg : logoSvg} alt="brand logo" />;
};

export default BrandLogo;
