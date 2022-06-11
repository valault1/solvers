import { FieldMetadata } from "domains/Calculators/sharedTypes";

export const getFieldMetadataByName = (
  fieldsMetadata: FieldMetadata[],
  fieldName: string
) => {
  return fieldsMetadata.find((x) => x.name === fieldName);
};
