import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { QuoteModalProvider } from './QuoteModal'
import { TrackQuoteModalProvider } from './TrackQuoteModal'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  /** From Company contact global — drives quick quote modal targets. */
  quotePagePath?: string | null
}> = ({ children, quotePagePath = '/contact' }) => {
  return (
    <ThemeProvider>
      <TrackQuoteModalProvider>
        <QuoteModalProvider quotePagePath={quotePagePath || '/contact'}>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </QuoteModalProvider>
      </TrackQuoteModalProvider>
    </ThemeProvider>
  )
}
