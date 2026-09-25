import { Fragment, type ReactNode } from "react";

/**
 * Adds break opportunities inside camel-cased names ("AspireFoundation" → "Aspire<wbr>Foundation")
 * so a long single-word title wraps between its parts in a narrow column instead of overflowing.
 */
export function softBreak(text: string): ReactNode {
  const parts = text.split(/(?<=[a-z])(?=[A-Z])/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}
