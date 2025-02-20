export const defaultPrompt = `Genera 1 posts para Instagram, en formato JSON y siguiendo estrictamente la estructura solicitada. 
- Cada post debe ser completamente independiente, con su propia narrativa y numeración de páginas reiniciada en 1.
- Cada post debe tener al menos 3 páginas (introducción, contenido principal, conclusión) y no debe haber continuidad de contenido o numeración entre ellos.
- Cada página debe contener un texto detallado y auto-contenido.
- Utiliza un estilo amigable y profesional, con un lenguaje claro y conciso.
- Incluye formas (rectángulos, círculos, etc.) en cada página, ubicadas de manera equilibrada y respetando el área del texto.
- Asegúrate de que el texto contraste con el fondo y sea legible. 
- El tamaño de la letra debe adaptarse a la cantidad de texto. 
- El JSON final debe ser válido y no debe contener nada más que el objeto JSON (sin texto adicional, sin explicaciones, etc.).

Recuerda que la estructura del JSON debe ser:
{
  "posts": [
    {
      "pages": [
        {
          "pageNumber": 1,
          "title": "Título global del post",
          "description": "Descripción global del post",
          "design": {
            "backgroundColor": "Color global",
            "textColor": "Color global",
            "titleSize": "48",
            "descriptionSize": "24",
            "textWidth": "1000",
            "titlePosition": { "x": "540", "y": "540" },
            "descriptionPosition": { "x": "540", "y": "600" }
          },
          "content": "Contenido de la primera página"
        },
        {
          "pageNumber": 2,
          "title": "Título de la página 2",
          "description": "Descripción de la página 2, si es necesaria",
          "design": {
            "backgroundColor": "Color global o personalizado para esta página",
            "textColor": "Color global o personalizado",
            "titleSize": "48",
            "descriptionSize": "24",
            "textWidth": "1000",
            "titlePosition": { "x": "540", "y": "540" },
            "descriptionPosition": { "x": "540", "y": "600" }
          },
          "content": "Contenido de la segunda página"
        }
        // La IA puede agregar más objetos en el array "pages" si el contenido se extiende.
      ],
      "shapes": [
        {
          "type": "Tipo de forma (ejemplo: rect)",
          "position": { "x": "100", "y": "100" },
          "size": { "width": "200", "height": "200" },
          "fill": "Color que armonice con el diseño"
        }
        // Se pueden incluir más formas si es necesario.
      ]
    }
    // Se pueden incluir más posts en el array
  ]
}

Reglas:
- Si el título es suficiente para transmitir el mensaje, omite el campo "description". De lo contrario, agrégalo para complementar el título.
- Si el texto es corto, el tamaño de la letra debe ser grande; si es largo, debe ser más pequeño.
- El color del texto debe contrastar con el fondo para garantizar la legibilidad.
- El diseño debe ser equilibrado, visualmente atractivo y de calidad profesional, con un estilo moderno y estético. Evita diseños simples o con formas mal posicionadas.
- El texto debe estar centrado en la composición y con un margen mínimo de 50 píxeles respecto a cualquier forma, la cual debe complementar el diseño sin invadir el área principal del texto.
- No agregues ningún comentario ni texto adicional fuera de este JSON.`;