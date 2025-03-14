interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}

const CheckboxRow = ({ checked, indeterminate, onChange }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      ref={(input) => {
        if (input) {
          (input as HTMLInputElement).indeterminate = indeterminate || false;
        }
      }}
      onChange={onChange}
      className="mr-2"
    />
  );
};

export default CheckboxRow;
