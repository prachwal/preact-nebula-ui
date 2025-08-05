import type { HTMLAttributes } from 'preact/compat'
import type { ComponentChildren } from 'preact'

export interface AutocompleteOption {
  /** Unique identifier for the option */
  value: string | number
  /** Display label for the option */
  label: string
  /** Optional description or secondary text */
  description?: string
  /** Whether the option is disabled */
  disabled?: boolean
  /** Optional group identifier for grouped options */
  group?: string
  /** Additional data associated with the option */
  data?: Record<string, any>
}

export interface AutocompleteGroup {
  /** Group identifier */
  id: string
  /** Display label for the group */
  label: string
  /** Options in this group */
  options: AutocompleteOption[]
}

export interface AutocompleteProps extends Omit<HTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onSelect' | 'onSearch' | 'size'> {
  /** Current selected value(s) */
  value?: AutocompleteOption | AutocompleteOption[] | null
  /** Default selected value(s) for uncontrolled mode */
  defaultValue?: AutocompleteOption | AutocompleteOption[] | null
  /** Available options */
  options?: AutocompleteOption[]
  /** Grouped options */
  groupedOptions?: AutocompleteGroup[]
  /** Whether multiple selection is allowed */
  multiple?: boolean
  /** Maximum number of selections (for multiple mode) */
  maxSelections?: number
  /** Input placeholder text */
  placeholder?: string
  /** Component size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is read-only */
  readOnly?: boolean
  /** Whether the input is required */
  required?: boolean
  /** Error state */
  error?: boolean
  /** Error message to display */
  errorMessage?: string
  /** Loading state */
  loading?: boolean
  /** No options found message */
  noOptionsText?: string
  /** Loading text */
  loadingText?: string
  /** Whether to show create option when no matches found */
  allowCreate?: boolean
  /** Text for create option */
  createText?: string
  /** Minimum characters to start searching */
  minSearchLength?: number
  /** Debounce delay for search in milliseconds */
  debounceMs?: number
  /** Maximum number of options to display */
  maxDisplayOptions?: number
  /** Whether to clear input on selection (for single mode) */
  clearOnSelect?: boolean
  /** Whether to show clear button */
  showClear?: boolean
  /** Custom filter function */
  filterFn?: (options: AutocompleteOption[], searchTerm: string) => AutocompleteOption[]
  /** Function to fetch options asynchronously */
  onSearch?: (searchTerm: string) => Promise<AutocompleteOption[]> | AutocompleteOption[]
  /** Callback when value changes */
  onChange?: (value: AutocompleteOption | AutocompleteOption[] | null) => void
  /** Callback when an option is selected */
  onSelect?: (option: AutocompleteOption) => void
  /** Callback when input value changes */
  onInputChange?: (inputValue: string) => void
  /** Callback when create option is selected */
  onCreate?: (inputValue: string) => void
  /** Custom option renderer */
  renderOption?: (option: AutocompleteOption, isHighlighted: boolean) => ComponentChildren
  /** Custom selected option renderer (for multiple mode) */
  renderTag?: (option: AutocompleteOption, onRemove: () => void) => ComponentChildren
  /** Custom no options renderer */
  renderNoOptions?: (searchTerm: string) => ComponentChildren
  /** Custom loading renderer */
  renderLoading?: () => ComponentChildren
  /** Custom create option renderer */
  renderCreateOption?: (inputValue: string) => ComponentChildren
}

export interface AutocompleteRef {
  /** Focus the input */
  focus: () => void
  /** Blur the input */
  blur: () => void
  /** Clear the selection */
  clear: () => void
  /** Get current input value */
  getInputValue: () => string
  /** Set input value */
  setInputValue: (value: string) => void
}
