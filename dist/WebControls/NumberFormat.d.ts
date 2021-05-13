interface IProps {
    value?: number | null;
    displayType?: 'Digits' | 'Currency' | 'Percent';
    zeroShows?: 'Zero' | 'Dash' | 'Blank';
    decimals?: number;
    className?: string;
    classNameAddOnNegative?: string;
}
export declare function NumberFormat(props: IProps): JSX.Element;
export {};
