const handler = async (event, context) => {
  const allowedHeaders = [
    'content-security-policy',
    'x-content-security-policy',
    'x-ua-compatible',
    'x-webkit-csp',
    'x-xss-protection',
    'x-frame-options',
  ]

  try {
    const response = await fetch(url)

    // Loop over the headers of our response…
    response.headers.forEach((_, key, object) => {
      if (allowedHeaders.includes(key)) {
        object.delete(key)
      }
    })
    return { ...response, statusCode: 200 }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching website' }),
    }
  }
}

export { handler }
