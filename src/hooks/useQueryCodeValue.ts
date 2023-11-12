import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import type { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

const useQueryCodeValue = <T extends FieldValues>({
  formSetValue,
  formValueName,
}: {
  formSetValue: UseFormSetValue<T>;
  formValueName: Path<T>;
}) => {
  const [searchParams] = useSearchParams();

  const queryCodeValue = searchParams.get("code");

  useEffect(() => {
    if (!queryCodeValue) return;

    formSetValue(formValueName, queryCodeValue as unknown as PathValue<T, Path<T>>);
  }, [queryCodeValue]);
};

export default useQueryCodeValue;
