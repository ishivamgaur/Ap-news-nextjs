import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apnews.app',
  appName: 'APNews',
  server: {
    url: 'https://apnewsbihar.in',
    cleartext: true
  }
};

export default config;
