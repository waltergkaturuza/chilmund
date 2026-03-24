/**
 * Minimal Lexical root builders for seed / static page JSON (Payload richtext).
 */

export const textNode = (text: string, format = 0) => ({
  type: 'text' as const,
  detail: 0,
  format,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

export const heading = (tag: 'h1' | 'h2' | 'h3' | 'h4', text: string) => ({
  type: 'heading' as const,
  tag,
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

export const paragraph = (parts: ReturnType<typeof textNode>[]) => ({
  type: 'paragraph' as const,
  children: parts,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const line = (text: string) => paragraph([textNode(text)])

export const richRoot = (
  children: ReturnType<typeof heading | typeof paragraph | typeof line>[],
) => ({
  root: {
    type: 'root' as const,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})
