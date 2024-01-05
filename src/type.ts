export type Info = {
  firstName: string;
  lastName: string;
  gender: Gender;
  country: string;
  age: number;
  salary: number;
};

export enum Gender {
  Male = "Male",
  Female = "Female",
  LGBTQIA = "LGBTQIA+",
}

export type Country = {
  value: string,
  shortValue: string;
}