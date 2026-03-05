

## Plan: Simplificar plataforma a SMS + URLs, agregar mensajes concatenados y reportes por operador

### Resumen de cambios

Se eliminan los servicios de WhatsApp, Email y Voz de toda la plataforma, dejando solo **Mensajes de Texto** (con sub-tabs Uno a Uno, Masivos y Concatenados) y **Acortador de URLs**. Los reportes se redisenan para mostrar entrega por operador colombiano con colores específicos y tasas de rechazo.

### 1. Sidebar (`AppSidebar.tsx`)
- Eliminar WhatsApp Business, Email Marketing, Llamadas de Voz de `serviceItems`
- Dejar solo: "Mensajes de Texto" (con icono SMS, ruta `/sms`) y "Acortador URLs"
- Dentro de SMS, los sub-tipos (uno a uno, masivos, concatenados) se manejan con tabs internos en la página

### 2. Dashboard (`DashboardPage.tsx`)
- Eliminar toda referencia a WhatsApp, Email, Voz en:
  - Dropdown "Nuevo Envío": dejar solo SMS
  - `chartData`: solo campo `sms`
  - `channelData`: eliminar completamente (quitar sección "Por Canal")
  - `recentActivity`: quitar entradas de whatsapp, email, voz
  - Acceso Rápido: quitar enlaces a WhatsApp, Email, Voz
- Simplificar gráfico de area a solo SMS
- Quitar la card "Por Canal" y expandir el gráfico de SMS

### 3. SMS Page (`SmsPage.tsx`) - Agregar tab "Concatenados"
- Agregar nueva tab "Concatenados" junto a "Uno a Uno" y "Masivos"
- **Mensajes concatenados**: el usuario escribe un template con marcadores de posición usando `{1}`, `{2}`, `{3}`, `{4}`, `{5}` (hasta 5 columnas)
  - Ejemplo: `"Hola {1}, tu factura por valor de {2} vence el {3}"`
  - Upload de archivo Excel con 3-5 columnas: columna A = teléfono, columnas B-E = datos para los espacios
  - Vista previa del mensaje resultante con datos de ejemplo
  - Mismo sistema de detección de emojis y conteo de caracteres
  - Aceptación de términos obligatoria

### 4. Reportes (`ReportsPage.tsx`) - Rediseño completo
- **Eliminar**: "Volumen por Canal", "Distribución" (pie chart), referencia a canales
- **Agregar - Mensajes Entregados por Operador**:
  - Gráfico de barras con operadores colombianos:
    - **Claro**: color rojo (`#E30613`)
    - **Tigo**: color azul (`#00377B`)
    - **Movistar**: color verde (`#019DF4` o verde `#5CB615`)
    - **WOM**: color morado (`#6B2D8B`)
  - Datos de ejemplo por operador y mes
- **Agregar - Tasa de Entrega por Operador**:
  - Gráfico de líneas con una línea por operador (mismos colores)
- **Agregar - Mensajes Rechazados**:
  - Card/tabla con razones de rechazo:
    - "Teléfono apagado"
    - "Número mal escrito"
    - "Número inexistente"
    - "Fuera de cobertura"
  - Porcentajes por debajo de 9% (ej: 6.2%, 3.8%, 4.1%, 2.5%)
  - Visualización tipo pie chart o barras horizontales
- **Stats summary**: cambiar a Total SMS, Tasa Entrega, Rechazados, Costo Total

### 5. Rutas (`App.tsx`)
- Eliminar imports y rutas de WhatsApp, Email, Voice
- Mantener: Dashboard, SMS, URL Shortener, Reports, Billing, Settings, Help

### 6. Limpieza
- Los archivos `WhatsappPage.tsx`, `EmailPage.tsx`, `VoicePage.tsx` quedan sin ruta (pueden eliminarse o dejarse sin referencia)

### Archivos a modificar
1. `src/components/AppSidebar.tsx` -- quitar servicios excepto SMS y URL
2. `src/pages/DashboardPage.tsx` -- quitar multi-canal, simplificar a solo SMS
3. `src/pages/SmsPage.tsx` -- agregar tab Concatenados con upload Excel multi-columna
4. `src/pages/ReportsPage.tsx` -- rediseño con operadores colombianos y rechazos
5. `src/App.tsx` -- eliminar rutas de WhatsApp, Email, Voice

