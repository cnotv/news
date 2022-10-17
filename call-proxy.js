export default async (_, context) => {
  const response = await context.next()
  // const contentType = response.headers.get('content-type')
  const headers = [
    'content-security-policy',
    'x-content-security-policy',
    'x-ua-compatible',
    'x-webkit-csp',
    'x-xss-protection',
    'x-frame-options',
  ]

  // Loop over the headers of our response…
  response.headers.forEach((value, key, object) => {
    if (headers.includes(key)) {
      object.delete(key)
    }
  })

  return response
}
