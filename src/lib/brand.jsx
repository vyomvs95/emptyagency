/**
 * The studio's name is always lowercase — "empty agency". Nothing on the site
 * is set in caps any more, so this is a guard: wherever a label value might
 * spell the name in capitals, `brandCase` forces it back to lowercase.
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
