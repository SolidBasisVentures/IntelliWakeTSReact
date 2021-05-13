interface IProps {
    value?: number | null;
    currency?: boolean;
    percent?: boolean;
    dash?: boolean;
    blank?: boolean;
    decimals?: number;
    className?: string;
    classNameAddOnNegative?: string;
}
export declare function NumberFormat(props: IProps): JSX.Element;
export {};
