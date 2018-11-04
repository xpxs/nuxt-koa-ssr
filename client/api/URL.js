let URL = ''
if (process.env.__ENV === 'development') {
  URL = 'http://localhost:3003'
} else if (process.env.__ENV === 'alpha') {
  URL = 'http://localhost:3003'
} else if (process.env.__ENV === 'production') {
  URL = 'http://localhost:3333'
} else if (process.env.__ENV === 'uat') {
  URL = 'http://localhost:3003'
} else {
  URL = 'http://localhost:9000'
}
export const BASE = {
  URL: URL
}
