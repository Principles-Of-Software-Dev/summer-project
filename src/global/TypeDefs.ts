// Global Type Defs

// User Properties
export type User = {
    authenticated?: boolean, // true/fase
    id?: number,            // integer or undefined
}


// Prop types
export type ButtonProps = {
  height: string;
  color: string;
  buttonText: string;
  textColor: string;
  hoverColor: string;
  disable: boolean;
  onClick;
}
 
export type PropertyType = {
  propertyId: number,
  street: string,
  city: string,
  state: string,
  zipcode: number,
  description: string,
  estimate: number,
  photos: any,
  videos: any, 
}


