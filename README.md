# Rustic Barbería

Sitio web estático para la barbería **Rustic**, construido con **Next.js**, **TypeScript** y **Tailwind CSS**.

Incluye:

- Diseño rústico con tonos de madera, dorado y tipografía clásica.
- Logo personalizado (`Screenshot_11.png`) en la cabecera.
- Datos de contacto y ubicación editables desde un solo archivo.
- Sistema de reservas con selección de servicio, fecha y horario.
- Persistencia de turnos en el navegador mediante `localStorage`.
- Exportación estática lista para subir a **Vercel** o cualquier hosting estático.

## Datos de la barbería (no hardcodeados)

Toda la información del negocio está centralizada en `lib/config.ts`. Para cambiar el nombre, teléfono, ubicación, precios o horarios, solo editá ese archivo.

```ts
// lib/config.ts
export const business = {
  name: 'Rustic',
  fullName: 'Barbería Rustic',
  phone: '0937799',
  location: 'Manuel Acuña esq. Aparicio Saravia',
  // ...
}

export const services = [
  { id: 'corte-basico', name: 'Corte Básico', price: 300, durationMinutes: 30 },
  { id: 'corte-y-barba', name: 'Corte + Barba', price: 450, durationMinutes: 60 },
]
```

## Base de datos (Supabase)

Las reservas se guardan en una base de datos de **Supabase** en lugar del navegador.

Si querés usar tu propio proyecto de Supabase, creá una tabla llamada `appointments` con estas columnas:

| Columna     | Tipo      | Notas                           |
|-------------|-----------|---------------------------------|
| id          | uuid      | primary key, default gen_random_uuid() |
| created_at  | timestamp | default now()                   |
| name        | text      |                                 |
| phone       | text      |                                 |
| date        | text      | formato YYYY-MM-DD              |
| time        | text      | formato HH:MM                   |
| service_id  | text      |                                 |
| barber_id   | text      |                                 |
| price       | int4      |                                 |

Ejecutá este SQL en **SQL Editor** de Supabase:

```sql
create table appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  phone text not null,
  date text not null,
  time text not null,
  service_id text not null,
  barber_id text not null,
  price integer not null
);

alter table appointments enable row level security;

create policy "Allow public read" on appointments for select to anon using (true);
create policy "Allow public insert" on appointments for insert to anon with check (true);
create policy "Allow public delete" on appointments for delete to anon using (true);
```

Las credenciales de conexión están en `lib/supabase.ts` y también se pueden configurar mediante variables de entorno:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kdshmqncqrucbeedcspw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_NfrPjiUp-0iMPPP0KruAqA_I7JPjGZ7
```

## Cómo correrlo en local

1. Asegurate de tener **Node.js** instalado (versión LTS recomendada).
2. Desde la carpeta del proyecto instalá las dependencias:

```bash
npm install
```

3. Levantá el servidor de desarrollo:

```bash
npm run dev
```

4. Abrí tu navegador en `http://localhost:3000`.

## Generar la versión de producción

```bash
npm run build
```

Esto crea una carpeta `dist/` con todos los archivos estáticos listos para publicar.

## Subir a GitHub

1. Creá un repositorio nuevo en [https://github.com/new](https://github.com/new) (podés dejarlo público).
2. En la terminal, dentro de la carpeta `rustic-barber`, ejecutá:

```bash
git init
git add .
git commit -m "Primer commit - sitio web Rustic Barbería"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
git push -u origin main
```

Reemplazá `TU_USUARIO` y `NOMBRE_DEL_REPO` por los valores de tu cuenta.

## Desplegar en Vercel

1. Andá a [https://vercel.com/new](https://vercel.com/new) e iniciá sesión con tu cuenta de GitHub.
2. Seleccioná el repositorio que acabás de subir.
3. En la pantalla de configuración del proyecto:
   - **Framework Preset**: elegí `Next.js`.
   - **Root Directory**: dejá el punto `.` (raíz del repo).
   - **Build Command**: dejá el valor por defecto `next build`.
   - **Output Directory**: dejá el valor por defecto (`.next`).
4. Hacé clic en **Deploy**.
5. Esperá unos segundos y Vercel te dará una URL pública tipo `https://nombre-del-repo.vercel.app`.

> El sitio ya está configurado con `output: 'export'`, por lo que Vercel puede servirlo como contenido estático sin servidor.

## Estructura del proyecto

```
rustic-barber/
├── app/                  # Páginas y estilos globales
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/           # Componentes reutilizables
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── BookingSection.tsx
│   ├── AppointmentForm.tsx
│   ├── AppointmentList.tsx
│   └── Footer.tsx
├── lib/                  # Configuración y lógica de citas
│   ├── config.ts
│   └── appointments.ts
├── public/               # Archivos estáticos
│   └── Screenshot_11.png
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Notas importantes

- Las reservas se guardan en una base de datos de **Supabase**, por lo que persisten incluso si el usuario cierra el navegador o cambia de dispositivo.
- Si Supabase no está disponible, el formulario mostrará un mensaje de error y no se podrán confirmar nuevos turnos.
- El diseño se adaptó a la paleta del logo: madera oscura, dorado y detalles en azul petróleo.
