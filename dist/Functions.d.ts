import React from 'react';
export declare const KEY_UP_ARROW = 38;
export declare const KEY_DOWN_ARROW = 40;
export declare const KEY_LEFT_ARROW = 37;
export declare const KEY_RIGHT_ARROW = 39;
export declare const KEY_SPACE = 32;
export declare const KEY_ENTER = 13;
export declare const KEY_TAB = 9;
export declare const ElementCustomValue: (e: React.ChangeEvent<HTMLInputElement>) => any;
export declare const ClassNames: (classes: {
    [key: string]: boolean;
}) => string;
export declare const HasPathComponent: (search: string) => boolean;
export declare const GetPathComponentAfter: (search: string) => any | undefined;
export declare const GetPathThrough: (search: string) => any | undefined;
export declare const CaptureGPS: () => Promise<Position | null>;
export declare const DownloadBase64Data: (fileName: string, base64: string, type: string) => void;
