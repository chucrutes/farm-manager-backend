import { RefinementCtx } from 'zod'

type SuperRefineCT = {
  min?: number
  max?: number
  clearHtml?: boolean
}

/**
 * Clear HTML tags from a string, by default replace by empty string
 *
 * @param text the text to clear
 * @param replaceBy the string to replace the tags
 * @returns the text without HTML tags
 */
export const ct = (text: string, replaceBy?: string) => {
  return text?.trim().replace(/(<([^>]+)>)/gi, replaceBy || '')
}

/**
 * Check if the text has a minimum length. It will be used
 * in zod schema validation.
 *
 * @example .refine((v) => min(v))
 * @example .refine((v) => min(v, 10))
 */
export const min = (text: string, value = 1) => {
  return ct(text)?.trim().length >= value
}

/**
 * Check if the text has a minimum length. It will be used
 * in zod schema validation.
 *
 * @example .refine((v) => max(v, 10))
 */
export const max = (text: string, value = 1000) => {
  return ct(text)?.trim().length <= value
}

/**
 * Shows 'required' error message if the text is empty. It will be used
 * in zod schema validation.
 */
export const required = () => {
  return { params: { i18n: { key: 'required' } } }
}

/**
 * Shows 'message' error message if the text is empty. It will be used
 * in zod schema validation.
 */
export const message = (key: string, value?: string | number) => {
  return { params: { i18n: { key, values: { value } } } }
}

/**
 * A custom refinement to validate the text length. It will be used
 * in zod schema validation.
 *
 * @param value the text to validate
 * @param errors the errors object to add issues
 * @param editor the editor object to get the min and max values
 *
 * @example .superRefine((v, e) => sct(v, e)) // default max value (100)
 * @example .superRefine((v, e) => sct(v, e, { min: { value: 10 } })) // custom min value
 * @example .superRefine((v, e) => sct(v, e, { max: { value: 10 } })) // custom max value
 * @example .superRefine((v, e) => sct(v, e, { min: { value: 10 }, max: { value: 100 } })) // custom min and max values
 */
export function editor(
  value: string,
  errors: RefinementCtx,
  editor?: SuperRefineCT,
) {
  const minValue = editor?.min
  const maxValue = editor?.max || 100

  if (minValue && !min(value, minValue)) {
    errors?.addIssue({
      code: 'custom',
      ...(minValue === 1 ? required() : message('min', minValue)),
    })
    return
  }

  if (maxValue && !max(value, maxValue)) {
    errors?.addIssue({
      code: 'custom',
      ...message('max', maxValue),
    })
    return
  }

  return editor?.clearHtml ? ct(value) : value
}

/**
 * Check if the text is a valid email. It will be used
 * in zod schema validation.
 *
 * @param value the email to validate
 * @returns true if the email is valid
 */
export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/**
 * Check if the text is a valid username. It will be used
 * in zod schema validation.
 *
 * @param value the username to validate
 * @returns true if the username is valid
 */
export function isUsername(value: string) {
  if (value.includes('@')) {
    return false
  }

  return /^[a-z0-9_.-]*$/.test(value)
}

export function isUsernameOrEmail(value: string, errors: RefinementCtx) {
  const isValidEmail = value.includes('@') && isEmail(value)
  const isValidUsername = !isValidEmail && isUsername(value)
  const errorMessage = value.includes('@')
    ? 'invalid_email'
    : 'invalid_username'

  if (!isValidEmail && !isValidUsername) {
    errors.addIssue({
      code: 'custom',
      ...message(errorMessage),
    })
  }
}

/**
 * Replace HTML tags with Overleaf tags
 *
 * Packages needed:
 * - \usepackage{soul}
 * - \usepackage{ulem}
 *
 * @param text the text to replace
 * @returns the text with Overleaf tags
 */
export function htmlToOverleaf(text: string) {
  return text
    ?.trim()
    .replace(
      /<p[^>]*>(.*?)<\/p>(?=(.*))/g,
      (_, g1, g2) =>
        `${g1}${g2?.trim().length && !g2.includes('li') ? '\n\n' : ''}`,
    ) // remove <p>
    .replace(/<br[^>]*>/g, '\\\\') // replace <br> with \\
    .replace(/<strong>(.*?)<\/strong>/g, '\\textbf{$1}') // replace <strong> with \textbf{}
    .replace(/<em>(.*?)<\/em>/g, '\\textit{$1}') // replace <em> with \textit{}
    .replace(
      /<h1>(.*?)<\/h1>(?=(.*))/g,
      (_, g1, g2) => `\\section{${g1}}${g2?.trim() && '\n\n'}`,
    ) // replace <h1> with \section{}
    .replace(
      /<h2>(.*?)<\/h2>(?=(.*))/g,
      (_, g1, g2) => `\\subsection{${g1}}${g2?.trim() && '\n\n'}`,
    ) // replace <h2> with \subsection{}
    .replace(/<s>(.*?)<\/s>/g, '\\sout{$1}') // replace <s> with \sout{}
    .replace(/<u>(.*?)<\/u>/g, '\\uline{$1}') // replace <u> with \uline{}
    .replace(/<a[^>]*href="(.*?)">(.*?)<\/a>/g, '\\href{$1}{$2}') // replace <a> with \href{}
    .replace(/<mark[^>]*>(.*?)<\/mark>/g, '\\hl{$1}') // replace <mark> with \hl{}
    .replace(
      /<ol>(.*?)<\/ol>(?=(.*))/g,
      (_, g1, g2) =>
        `\\begin{enumerate}\n${g1}\n\\end{enumerate}${
          g2.trim().length ? '\n\n' : ''
        }`,
    ) // replace <ol> with \begin{enumerate}
    .replace(/<ul>(.*?)<\/ul>/g, '\\begin{itemize}\n$1\n\\end{itemize}') // replace <ul> with \begin{itemize}
    .replace(
      /<li>(.*?)<\/li>(?=(.*))/g,
      (_, g1, g2) => `\t\\item ${g1}${g2?.trim().length ? '\n' : ''}`,
    ) // replace <li> with \item
}
