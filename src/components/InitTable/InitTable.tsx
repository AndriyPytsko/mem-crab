import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from "react";
import { FormState } from "./InitTable.types";
import { TableContext } from "../../providers/TableProvider";
import "./style.css";

const initialState = {
  M: 10,
  N: 10,
  X: 5,
};

function InitTable() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const tableState = useContext(TableContext);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      tableState?.setTable(formState.M, formState.N, formState.X);
    },
    [formState, tableState]
  );

  return (
    <form onSubmit={onSubmit} className="form">
      <span className="form__label">M:</span>
      <input
        value={formState.M}
        name="M"
        onChange={onChange}
        type="number"
        min={0}
        max={100}
        className="form__input"
      />
      <span className="form__label">N:</span>
      <input
        value={formState.N}
        name="N"
        onChange={onChange}
        type="number"
        min={0}
        max={100}
        className="form__input"
      />
      <span className="form__label">X:</span>
      <input
        value={formState.X}
        name="X"
        onChange={onChange}
        type="number"
        min={0}
        max={formState.M * formState.N - 1}
        className="form__input"
      />
      <button className="form__submit" type="submit">
        Create
      </button>
    </form>
  );
}

export default InitTable;
