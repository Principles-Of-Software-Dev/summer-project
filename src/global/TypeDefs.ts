// Global Type Defs

// User Properties
export type User = {
    authenticated?: boolean, // true/fase
    id?: number,            // integer or undefined
    role?: Role,        // arrray of strings
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
 
// Enums
export enum Role{
  Unassigned = 0,
  Base = 1,
  Support = 2,
  Admin = 3,
}


