import http.server

PORT = 8080

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    pass

# Ensure correct MIME types for modern web development
CustomHandler.extensions_map.update({
    ".mjs": "application/javascript",
    ".js": "application/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif"
})

if __name__ == '__main__':
    print(f"Servidor MULTI-THREAD rodando na porta {PORT}...")
    print(f"Acesse: http://localhost:{PORT}")
    try:
        # Usando ThreadingHTTPServer para permitir múltiplos downloads simultâneos
        # (Sites em Framer puxam dezenas/centenas de arquivos ao mesmo tempo)
        http.server.test(
            HandlerClass=CustomHandler,
            ServerClass=http.server.ThreadingHTTPServer,
            port=PORT
        )
    except KeyboardInterrupt:
        print("\nServidor parado.")
