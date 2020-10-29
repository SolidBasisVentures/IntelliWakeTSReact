export interface ISortProperties {
	sort_column: string | null
	sort_ascending: boolean
	empty_to_bottom: boolean
	sort_column_2: string | null
	sort_ascending_2: boolean
	empty_to_bottom_2: boolean
}

export const initialSortProperties: ISortProperties = {
	sort_column: null,
	sort_ascending: true,
	empty_to_bottom: true,
	sort_column_2: null,
	sort_ascending_2: true,
	empty_to_bottom_2: true
}

export const SetSort = (
	currentProperties: ISortProperties,
	columnName: string,
	emptyToBottom: boolean = true,
	forceDirection: boolean | null = null
): ISortProperties => {
	if (columnName === currentProperties.sort_column) {
		return {
			...currentProperties,
			sort_ascending: !currentProperties.sort_ascending
		}
	} else {
		return {
			...currentProperties,
			sort_column_2: currentProperties.sort_column,
			sort_ascending_2: currentProperties.sort_ascending,
			empty_to_bottom_2: currentProperties.empty_to_bottom,
			sort_column: columnName,
			sort_ascending: forceDirection === null ? true : forceDirection,
			empty_to_bottom: emptyToBottom
		}
	}
}

export const SortObjects = <T>(objects: T[], sortProperties: ISortProperties): T[] => {
	if (sortProperties.sort_column !== null) {
		return objects.sort((object_a, object_b) => {
			const emptyToBottom_1 = sortProperties.empty_to_bottom
				? !!object_a[sortProperties.sort_column ?? ''] && !object_b[sortProperties.sort_column ?? '']
					? -1
					: !object_a[sortProperties.sort_column ?? ''] && !!object_b[sortProperties.sort_column ?? '']
					? 1
					: 0
				: 0
			const comparison_1 =
				(isNaN(object_a[sortProperties.sort_column ?? ''])
					? (object_a[sortProperties.sort_column ?? ''] ?? '').localeCompare(
							object_b[sortProperties.sort_column ?? ''] ?? '',
							undefined,
							{sensitivity: 'base'}
					  )
					: object_a[sortProperties.sort_column ?? ''] - object_b[sortProperties.sort_column ?? '']) *
				(sortProperties.sort_ascending ? 1 : -1)

			if (sortProperties.sort_column_2 === null) {
				return emptyToBottom_1 || comparison_1
			} else {
				const emptyToBottom_2 = sortProperties.empty_to_bottom_2
					? !!object_a[sortProperties.sort_column_2 ?? ''] && !object_b[sortProperties.sort_column_2 ?? '']
						? -1
						: !object_a[sortProperties.sort_column_2 ?? ''] && !!object_b[sortProperties.sort_column_2 ?? '']
						? 1
						: 0
					: 0
				const comparison_2 =
					(isNaN(object_a[sortProperties.sort_column_2 ?? ''])
						? (object_a[sortProperties.sort_column_2 ?? ''] ?? '').localeCompare(
								object_b[sortProperties.sort_column_2 ?? ''] ?? '',
								undefined,
								{sensitivity: 'base'}
						  )
						: object_a[sortProperties.sort_column_2 ?? ''] - object_b[sortProperties.sort_column_2 ?? '']) *
					(sortProperties.sort_ascending_2 ? 1 : -1)

				return emptyToBottom_1 || comparison_1 || emptyToBottom_2 || comparison_2
			}
		})
	} else {
		return objects
	}
}

export const FilterObjects = <T>(objects: T[], filter: string): T[] => {
	if (!filter) return objects

	const filterItems = filter
		.split(' ')
		.filter((filterItem) => !!filterItem)
		.map((filterItem) => filterItem.toString().toLowerCase())

	return objects.filter((object) => {
		const values = Object.values(object).join('}{').toLowerCase()

		return filterItems.length === filterItems.filter((filterItem) => values.includes(filterItem)).length
	})
}
