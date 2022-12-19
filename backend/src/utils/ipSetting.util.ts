export async function ipSetting(event: any) {
  if (!process.env.IS_OFFLINE) {
    if ('/warm-up' === event.resource) {
      event.headers.sourceip = 'warmer';
      event.headers['user-agent'] = 'warmer';
    } else if (Object.keys(event).includes('headers')) {
      if (Object.keys(event.headers).includes('forwarded')) {
        event.headers.sourceip = event.headers.forwarded
          .split(';')[1]
          .split('=')[1];
      } else {
        event.headers = { sourceip: 'no-identification' };
      }
    } else {
      event.headers = { sourceip: 'no-identification' };
    }
  } else {
    event.headers.sourceip = event.headers.Host;
  }
}
