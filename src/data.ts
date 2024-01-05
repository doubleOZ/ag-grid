import { Country, Gender, Info } from "./type";

export const rawData: Info[] = [
  {
    firstName: "John",
    lastName: "Smith",
    gender: Gender.Male,
    country: "United States",
    age: 35,
    salary: 38000,
  },
  {
    firstName: "Emma",
    lastName: "Johnson",
    gender: Gender.Female,
    country: "Canada",
    age: 28,
    salary: 42000,
  },
  {
    firstName: "Juan",
    lastName: "Garcia",
    gender: Gender.Female,
    country: "Spain",
    age: 42,
    salary: 24000,
  },
  {
    firstName: "Sophie",
    lastName: "Martin",
    gender: Gender.Female,
    country: "France",
    age: 31,
    salary: 30000,
  },
  {
    firstName: "Kenta",
    lastName: "Yamamoto",
    gender: Gender.LGBTQIA,
    country: "Japan",
    age: 24,
    salary: 35000,
  },
  {
    firstName: "Emily",
    lastName: "Smith",
    gender: Gender.Female,
    country: "United States",
    age: 28,
    salary: 25000,
  },
  {
    firstName: "James",
    lastName: "Brown",
    gender: Gender.Male,
    country: "France",
    age: 45,
    salary: 80000,
  },
  {
    firstName: "Evelyne",
    lastName: "Fontaine",
    gender: Gender.Female,
    country: "France",
    age: 22,
    salary: 50000,
  },
  {
    firstName: "Gerhard",
    lastName: "Schroeder",
    gender: Gender.Male,
    country: "Spain",
    age: 65,
    salary: 120000,
  },
];

export const countries: Country[] = [
  {
    value: "Canada",
    shortValue: "CAN",
  },
  {
    value: "Japan",
    shortValue: "JPN",
  },
  {
    value: "Spain",
    shortValue: "SPA",
  },
  {
    value: "France",
    shortValue: "FR",
  },
  {
    value: "United States",
    shortValue: "US",
  },
];

export const genderIcons = {
  [Gender.Male]:
    "https://static.vecteezy.com/system/resources/previews/017/178/570/original/male-symbol-isolated-icon-on-transparent-background-free-png.png",
  [Gender.Female]:
    "https://icons.iconarchive.com/icons/custom-icon-design/flatastic-7/512/Female-icon.png",
  [Gender.LGBTQIA]: "https://cdn-icons-png.flaticon.com/512/6421/6421208.png",
};
