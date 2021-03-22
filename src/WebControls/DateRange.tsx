import React, {useEffect, useRef, useState} from 'react'
import moment, {Moment} from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt} from '@fortawesome/pro-regular-svg-icons'
import {MomentDateString, MomentFromString} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export const customRangeName = 'Custom Range'

export interface IDateRangeString {
	name: string,
	start: string,
	end: string
}

export const CreateCustomDateRange = (dateStart: Moment | string, dateEnd: Moment | string): IDateRangeString => {
	return {
		name: customRangeName,
		start: DateRangeDateMomentToString(dateStart),
		end: DateRangeDateMomentToString(dateEnd)
	}
}

export const DateRangeDateMomentToString = (date: Moment | string): string => typeof date === 'string' ? date : MomentDateString(date.startOf('day')) ?? moment().format('YYYY-MM-DD')

export const DateRangeDateStringToMoment = (date: Moment | string): Moment => typeof date === 'string' ? MomentFromString(date) ?? moment() : date

export const DateRangeToMoment = (dateRange: IDateRange | IDateRangeString): IDateRange => ({
	name: dateRange.name,
	start: DateRangeDateStringToMoment(dateRange.start),
	end: DateRangeDateStringToMoment(dateRange.end)
})

export const DateRangeToString = (dateRange: IDateRange | IDateRangeString): IDateRangeString => ({
	name: dateRange.name,
	start: DateRangeDateMomentToString(dateRange.start),
	end: DateRangeDateMomentToString(dateRange.end)
})

export interface IDateRange {
	name: string,
	start: Moment,
	end: Moment
}

export const initialDateRange: IDateRange = {
	name: customRangeName,
	start: moment(),
	end: moment()
}

export const initialDateRangeString: IDateRangeString = DateRangeToString(initialDateRange)

interface IPropsCalendar {
	month: Moment,
	startSelected: Moment,
	endSelected: Moment,
	dateClick: ((date: Moment) => void),
	prevMonth?: Function,
	nextMonth?: Function
}

export const DateRangeCalendar = (props: IPropsCalendar) => {
	let moments: (Moment[])[] = []
	
	let firstDay = props.month.clone().startOf('month')
	let currentDay = firstDay.clone().startOf('week')
	let lastDay = props.month.clone().endOf('month')
	
	while (currentDay.isBefore(lastDay)) {
		let week: Moment[] = []
		
		do {
			week.push(currentDay.clone())
			currentDay.add(1, 'day')
		} while (currentDay.weekday() > 0)
		
		moments.push(week)
	}
	
	const prev = () => {
		if (props.prevMonth) {
			props.prevMonth()
		}
	}
	
	const next = () => {
		if (props.nextMonth) {
			props.nextMonth()
		}
	}
	
	return (
		<table>
			<thead>
			<tr>
				{props.prevMonth !== undefined
					?
					<th className="prev available" onClick={prev}><span> </span></th>
					:
					<th />
				}
				<th colSpan={5} className="month">{firstDay.format('MMM YYYY')}</th>
				{props.nextMonth !== undefined
					?
					<th className="next available" onClick={next}><span> </span></th>
					:
					<th />
				}
			</tr>
			<tr>
				<th>Su</th>
				<th>Mo</th>
				<th>Tu</th>
				<th>We</th>
				<th>Th</th>
				<th>Fr</th>
				<th>Sa</th>
			</tr>
			</thead>
			<tbody>
			{moments.map((week, idx: number) =>
				<tr key={idx}>
					{week.map((day) =>
						<td className={
							(day.format('dd') === 'Sa' || day.format('dd') === 'Su' ? 'weekend ' : '') +
							((day.isBefore(firstDay, 'day') || day.isAfter(lastDay, 'day')) && !day.isBetween(props.startSelected, props.endSelected, 'day', '[]') ? 'off ends ' : '') +
							(day.isSame(props.startSelected, 'day') ? 'active start-date ' : '') +
							(day.isBetween(props.startSelected, props.endSelected, 'day') ? 'in-range ' : '') +
							(day.isSame(props.endSelected, 'day') ? 'active end-date ' : '') +
							'available '
						} key={day.format()} onClick={() => props.dateClick(day)}>
							{day.format('D')}
						</td>
					)}
				</tr>
			)}
			</tbody>
		</table>
	)
}

