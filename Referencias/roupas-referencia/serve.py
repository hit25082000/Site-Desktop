import http.server
import socketserver
import webbrowser
from urllib.parse import urlparse
import sys

PORT = 8000
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Allow all cross-origin requests for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        # Ensure correct MIME type for .mjs files
        if self.path.endswith('.mjs'):
            self.send_header('Content-Type', 'application/javascript')
        super().end_headers()

def main():
    print(f"\n🚀 Website Downloader - Servidor de Visualizacao Local")
    print(f"--------------------------------------------------")
    print(f"Servidor Iniciado em: http://localhost:{PORT}")
    print(f"Pressione CTRL+C para encerrar o servidor.")
    print(f"--------------------------------------------------\n")
    
    webbrowser.open(f"http://localhost:{PORT}")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nFechando servidor...")
            sys.exit(0)

if __name__ == "__main__":
    main()