export default {
  'appenders': {
    'access': {
      'type': 'dateFile',
      'filename': './server/logs/access.log',
      'pattern': '-yyyy-MM-dd'
    },
    'rule-console': {
      'type': 'console'
    },
    'rule-file': {
      'type': 'dateFile',
      'filename': './server/logs/server-',
      'encoding': 'utf-8',
      'maxLogSize': 10000000,
      'numBackups': 3,
      'pattern': 'yyyy-MM-dd.log',
      'alwaysIncludePattern': true
    },
    'rule-error': {
      'type': 'dateFile',
      'filename': './server/logs/error-',
      'encoding': 'utf-8',
      'maxLogSize': 1000000,
      'numBackups': 3,
      'pattern': 'yyyy-MM-dd.log',
      'alwaysIncludePattern': true
    }
  },
  'categories': {
    'default': {
      'appenders': [
        'rule-console',
        'rule-file',
        'rule-error'
      ],
      'level': 'debug'
    },
    'http': {
      'appenders': [
        'access'
      ],
      'level': 'info'
    }
  }


  // 'appenders': [
  //   {
  //     'type': 'console'
  //   },
  //   {
  //     'type': 'clustered',
  //     'appenders': [
  //       {
  //         'type': 'dateFile',
  //         'level': 'http',
  //         'filename': 'http.log',
  //         'pattern': '-yyyy-MM-dd',
  //         'category': 'http'
  //       },
  //       {
  //         'type': 'file',
  //         'filename': 'app.log',
  //         'level': 'app',
  //         'maxLogSize': 10485760,
  //         'pattern': '-yyyy-MM-dd',
  //         'numBackups': 5
  //       },
  //       {
  //         'type': 'logLevelFilter',
  //         'level': 'ERROR',
  //         'appender': {
  //           'type': 'file',
  //           'filename': 'errors.log'
  //         }
  //       }
  //     ]
  //   }
  // ]
}