export interface IPropsDateRange {
	selectRange?: ((range: IDateRange) => void),
	selectRangeString?: ((range: IDateRangeString) => void),
	presetRanges?: (IDateRange | IDateRangeString)[],
	defaultRange?: IDateRange | IDateRangeString,
	showCaret?: boolean,
	faIcon?: any | undefined | null,
	borderless?: boolean,
	color?: string,
	className?: string,
	rightAlign?: boolean
}

export const DateRange = (props: IPropsDateRange) => {
	const nodeParent: any = useRef()
	const nodeBody: any = useRef()
	
	const getStartRange = (): IDateRange => {
		if (props.defaultRange && props.defaultRange.name) {
			if (props.defaultRange.name === customRangeName) {
				return DateRangeToMoment(props.defaultRange)
			}
			
			if (!!props.presetRanges) {
				const presetRanges = props.presetRanges.map(range => DateRangeToMoment(range))
				
				if (presetRanges.length > 0) {
					const foundItem = presetRanges.find((item: IDateRange) => props.defaultRange!.name === item.name)
					if (foundItem) {
						return foundItem
					}
					
					const foundItemStartsWith = presetRanges.find((item) => item.name.startsWith(props.defaultRange!.name))
					if (foundItemStartsWith) {
						return foundItemStartsWith
					}
				}
			}
		}
		
		if (props.presetRanges && props.presetRanges.length > 0) return DateRangeToMoment(props.presetRanges[0])
		
		return initialDateRange
	}
	
	const [state, setState] = useState({
		isOpen: false,
		selectedRange: getStartRange(),
		selectedText: '',
		prevPreset: null as IDateRange | null,
		customRange: initialDateRange,
		monthToShow: getStartRange().start,
		applyToFirst: true
	})
	
	const getCurrentRange = (): IDateRange => {
		if (state.selectedRange) return state.selectedRange
		
		return getStartRange()
	}
	
	const currentRange = getCurrentRange()
	
	const rangeDescription = (range: IDateRange): string => {
		return (range.name === customRangeName ? (moment(range.start).format('L') + ' - ' + moment(range.end).format('L')) : range.name)
	}
	
	const setOpen = (e: any) => {
		if (!nodeBody.current.contains(e.target)) {
			setState({...state, isOpen: true})
		}
	}
	
	const handleClick = (e: any) => {
		if (!nodeParent.current.contains(e.target)) {
			setState({...state, isOpen: false})
		}
	}
	
	const handlePresetClick = (range: IDateRange) => {
		setState({...state, isOpen: false, selectedRange: range})
		
		if (!!props.selectRange) props.selectRange(range)
		if (!!props.selectRangeString) props.selectRangeString(DateRangeToString(range))
	}
	
	const handleCustomApplyClick = () => {
		setState({...state, isOpen: false, selectedRange: state.customRange})
		
		if (!!props.selectRange) props.selectRange(state.customRange)
		if (!!props.selectRangeString) props.selectRangeString(DateRangeToString(state.customRange))
	}
	
	const handleCustomClick = () => {
		const customRange = {...getCurrentRange(), name: customRangeName}
		
		setState({...state, prevPreset: currentRange, customRange: customRange})
	}
	
	const handleUnCustomClick = () => {
		const customRange = {...getCurrentRange(), name: customRangeName}
		
		setState({...state, prevPreset: null, customRange: customRange})
	}
	
	const handleDateClick = (day: Moment) => {
		let newState = {...state}
		
		if (newState.applyToFirst) {
			newState.customRange.start = day
		} else {
			newState.customRange.end = day
		}
		
		if (newState.customRange.start.isAfter(newState.customRange.end)) {
			[newState.customRange.start, newState.customRange.end] = [newState.customRange.end, newState.customRange.start]
		}
		
		newState.applyToFirst = !newState.applyToFirst
		
		setState(newState)
	}
	
	const prevMonth = () => {
		const prev = state.monthToShow.clone().subtract(1, 'month')
		setState({...state, monthToShow: prev})
	}
	
	const nextMonth = () => {
		const next = state.monthToShow.clone().add(1, 'month')
		setState({...state, monthToShow: next})
	}
	
	useEffect(() => {
		document.addEventListener('mousedown', handleClick)
		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	})
	
	return (
		<div className={'DateRangeDD ' + (props.className ?? '') + (props.borderless ? '' : ' border') + (props.showCaret ? ' dropdown-toggle' : '')}
				 onClick={setOpen} ref={nodeParent} color={props.color}>
			{props.faIcon !== null &&
				<FontAwesomeIcon icon={props.faIcon ? props.faIcon : faCalendarAlt} fixedWidth />
			} {rangeDescription(state.selectedRange!)}
			<div className={ClassNames({DateRangeLB: true, OpensRight: !props.rightAlign, 'd-none': !state.isOpen})} ref={nodeBody}>
				<div className={'ranges' + (state.prevPreset ? ' d-none' : '')}>
					<ul>
						{props.presetRanges!.map((preset: IDateRange, idx: number) =>
							<li key={idx} onClick={() => handlePresetClick(preset)} className={(preset.name === currentRange.name ? 'active' : '')}>
								{preset.name}
							</li>
						)}
						<li onClick={handleCustomClick}>
							{customRangeName}
							<span className="float-right">&gt;</span>
						</li>
					</ul>
				</div>
				<div className={'drp-headers' + (!state.prevPreset ? ' d-none' : '')} onClick={handleUnCustomClick}>
                    <span>
                        &lt; Presets
                    </span>
				</div>
				<div className={'drp-calendar left' + (!state.prevPreset ? ' d-none' : '')}>
					<div className="calendar-table">
						
						<DateRangeCalendar month={state.monthToShow} startSelected={state.customRange.start} endSelected={state.customRange.end} prevMonth={prevMonth} nextMonth={nextMonth} dateClick={handleDateClick} />
					</div>
				</div>
				<div className={'drp-buttons' + (!state.prevPreset ? ' d-none' : '')}>
					<span className="drp-selected">{rangeDescription(state.customRange)}</span>
					<button className="btn btn-sm btn-primary" type="button" onClick={handleCustomApplyClick}>Apply</button>
				</div>
			</div>
		</div>
	)
}

