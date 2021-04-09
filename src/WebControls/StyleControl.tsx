import React from 'react'

interface IProps {
	css?: string | null
}

export function StyleControl(props: IProps) {
	return !props.css ? <></> : <style dangerouslySetInnerHTML={{__html: props.css}} />
}
