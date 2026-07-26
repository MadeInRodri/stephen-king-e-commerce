# El Bazar de las Pesadillas (Carrito de Compras)

Un proyecto de comercio electrónico inmersivo con temática oscura, desarrollado como desafío práctico. Esta aplicación permite a los usuarios explorar un catálogo de libros, gestionar un carrito de compras, generar facturas en PDF y recibir confirmaciones por correo electrónico.

## Despliegue en Vivo

El proyecto se encuentra desplegado y funcionando de manera optimizada gracias a **Netlify**. Puedes explorar el catálogo, simular compras y probar la generación de PDFs y correos electrónicos desde cualquier dispositivo:

[**Visitar El Bazar de las Pesadillas**](https://el-bazar-de-las-pesadillas.netlify.app/)

## Video explicativo

[**Ir al video**](https://youtu.be/R7lO95yOUX4)

## Tecnologías Principales

Este proyecto está construido con un stack moderno enfocado en el rendimiento y la experiencia del usuario:

- [**Next.js**](https://nextjs.org/) **(App Router):** Framework principal para el renderizado y enrutamiento de la aplicación.
- [**React**](https://react.dev/)**:** Biblioteca principal para la construcción de interfaces interactivas.
- [**Tailwind CSS**](https://tailwindcss.com/)**:** Framework de CSS utilitario para un diseño rápido, responsivo y una estética "dark/cyber-gothic".
- [**Netlify**](https://www.netlify.com/)**:** Plataforma de alojamiento (hosting) y CI/CD utilizada para el despliegue del proyecto en producción.
- [**Sonner**](https://sonner.emilkowal.ski/)**:** Implementación de notificaciones (toast) elegantes y minimalistas para el feedback del usuario.
- [**Bcrypt**](https://www.npmjs.com/package/bcrypt)**:** Seguridad y encriptación (hashing) para el manejo de credenciales de usuario.
- [**EmailJS**](https://www.emailjs.com/)**:** Servicio integrado para el envío automatizado de correos electrónicos transaccionales (recibos de compra) directamente desde el cliente.
- **html-to-image & jsPDF:** Herramientas para la captura y generación de facturas descargables en formato PDF de alta calidad.

## Arquitectura

El proyecto sigue una **arquitectura basada en componentes**.La lógica se ha desacoplado de las vistas principales para mantener un código limpio, reutilizable y escalable. Las interfaces (TypeScript) están centralizadas, y el manejo del estado global se gestiona de manera eficiente integrando los hooks de React con el localStorage y sessionStorage.

## Estructura del Proyecto

```
CARRITO-DESAFIO-1/
├── .next/                  # Archivos compilados de Next.js
├── app/                    # Next.js App Router (Vistas principales)
│   ├── (auth)/             # Rutas agrupadas para autenticación (Login/Registro)
│   ├── cart/               # Vista detallada del carrito
│   ├── checkout/           # Vista de facturación, PDF y envío de correos
│   ├── favicon.ico
│   ├── globals.css         # Estilos globales y configuración de Tailwind
│   ├── layout.tsx          # Estructura maestra de la aplicación
│   └── page.tsx            # Landing page / Catálogo principal
├── components/             # Componentes modulares y reutilizables (UI, Cards, etc.)
├── node_modules/           # Dependencias del proyecto
├── public/                 # Archivos estáticos (Imágenes, sources, JSON locales)
├── types/                  # Definiciones e interfaces de TypeScript
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts          # Configuración de Next.js (Imágenes, DevTools)
├── package-lock.json
├── package.json            # Scripts y dependencias
├── postcss.config.mjs
├── README.md               # Documentación del proyecto
└── tsconfig.json           # Configuración de TypeScript
```

## Instalación y Uso (Desarrollo Local)

1.  git clone cd CARRITO-DESAFIO-1
2.  npm install
3.  npm run dev
4.  **Abrir en el navegador:**Navega a [http://localhost:3000](http://localhost:3000) para invocar la aplicación.
