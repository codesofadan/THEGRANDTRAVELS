// rollup.config.js
export default {
    // ...existing configuration...
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      }
    }
  };