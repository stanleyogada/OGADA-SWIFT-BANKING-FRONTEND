import { COLORS } from "../../constants";

interface FinanceTab {
  finTitle: string;
  finContent: Tab[];
}

interface Tab {
  title: string;
  content: string;
  textNumb: string;
  bgColor: string;
  textColor: string;
}

export const finances: FinanceTab[] = [
  {
    finTitle: "Savings",
    finContent: [
      {
        title: "SafeBox",
        content: "Strict daily, weekly or monthly automatic savings up to 15% p.a",
        textNumb: "N0.00",
        bgColor: `${COLORS.lightPink}`,
        textColor: `${COLORS.pink}`,
      },
      {
        title: "Fixed",
        content: "Set 7-1000 days saving plan with as low as N1000 Up to 18% p.a",
        textNumb: "N0.00",
        bgColor: `${COLORS.lightBlue}`,
        textColor: `${COLORS.blue}`,
      },
      {
        title: "Spend & Save",
        content: "Save a percentage every time yo spend or transfer Up to 15% p.a",
        textNumb: "N0.00",
        bgColor: `${COLORS.lightOrange}`,
        textColor: `${COLORS.orange}`,
      },
      {
        title: "Saving Report",
        content: "Check out your savings journey so far",
        textNumb: "12/2022",
        bgColor: `${COLORS.lightPurple}`,
        textColor: `${COLORS.purple}`,
      },
    ],
  },
  {
    finTitle: "Loan",
    finContent: [
      {
        title: "Saving Reports",
        content: "Check out your savings journey so far",
        textNumb: "12/2023",
        bgColor: `${COLORS.lightPurple}`,
        textColor: `${COLORS.purple}`,
      },
      {
        title: "Spend & Save",
        content: "Save a percentage every time yo spend or transfer Up to 15% p.a",
        textNumb: "N0.00",
        bgColor: `${COLORS.lightOrange}`,
        textColor: `${COLORS.orange}`,
      },
      {
        title: "Fixed",
        content: "Set 7-1000 days saving plan with as low as N1000 Up to 18% p.a",
        textNumb: "N0.00",
        bgColor: `${COLORS.lightBlue}`,
        textColor: `${COLORS.blue}`,
      },
      {
        title: "SafeBox",
        content: "Strict daily, weekly or monthly automatic savings up to 15% p.a",
        textNumb: "N0.00",
        bgColor: `${COLORS.lightPink}`,
        textColor: `${COLORS.pink}`,
      },
    ],
  },
];
