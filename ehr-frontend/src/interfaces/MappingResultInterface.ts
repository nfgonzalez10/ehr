export interface MappingVariable {
  id: number;
  parameterName: string;
  tenantId: number;
  referenceKeyName: string;
  keyReferenceId: number;
}

export interface MappingResult {
  tenant: { id: string; name: string };
  mapResult: MappingVariable[];
}
