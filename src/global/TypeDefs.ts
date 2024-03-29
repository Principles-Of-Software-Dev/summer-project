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
 
export type ItemType = {
  itemId: number,
  description: string,
  estimate: number,
  photos: any,
  videos: any, 
}


