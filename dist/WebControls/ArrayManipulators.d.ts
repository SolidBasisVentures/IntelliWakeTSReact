export interface ISortProperties {
    sort_column: string | null;
    sort_ascending: boolean;
    empty_to_bottom: boolean;
    sort_column_2: string | null;
    sort_ascending_2: boolean;
    empty_to_bottom_2: boolean;
}
export declare const initialSortProperties: ISortProperties;
export declare const SetSort: (currentProperties: ISortProperties, columnName: string, emptyToBottom?: boolean, forceDirection?: boolean | null) => ISortProperties;
export declare const SortObjects: <T>(objects: T[], sortProperties: ISortProperties) => T[];
export declare const FilterObjects: <T>(objects: T[], filter: string) => T[];
