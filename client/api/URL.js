let URL = ''
if (process.env.__ENV === 'development') {
  URL = ''
} else if (process.env.__ENV === 'alpha') {
  URL = 'http://127.0.0.1:3000'
} else if (process.env.__ENV === 'production') {
  URL = 'http://127.0.0.1:3330'
} else if (process.env.__ENV === 'uat') {
  URL = 'http://127.0.0.1:3000'
} else {
  URL = 'http://127.0.0.1:9000'
}
export const BASE = {
  URL: URL
}
