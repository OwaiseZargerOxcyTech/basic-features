import React, { useState, useEffect, memo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel, useTheme } from "@mui/material";

interface SelectOptionProps {
  label: string;
  hideLabel?: boolean;
  required?: boolean;
  field: keyof FormValues; // Updated type
  idKey: string;
  getOptionLabel: (option: any) => string;
   dynamicOptions?: boolean; 
  loadOptions?: (params: any) => Promise<any[]>;
  loadOptionsParams?: any;
  staticOptions?: any[];
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  isDisabled?: boolean;
  defaultValue?: any;
  tourClass?: string;
}

interface FormValues {
  event_name: string;
  event_color: string;
  event_start_date: string;
  event_end_date: string;
  event_start_time: string;
  event_end_time: string;
  event_description: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  hideLabel,
  required,
  field,
  idKey,
  getOptionLabel,
  dynamicOptions,
  loadOptions,
  loadOptionsParams,
  staticOptions,
  formValues,
  setFormValues,
  isDisabled,
  defaultValue,
  tourClass,
}) => {
  const theme = useTheme();
  const [options, setOptions] = useState<any[]>([]);

  const handleChange =
    (fieldName: string) =>
    async (_event: React.SyntheticEvent, value: any | null) => {
      setFormValues({
        ...formValues,
        [fieldName]: value ? value[idKey] : null,
      });
    };

  useEffect(() => {
    const fetchOptions = async () => {
      if (loadOptions) {
        const apiOptions = await loadOptions({ ...loadOptionsParams });
        setOptions(apiOptions);
      }
    };

    if (dynamicOptions) {
      fetchOptions();
    } else {
      setOptions(staticOptions || []);
    }
  }, [dynamicOptions, loadOptions, loadOptionsParams, staticOptions]);

  return (
    <Box sx={{ textAlign: "left" }}>
      {!hideLabel && (
        <InputLabel sx={{ fontSize: "14px" }}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      )}

      <Autocomplete
        className={tourClass}
        size="small"
        sx={{ marginTop: "8px", width: "100%" }}
        defaultValue={defaultValue}
        options={options}
        disabled={isDisabled}
        value={
          options.find((option) => option[idKey] === formValues[field]) || null
        }
        onChange={handleChange(field)}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField {...params} placeholder={`Select ${label}`} />
        )}
      />
    </Box>
  );
};

export default memo(SelectOption);
