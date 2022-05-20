import * as React from "react";

// Currently supported types can be found in the FieldType
export type InputFieldsState = Map<string, any>;

export type InputFieldsErrors = Map<string, string | undefined>;

export enum FieldType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
}

export type FieldMetadata = {
  type: FieldType;
  name: string;
  label: React.ReactNode;
};

export type Field = {
  value: any;
} & FieldMetadata;