export const defaultRanges: IDateRange[] = [
	{
		name: 'This Week #' + moment().format('w'),
		start: moment().startOf('week'),
		end: moment().endOf('week')
	},
	{
		name: 'Last Week #' + moment().subtract(1, 'week').format('w'),
		start: moment().subtract(1, 'week').startOf('week'),
		end: moment().subtract(1, 'week').endOf('week')
	},
	{
		name: 'Previous 4 Weeks',
		start: moment().subtract(4, 'week').startOf('week'),
		end: moment().subtract(1, 'week').endOf('week')
	},
	{
		name: 'This Month',
		start: moment().startOf('month'),
		end: moment().endOf('month')
	},
	{
		name: 'Last Month',
		start: moment().subtract(1, 'month').startOf('month'),
		end: moment().subtract(1, 'month').endOf('month')
	},
	{
		name: 'Last 7 Days',
		start: moment().subtract(6, 'days').startOf('day'),
		end: moment().endOf('day')
	},
	{
		name: 'Last 30 Days',
		start: moment().subtract(29, 'days').startOf('day'),
		end: moment().endOf('day')
	}
]

export const defaultRangeStrings: IDateRangeString[] = defaultRanges.map(range => DateRangeToString(range))

export const defaultRangesReport: IDateRange[] = [
	{
		name: 'This Week',
		start: moment().startOf('week'),
		end: moment().endOf('week')
	},
	{
		name: 'Last Week',
		start: moment().subtract(1, 'week').startOf('week'),
		end: moment().subtract(1, 'week').endOf('week')
	},
	{
		name: 'This Month',
		start: moment().startOf('month'),
		end: moment().endOf('month')
	},
	{
		name: 'Last Month',
		start: moment().subtract(1, 'month').startOf('month'),
		end: moment().subtract(1, 'month').endOf('month')
	},
	{
		name: 'Year-to-Date',
		start: moment().startOf('year'),
		end: moment().endOf('year')
	},
	{
		name: 'Last Year',
		start: moment().subtract(1, 'year').startOf('year'),
		end: moment().subtract(1, 'year').endOf('year')
	}
]

