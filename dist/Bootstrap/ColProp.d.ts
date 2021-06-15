export declare type IWColumnProps = string | boolean | number | {
    size?: boolean | number | string;
    offset?: string | number;
    order?: 'first' | 'last' | number;
};
export declare const ApplyColumnProp: (size: string, columnProps: IWColumnProps | null | undefined) => string;
