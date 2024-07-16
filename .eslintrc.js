export const plugins = ['eslint-plugin-functions', /* Your custom rule plugin */
];
export const rules = {
  // ... other ESLint rules
  'functions/function-declaration': 'error', // Reports missing function declarations
  'functions/function-name': 'error', // Reports invalid function names
  // Add custom rule configuration here if applicable
};
