import {
  WEBSITE
} from './WEBSITE'
import {
  CONFIG_API
} from './CONFIG_API'
export const CONFIG_DB = {
  mysql: {
    user: 'root',
    password: '',
    database: WEBSITE.name + 'db',
    host: CONFIG_API.HOST
  }
}