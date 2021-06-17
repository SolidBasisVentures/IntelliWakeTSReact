import React from 'react'

export interface IIWNavbarTogglerProps extends React.HTMLProps<HTMLButtonElement> {}

export const NavbarToggler = (props: IIWNavbarTogglerProps) => {
	return (
		<button
			{...props}
			type="button"
			aria-label="Toggle navigation"
			className={(props.className ?? '') + ' navbar-toggler'}>
			<span className="navbar-toggler-icon" />
		</button>
	)
}
