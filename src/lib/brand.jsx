/**
 * The studio's name is always lowercase — "empty agency" — even inside the
 * uppercase labels. `brandCase` keeps the rest of a label as it is and
 * lifts the name out of the label's text-transform.
 */
const NAME = /(empty agency)/i

export const brandCase = (v) =>
  typeof v === 'string' && NAME.test(v)
    ? v.split(NAME).map((part, i) =>
        NAME.test(part) ? (
          <span key={i} className="normal-case">
            empty agency
          </span>
        ) : (
          part
        )
      )
    : v
