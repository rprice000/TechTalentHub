import os
from wsgiref.simple_server import make_server
from wsgiref.util import FileWrapper

def get_mime_type(path):
    """Return the MIME type based on the file extension."""
    ext = os.path.splitext(path)[1].lower()
    mime_types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    }
    return mime_types.get(ext, 'text/plain')

def app(environ, start_response):
    """WSGI application to serve static files."""
    # Get the path from the request
    path = environ.get('PATH_INFO', '').lstrip('/')

    # Default to index.html if no path is specified
    if not path:
        path = 'index.html'

    # Ensure the path exists and is within our directory
    file_path = os.path.join(os.path.dirname(__file__), path)

    if os.path.exists(file_path) and os.path.isfile(file_path):
        mime_type = get_mime_type(file_path)

        start_response('200 OK', [
            ('Content-Type', mime_type),
            ('Content-Length', str(os.path.getsize(file_path)))
        ])

        return FileWrapper(open(file_path, 'rb'))
    else:
        # If file not found, return 404
        start_response('404 Not Found', [('Content-Type', 'text/plain')])
        return [b'404 Not Found']

if __name__ == '__main__':
    # Create a simple server when run directly
    with make_server('0.0.0.0', 5000, app) as httpd:
        print('Serving on port 5000...')
        httpd.serve_forever()