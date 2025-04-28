// pillo/.eslintrc.cjs
module.exports = {
    root: true, // Indica a ESLint que no busque más configs en carpetas superiores
    env: { browser: true, es2020: true, node: true }, // Entornos disponibles
    extends: [
      'eslint:recommended', // Reglas base de ESLint
      'plugin:@typescript-eslint/recommended', // Reglas recomendadas para TS
      'plugin:react-hooks/recommended', // Reglas para React Hooks
      'plugin:react/recommended', // Reglas para React
      'plugin:react/jsx-runtime', // Para el nuevo runtime JSX de React 17+
      'prettier', // Desactiva reglas conflictivas (debe ir después de las otras)
      'plugin:prettier/recommended' // Integra Prettier
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'out', 'node_modules', 'apps/backend'], // Carpetas/archivos a ignorar
    parser: '@typescript-eslint/parser', // Usa el parser de TypeScript
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react-refresh', '@typescript-eslint', 'prettier'], // Plugins usados
    settings: { react: { version: '18.2' } }, // Especifica versión de React
    rules: {
      'react-refresh/only-export-components': [ // Regla específica de Vite/React Refresh
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'warn', // Muestra errores de Prettier como warnings
      '@typescript-eslint/no-explicit-any': 'warn', // No permitir 'any' explícitos (cumple requisito noImplicitAny)
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Advertir sobre variables no usadas
      // Puedes añadir o sobreescribir más reglas aquí
    },
  };