export const defaultRangeStringsReport: IDateRangeString[] = defaultRangesReport.map(range => DateRangeToString(range))

export const defaultRangesReportQuarterly: IDateRange[] = [
	{
		name: 'This Month',
		start: moment().startOf('month'),
		end: moment().endOf('month')
	},
	{
		name: 'Last Month',
		start: moment().subtract(1, 'month').startOf('month'),
		end: moment().subtract(1, 'month').endOf('month')
	},
	{
		name: 'This Quarter',
		start: moment().startOf('quarter'),
		end: moment().endOf('quarter')
	},
	{
		name: 'Last Quarter',
		start: moment().subtract(1, 'quarter').startOf('quarter'),
		end: moment().subtract(1, 'quarter').endOf('quarter')
	},
	{
		name: '2 Quarters ago',
		start: moment().subtract(2, 'quarter').startOf('quarter'),
		end: moment().subtract(2, 'quarter').endOf('quarter')
	},
	{
		name: '3 Quarters ago',
		start: moment().subtract(3, 'quarter').startOf('quarter'),
		end: moment().subtract(3, 'quarter').endOf('quarter')
	},
	{
		name: '4 Quarters ago',
		start: moment().subtract(4, 'quarter').startOf('quarter'),
		end: moment().subtract(4, 'quarter').endOf('quarter')
	},
	{
		name: 'Year to Date',
		start: moment().startOf('year'),
		end: moment()
	},
	{
		name: 'This Year',
		start: moment().startOf('year'),
		end: moment().endOf('year')
	},
	{
		name: 'Last Year',
		start: moment().subtract(1, 'year').startOf('year'),
		end: moment().subtract(1, 'year').endOf('year')
	}
]

export const defaultRangeStringsReportQuarterly: IDateRangeString[] = defaultRangesReportQuarterly.map(range => DateRangeToString(range))

/**
 * Default to this month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export const defaultRange: IDateRange = {
	name: 'This Month',
	start: moment().startOf('month'),
	end: moment().endOf('month')
}

/**
 * Default to this week
 *
 * Use DateRangeToString(defaultRangeWeek) to get a string of it
 */
export const defaultRangeWeek: IDateRange = {
	name: 'This Week',
	start: moment().startOf('week'),
	end: moment().endOf('week')
}

/**
 * Default to last 4 weeks
 *
 * Use DateRangeToString(defaultRangeLast4Weeks) to get a string of it
 */
export const defaultRangeLast4Weeks: IDateRange = {
	name: 'Last 4 Weeks',
	start: moment().subtract(3, 'week').startOf('week'),
	end: moment().endOf('week')
}

/**
 * Default to this year
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
export const defaultRangeYear: IDateRange = {
	name: 'Year-to-Date',
	start: moment().startOf('year'),
	end: moment().endOf('year')
}

export const defaultRangeString = DateRangeToString(defaultRange)

// DateRange.defaultProps = {
// 	presetRanges: defaultRanges,
// 	showCaret: true,
// 	borderless: false
// } as Partial<IPropsDateRange>
