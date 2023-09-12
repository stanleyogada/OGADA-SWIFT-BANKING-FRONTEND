import logoRoundSvg from "@assets/opay-logo-round.svg";
import logoSvg from "@assets/opay-logo.svg";

type TProps = {
  isRound?: boolean;
  sm?: boolean;
};

const BrandLogo = ({ isRound = true, sm }: TProps) => {
  return (
    <img
      src={isRound ? logoRoundSvg : logoSvg}
      alt="brand logo"
      {...(sm && {
        width: 34,
        height: 34,

        style: {
          transform: "scale(1.6)",
        },
      })}
    />
  );
};

export default BrandLogo;
