export type IWColumnProps =
	| string
	| boolean
	| number
	| {
			size?: boolean | number | string
			// push?: string | number
			// pull?: string | number
			offset?: string | number
			order?: 'first' | 'last' | number
	  }
export const ApplyColumnProp = (size: string, columnProps: IWColumnProps | null | undefined): string => {
	if (!columnProps) return ''

	let application = ` col`
	if (size !== 'xs' || typeof columnProps === 'object') {
		application += `-${size}`
	}

	if (columnProps === true) return application

	if (typeof columnProps === 'number' || typeof columnProps === 'string') return `${application}-${columnProps}`

	if (typeof columnProps.size === 'number' || typeof columnProps.size === 'string') {
		application += `-${columnProps.size}`
	}

	if (columnProps.offset !== undefined) application += ` offset-${size}-${columnProps.offset}`

	if (columnProps.order !== undefined) application += ` order-${columnProps.order}`

	return application
}
