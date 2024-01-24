type RootProps = {
  children: React.ReactNode
  title: string
}

export function Root({ children, title }: RootProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
