import classnames from "classnames";

// Prop types
type ButtonProps = {
  height: string;
  color: string;
  buttonText: string;
  textColor: string;
  hoverColor: string;
 }

function Button({ height, color, buttonText, textColor, hoverColor }: ButtonProps) {

  // Button styling. Applied exactly as shown w/ props added as string literals.
  const classStr = classnames(
    "flex items-center justify-center text-border rounded-lg mx-4 p-4 min-w-fit text-sm font-serif tracking-wider p-2",
    color,
    height,
    textColor,
    hoverColor,
  );

  return (
    <div>

      {/* Start actual code  */}
      <button className={classStr}>  
            {buttonText}   
      </button>
      {/* End code */}

    </div>
  )
}

export default Button