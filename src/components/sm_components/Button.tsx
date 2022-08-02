import classnames from "classnames" ;
import { ButtonProps } from '../../global/TypeDefs'

function Button({ height, color, buttonText, textColor, hoverColor, disable, onClick }: ButtonProps) {

	// Button styling. Applied exactly as shown w/ props added as string literals.
	let classStr ;
	if (!disable) {
		classStr = classnames(
			"flex items-center justify-center text-border rounded-lg mx-4 p-4 min-w-fit text-sm font-serif tracking-wider p-2",
			color,
			height,
			textColor,
			hoverColor,
		) ;
	} else {
		classStr = classnames(
			"flex items-center justify-center text-border rounded-lg mx-4 p-4 min-w-fit text-sm font-serif tracking-wider p-2 opacity-50 cursor-not-allowed",
			color,
			height,
			textColor,
			hoverColor,
		) ;
    
	}

	return (
		<button className={classStr}
			onClick={onClick}>
			disable={disable}

			{/* Start actual code  */}
			{buttonText}   
			{/* End code */}

		</button>
	)
}

export default Button