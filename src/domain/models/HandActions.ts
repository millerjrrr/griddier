import { ValidActionFreqValue } from "../value-objects/ValidActionFreqValue";

export interface HandActions {
  prior: ValidActionFreqValue;
  allin: ValidActionFreqValue;
  raise: ValidActionFreqValue;
  call: ValidActionFreqValue;
  fold?: ValidActionFreqValue;
}
