# repositorio-plantillas

Colección de plantillas (starters) para proyectos web basados en TypeScript, HTML y SCSS.  
Este repositorio agrupa plantillas reutilizables pensadas para acelerar la creación de aplicaciones, componentes y micrositios con configuración lista para desarrollo y despliegue.

## Índice
- Descripción
- Tecnologías
- Requisitos
- Instalación general
- Cómo usar una plantilla
- Estructura recomendada de una plantilla
- Scripts comunes
- Buenas prácticas para añadir plantillas
- Tests y calidad
- Despliegue
- Contribuir
- Licencia
- Contacto

## Descripción
Cada carpeta de plantilla contiene un proyecto mínimo con configuración de build (p. ej. Vite, esbuild o similar), TypeScript, estilos SCSS y una página de ejemplo en HTML. Está pensado como repositorio de referencia y portafolio para crear nuevos proyectos a partir de un starter probado.

## Tecnologías
- TypeScript
- HTML
- SCSS
- Node.js (herramientas de build: Vite/webpack/esbuild, según plantilla)
- Opcional: herramientas de linting/formateo (ESLint, Prettier) y testing (Vitest/Jest)

## Requisitos
- Node.js 14+ (se recomienda 16+)
- npm, yarn o pnpm
- Git

## Instalación general
Clona el repositorio y explora las plantillas disponibles:
```bash
git clone https://github.com/cr1085/repositorio-plantillas.git
cd repositorio-plantillas
ls
# o para ver el contenido de la carpeta templates si existe:
ls templates || ls
```

## Cómo usar una plantilla
Flujo genérico para empezar con una plantilla:
1. Copia la plantilla a una nueva ubicación (o clona solo esa carpeta si usas herramientas que lo permitan):
```bash
cp -R templates/mi-plantilla ../mi-proyecto
cd ../mi-proyecto
```
2. Instala dependencias:
```bash
npm install
# o
pnpm install
# o
yarn
```
3. Ejecuta en modo desarrollo:
```bash
npm run dev
# o
npm run start
```
4. Construye para producción:
```bash
npm run build
```
5. Previsualiza el build (si la plantilla incluye preview):
```bash
npm run preview
# o usar npx serve dist
npx serve dist
```

Cada plantilla idealmente incluye su propio README con detalles específicos (puerto, comandos adicionales, variables de entorno).

## Estructura recomendada de una plantilla
Ejemplo de estructura mínima:
```
mi-plantilla/
├─ public/             # assets estáticos (opcional)
├─ src/
│  ├─ main.ts
│  ├─ index.html
│  └─ styles.scss
├─ package.json
├─ tsconfig.json
├─ vite.config.ts      # o webpack.config.js
├─ README.md
└─ .gitignore
```

## Scripts comunes (package.json)
- dev: servidor de desarrollo (vite, etc.)
- build: compilar para producción
- preview / serve: previsualizar build
- lint: ejecutar ESLint
- format: ejecutar Prettier
- test: ejecutar tests (Vitest/Jest)

Ejemplo:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .ts,.tsx,.js",
  "format": "prettier --write .",
  "test": "vitest"
}
```

## Buenas prácticas al añadir nuevas plantillas
- Incluir README con objetivo, comandos y requisitos.
- Mantener dependencias al mínimo.
- Incluir ejemplo funcional y una demo (index.html).
- Añadir .gitignore y .editorconfig preferente.
- Probar build y dev antes de publicar la plantilla.

## Tests y calidad de código
- Añadir linters (ESLint), formateadores (Prettier) y pruebas (Vitest/Jest) para plantillas que contengan lógica.
- Integrar checks en CI (GitHub Actions) para validar installs, lint y builds.

## Despliegue
- Sitios estáticos: generar `dist/` y desplegar en Netlify, Vercel o GitHub Pages.
- Apps con backend: documentar pasos de build y despliegue en el README de la plantilla correspondiente.

## Contribuir
1. Haz fork del repositorio.
2. Crea una rama: `git checkout -b feat/nueva-plantilla`
3. Añade tu plantilla en `templates/tu-plantilla/` con README y scripts.
4. Abre un pull request describiendo la plantilla, comandos y requisitos.

Revisa las pautas de calidad: incluya un README claro y pruebe `npm install` + `npm run dev` y `npm run build` antes de enviar el PR.

## Licencia / Aviso legal

Copyright © 2025 Cristian Cuadrado Beltrán – 3CB Soluciones.  
Todos los derechos reservados.

Este proyecto y su código fuente son propiedad intelectual de Cristian Cuadrado Beltrán y 3CB Soluciones.  
Se publican con fines demostrativos y de portafolio profesional.  

No se autoriza su uso, copia, modificación, distribución o comercialización sin consentimiento escrito del autor o de 3CB Soluciones.

Para licencias comerciales, colaboraciones o integraciones personalizadas, contactar a:  
📧 3cbsoluciones@gmail.com

## Contacto
- Autor: Cristian Cuadrado Beltrán (cr1085)
- Email: 3cbsoluciones@gmail.com
- Repo: https://github.com/cr1085/repositorio-plantillas
