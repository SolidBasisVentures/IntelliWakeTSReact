export declare enum Environments {
    ENV_Local = "ENV_Local",
    ENV_Dev = "ENV_Dev",
    ENV_Test = "ENV_Test",
    ENV_QA = "ENV_QA",
    ENV_Demo = "ENV_Demo",
    ENV_ProdSupport = "ENV_ProdSupport",
    ENV_Prod = "ENV_Prod"
}
export declare const IsENV: (environments: Environments | Environments[]) => boolean;
export declare const IsDevFocused: () => boolean;
